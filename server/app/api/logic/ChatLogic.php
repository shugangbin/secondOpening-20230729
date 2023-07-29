<?php
// +----------------------------------------------------------------------
// | likeshop100%开源免费商用商城系统
// +----------------------------------------------------------------------
// | 欢迎阅读学习系统程序代码，建议反馈是我们前进的动力
// | 开源版本可自由商用，可去除界面版权logo
// | 商业版本务必购买商业授权，以免引起法律纠纷
// | 禁止对系统程序代码以任何目的，任何形式的再发布
// | gitee下载：https://gitee.com/likeshop_gitee
// | github下载：https://github.com/likeshop-github
// | 访问官网：https://www.likeshop.cn
// | 访问社区：https://home.likeshop.cn
// | 访问手册：http://doc.likeshop.cn
// | 微信公众号：likeshop技术社区
// | likeshop团队 版权所有 拥有最终解释权
// +----------------------------------------------------------------------
// | author: likeshopTeam
// +----------------------------------------------------------------------
namespace app\api\logic;
use app\common\enum\{DrawEnum, PayEnum, ChatEnum, YesNoEnum, ChatRecordEnum, user\AccountLogEnum};
use app\common\logic\{
    BaseLogic,
    AccountLogLogic,
};
use app\common\model\{
    ChatCategory,
    ChatRecords,
    member\MemberPackage
};
use app\common\model\{
    user\User,
    user\UserMember
};
use app\common\service\{
    AiChatService,
    ConfigService,
    openai\ChatGptService,
    zhipuai\ChatGlmService,
};
use think\{
    Exception,
    facade\Db
};

/**
 * 对话逻辑类
 * Class ChatLogic
 * @package app\api\logic
 */
class ChatLogic extends BaseLogic
{

    protected $source       = '';           //模型对应公司
    protected $chatKey      = '';           //当前模型的key
    protected $model        = '';           //对话模型
    protected $userId       = '';           //用户id
    protected $user         = '';           //用户信息
    protected $userMember   = false;        //用户是否为会员
    protected $type         = '';           //对话类型：简单对话；创作对话；技能对话
    protected $categoryId   = '';           //会话分类id：
    protected $question     = '';           //提问问题
    protected $otherId      = '';           //创作id|技能id
    protected $form         = '';           //创作表单
    protected $reply        = '';           //回复内容
    protected $ask          = '';           //拼接后的提问问题（创作拼接数据）
    protected $modelContent = '';           //创作、技能表数据
    protected $messages     = [];           //上下文内容
    protected $billingModel = [];           //计费模型


    public function __construct(int $userId,$params = [])
    {
        $defaultModel = $params['model'] ?? '';
        //如果不是用户自己选择的模型
        if(empty($defaultModel)){
            $defaultModel = ConfigService::get('ai_chat','type', ChatEnum::ZHUPI_GLM_STD);
        }
        $config = ChatEnum::getDefaultChatConfig($defaultModel);
        $this->source       = $config['source'];
        $this->chatKey      = $config['key'];
        $this->otherId      = $params['other_id'] ?? '';
        $this->categoryId   = $params['category_id'] ?? 0;
        $this->userId       = $userId;
        $this->question     = $params['question'] ?? '';
        $this->type         = $params['type'] ?? [];
        $this->form         = $params['form'] ?? [];
        $this->ask          = $this->question;
        $this->user         = User::where('id',$this->userId)->findOrEmpty();

        //用户是否为会员；
        $this->userMember = false;
        if($this->user->member_perpetual || ($this->user->member_end_time && $this->user->member_end_time > time())){
            $this->userMember = true;
        }
    }

    /**
     * @notes 验证参数
     * @throws Exception
     * @author cjhao
     * @date 2023/6/21 15:49
     */
    public function checkParams()
    {
        if(!in_array($this->type,[ChatRecordEnum::CHAT_QUESTION,ChatRecordEnum::CHAT_CREATION,ChatRecordEnum::CHAT_SKILL])){
            throw new Exception('type错误');
        }
        $this->checkCategory();
        $this->checkUser();
    }

    /**
     * @notes 验证分类
     * @return bool|string
     * @author cjhao
     * @date 2023/6/21 15:43
     */
    public function checkCategory()
    {
        if(ChatRecordEnum::CHAT_QUESTION != $this->type){
            return true;
        }
        $chatCategory = ChatCategory::where(['id' => $this->categoryId, 'user_id' => $this->userId])->findOrEmpty();
        if($chatCategory->isEmpty()){
            throw new Exception('会话不存在');
        }

    }

    /**
     * @notes 验证会员
     * @return bool
     * @throws Exception
     * @author cjhao
     * @date 2023/6/21 15:41
     */
    public function checkUser()
    {
        //验证用户
        if ($this->user->isEmpty()) {
            throw new Exception('非法会员');
        }
        if(YesNoEnum::YES == $this->user->is_blacklist){
            throw new Exception('您已被管理员禁止提问，请联系客服详询原因。');
        }
        $this->billingModel = AiChatService::getBillingModel($this->userId,$this->chatKey);
        if(empty($this->billingModel)){
            throw new Exception('当前模型不支持使用');
        }
        if($this->chatKey != $this->billingModel['key']){
            throw new Exception('当前模型不支持使用');
        }
        //如果不是会员且不是默认模型、用户当前余额不够，直接抛异常
        if(false == $this->billingModel['member_free'] && $this->billingModel['balance'] > $this->user->balance){
            throw new Exception('对话余额不足',101);
        }

        //如果不是会员或者不是会员默认模型直接返回
        if(false == $this->userMember || false == $this->billingModel['member_free']){
            return true;
        }
        //验证会员今天对话次数是否达到限制
        $userMemberInfo = UserMember::field('package_info')
            ->where(['user_id'=>$this->userId,'refund_status'=>PayEnum::REFUND_NOT])
            ->json(['package_info'],true)
            ->order(['is_perpetual'=>'desc','add_member_time'=>'desc','id'=>'desc'])
            ->findOrEmpty()->toArray();
        if(empty($userMemberInfo)){
            return true;
        }
        $memberPackage = MemberPackage::where(['id'=>$userMemberInfo['package_info']['id'] ?? 0])
            ->findOrEmpty()
            ->toArray();
        if(empty($memberPackage) || empty($memberPackage['chat_limit'])){
            return true;
        }
        //今天对话的次数
        $todayChatNum = ChatRecords::where(['user_id'=>$this->userId])
            ->whereDay('create_time')
            ->count();

        if ($todayChatNum >= $memberPackage['chat_limit']) {
            $chatLimitTips = ConfigService::get('chat_config','chat_limit_tips','今日对话次数已达上限');
            throw new Exception($chatLimitTips);
        }
    }

    /**
     * @notes 对话接口
     * @return bool
     * @throws \DfaFilter\Exceptions\PdsBusinessException
     * @throws \DfaFilter\Exceptions\PdsSystemException
     * @author cjhao
     * @date 2023/6/21 18:15
     */
    public function chat()
    {
        Db::startTrans();
        try{

            //验证参数
            $this->checkParams();
            //审核全局指令
            AiChatService::getGlobalDirectives($this->messages,$this->source );
            //处理当前对话数据
            if(ChatRecordEnum::CHAT_QUESTION != $this->type){
                $this->setQuestion();
            }
            //敏感词过滤
            AiChatService::Sensitive($this->question);
            //问题审核
            AiChatService::askCensor($this->question);
            switch ($this->source){
                case 'openai':
                    $this->chatGpt();
                    break;
                case 'zhipu':
                    $this->chatZhipu();
                    break;
                default:
                    throw new Exception('后台配置错误');
            }
            //记录用户信息
            $this->recordsUserLog();
            Db::commit();
            return true;
        }catch (Exception $e){
            AiChatService::parseReturnErrorStream(
                'error',
                $e->getMessage(),
                $this->chatKey,
                $e->getCode(),
            );
        }
    }

    /**
     * @notes chatGPT聊天
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author cjhao
     * @date 2023/6/21 16:33
     */
    public function chatGpt()
    {
        $chatService = new ChatGptService($this->chatKey);

        if(ChatRecordEnum::CHAT_QUESTION != $this->type){
            //设置ai参数配置
            $chatService->setTemperature($this->modelContent['temperature']);
            $chatService->setTopP($this->modelContent['top_p']);
            $this->modelContent['presence_penalty'] && $chatService->setPresencePenalty($this->modelContent['presence_penalty']);
            $this->modelContent['frequency_penalty'] && $chatService->setfrequencyPenalty($this->modelContent['frequency_penalty']);
            $this->modelContent['n'] > 0 && $chatService->setN($this->modelContent['n']);

            if(ChatRecordEnum::CHAT_SKILL == $this->type){
                //技能设置主题
                $this->messages[] = ['role' => 'system', 'content' => $this->modelContent['content']];
            }else{
                //创作不需要联系上下文，这里设置成0
                $chatService->setContextNum(0);
            }
        }

        $contextNum = $chatService->getContextNum();
        $chatRecords = [];
        //联系上下文
        if($contextNum > 0){
            //查找对话内容
            $where[] = ['user_id','=',$this->userId];
            $where[] = ['type','=',$this->type];
            $where[] = ['is_show','=',1];
            $where[] = ['category_id','=',$this->categoryId];
            $where[] = ['other_id','=',$this->otherId];
            $chatRecords = ChatRecords::where($where)
                ->limit($contextNum)
                ->order('id desc')
                ->select()->toArray();
            $chatRecords = array_reverse($chatRecords);
        }
        //有联系上下文，处理对话记录
        foreach ($chatRecords as $record){
            $ask = $record['ask'];
            if (is_array($ask)) {
                $ask = implode('，',$ask);
            }
            $reply = $record['reply'];
            if (is_array($reply)) {
                $reply = implode('，',$reply);
            }
            $this->messages[] = ['role'  => 'user','content' => (string)$ask];
            $this->messages[] = ['role'  => 'assistant','content' => (string)$reply];

        }
        $this->messages[] = ['role'  => 'user','content' =>  $this->question];
        $params = [
            'messages'      => $this->messages,
            'user_id'       => $this->userId,
            'category_id'   => $this->categoryId,
            'other_id'      => $this->otherId,
            'type'          => $this->type,
            'question'      => $this->question,
        ];
        //发起对话
        $this->reply = $chatService->chatStreamRequest($params)->getReplyContent();
        $this->model = $chatService->getModel();

    }

    /**
     * @notes 智谱
     * @return bool
     * @author cjhao
     * @date 2023/6/21 16:42
     */
    public function chatZhipu()
    {

        $chatService = new ChatGlmService($this->chatKey);

        if(ChatRecordEnum::CHAT_QUESTION != $this->type){
            //设置ai参数配置
            $chatService->setTemperature($this->modelContent['temperature']);
            $chatService->setTopP($this->modelContent['top_p']);

            if(ChatRecordEnum::CHAT_CREATION == $this->type){
                //创作不需要联系上下文，这里设置成0
                $chatService->setContextNum(0);
            }
        }

        $contextNum = $chatService->getContextNum();
        $chatRecords = [];

        //联系上下文
        if($contextNum > 0){
            //查找对话内容
            $where[] = ['user_id','=',$this->userId];
            $where[] = ['type','=',$this->type];
            $where[] = ['is_show','=',1];
            $where[] = ['category_id','=',$this->categoryId];
            $where[] = ['other_id','=',$this->otherId];
            $chatRecords = ChatRecords::where($where)
                ->limit($contextNum)
                ->order('id desc')
                ->select()->toArray();
            $chatRecords = array_reverse($chatRecords);
        }
        //有联系上下文，处理对话记录
        foreach ($chatRecords as $record){
            $ask = $record['ask'];
            if (is_array($ask)) {
                $ask = implode('，',$ask);
            }
            $reply = $record['reply'];
            if (is_array($reply)) {
                $reply = implode('，',$reply);
            }
            $this->messages[] = ['role'  => 'user','content' => (string)$ask];
            $this->messages[] = ['role'  => 'assistant','content' => (string)$reply];

        }
        if($this->type == ChatRecordEnum::CHAT_SKILL){
            $this->messages[] = ['role'  => 'user','content' => $this->modelContent['content'].':'. $this->question];
        }else{
            $this->messages[] = ['role'  => 'user','content' => $this->question];
        }

        $params = [
            'messages'      => $this->messages,
            'user_id'       => $this->userId,
            'category_id'   => $this->categoryId,
            'other_id'      => $this->otherId,
            'type'          => $this->type,
            'question'      => $this->question,
        ];
        //发起对话
        $this->reply = $chatService->chatStreamRequest($params)->getReplyContent();
        //对话模型
        $this->model = $chatService->getModel();

    }



    /**
     * @notes 记录用户对话记录、扣减余额
     * @param $params
     * @author cjhao
     * @date 2023/6/21 11:01
     */
    public function recordsUserLog()
    {

        //创建对话记录
        ChatRecords::create([
            'user_id'       => $this->userId,
            'category_id'   => $this->categoryId,
            'ask'           =>  $this->ask,
            'reply'         => $this->reply,
            'type'          => $this->type,
            'other_id'      => $this->otherId,
            'key'           => $this->chatKey,
            'model'         => $this->model,
        ]);
        //扣除用户余额
        if(false == $this->billingModel['member_free']){
            $this->user->balance = $this->user->balance - $this->billingModel['balance'];
            $this->user->total_quiz = $this->user->total_quiz + 1;
            $this->user->save();
        }
        $this->user->total_quiz = $this->user->total_quiz + 1;
        $this->user->save();

        if(false == $this->billingModel['member_free']){
            // 记录账户流水
            AccountLogLogic::add(
                $this->userId,
                AccountLogEnum::UM_DEC_CHAT,
                AccountLogEnum::DEC,
                $this->billingModel['balance']
            );
        }
    }

    /**
     * @notes 设置对话内容
     * @throws Exception
     * @author cjhao
     * @date 2023/7/19 17:44
     */
    public function setQuestion()
    {
        $model = ChatRecordEnum::getModel($this->type);
        $this->modelContent = $model::where(['id'=>$this->otherId])
            ->withoutField('update_time,delete_time')
            ->findOrEmpty()->toArray();
        if(empty($this->modelContent)){
            throw new Exception('模型错误');
        }
        //创作模型的
        if(ChatRecordEnum::CHAT_CREATION == $this->type){
            //表单有数据，直接用表单数据
            if($this->form){
                $this->question = $this->modelContent['content'];
                foreach ($this->modelContent['form'] as $formKey => $formVal) {
                    $form = $this->form[$formVal['id']] ?? '';
                    if($formVal['props']['isRequired'] && empty($form)){
                        throw new Exception('请输入：'.$formVal['props']['title'].'的内容');
                    }
                    if(is_array($form)){
                        $form = implode('、',$form);
                    }
                    $replaceStr = '${'.$formVal['id'].'}';
                    $this->question = str_replace($replaceStr,$form,$this->question);
                    $this->ask .= $formVal['props']['title'].':'.$form.'；';

                }
            }else{
                $this->question = $this->modelContent['name'].':'.$this->question;
            }

        }
    }


    /**
     * @notes 获取对话模型
     * @return array
     * @author cjhao
     * @date 2023/7/19 11:48
     */
    public function getModel()
    {
        $isOpen = ConfigService::get('chat_config','billing_is_open');
        $billingModelList = [];
        if($isOpen){
            $billingModelList = AiChatService::getBillingModel($this->userId);
        }
        return array_values($billingModelList);
    }



}