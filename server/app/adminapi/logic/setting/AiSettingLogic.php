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
namespace app\adminapi\logic\setting;
use app\common\cache\KeyPoolCache;
use app\common\enum\ChatEnum;
use app\common\enum\ChatRecordEnum;
use app\common\enum\DrawEnum;
use app\common\logic\BaseLogic;
use app\common\service\openai\ChatGptService;
use app\common\service\ConfigService;
use app\common\service\FileService;

/**
 * AI参数设置逻辑类
 * Class AiSettingLogic
 * @package app\adminapi\logic\setting
 */
class AiSettingLogic extends BaseLogic
{

    /**
     * @notes 获取ai聊天配置列表
     * @param int $type
     * @return array
     * @author cjhao
     * @date 2023/6/13 14:50
     */
    public function lists()
    {
        $aiConfigLists = ChatEnum::getDefaultChatConfig();
        $type = ConfigService::get('ai_chat',  'type',ChatEnum::ZHUPI_GLM_STD);
        $chatConfigLists   = ConfigService::get('chat_config');
        foreach ($aiConfigLists as $aiKey => $aiConfig)
        {
            //数据库配置
            $chatConfig = $chatConfigLists[$aiKey] ?? [];
            //兼容以前数据
            if(empty($chatConfig) && ChatEnum::OPEN_GPT_35 == $aiKey){
                //拿以前的配置
                $chatConfig   = ConfigService::get('ai_config');
                $chatConfig   = $chatConfig?:[];
            }
            $chatConfig['status'] = $aiKey == $type ? 1 : 0;
            $aiConfig = array_merge($aiConfig,$chatConfig);
            //转换数据类型
            $aiConfig['status'] = (int)$aiConfig['status'];
            $aiConfig['context_num'] = (int)$aiConfig['context_num'];
            $aiConfig['temperature'] = (float)$aiConfig['temperature'];
            $aiConfig['top_p'] = (float)$aiConfig['top_p'];
            $aiConfig['presence_penalty'] = floatval($aiConfig['presence_penalty'] ?? '');
            $aiConfig['frequency_penalty'] = floatval($aiConfig['frequency_penalty'] ?? '');
            $aiConfig['n'] = intval($aiConfig['n'] ?? '');
            if(ChatEnum::ZHUPI_GLM_STD == $aiKey || ChatEnum::ZHUPI_GLM_LITE == $aiKey ){
                $aiConfig['presence_penalty'] = '';
                $aiConfig['frequency_penalty'] = '';
                $aiConfig['n'] = '';
            }
            $aiConfigLists[$aiKey] = $aiConfig;
        }
        return [
            'ai_config_lists'   => $aiConfigLists,
        ];
    }


    /**
     * @notes 获取ai参数配置
     * @return array
     * @author cjhao
     * @date 2023/4/21 14:56
     */
    public function getConfig($key)
    {
        //读取数据
        $chatConfig = ConfigService::get('chat_config',$key,[]);
        //读取默认数据
        $defaultConfig = ChatEnum::getDefaultChatConfig($key);
        //处理默认数据，兼容旧版本
        if(empty($chatConfig)){
            $chatConfig = [];
            //兼容旧版本
            if(ChatEnum::OPEN_GPT_35 == $key){
                $chatConfig   = ConfigService::get('ai_config');
                $chatConfig   = $chatConfig?:[];
            }

        }
        $chatConfig = array_merge($defaultConfig, $chatConfig);
        $chatConfig['status'] = (int)$chatConfig['status'];
        $chatConfig['temperature'] = (float)$chatConfig['temperature'];
        $chatConfig['top_p'] = (float)$chatConfig['top_p'];
        $chatConfig['presence_penalty'] = floatval($chatConfig['presence_penalty'] ?? '');
        $chatConfig['frequency_penalty'] = floatval($chatConfig['frequency_penalty'] ?? '');
        $chatConfig['n'] = intval($chatConfig['n'] ?? '');
        if(ChatEnum::ZHUPI_GLM_STD == $key){
            $chatConfig['presence_penalty'] = '';
            $chatConfig['frequency_penalty'] = '';
            $chatConfig['n'] = '';
        }

        //读取数据库的配置
        return $chatConfig;

    }


    /**
     * @notes 设置ai参数配置
     * @param array $params
     * @return bool
     * @author cjhao
     * @date 2023/4/21 15:08
     */
    public function setConfig(array $params)
    {
        unset($params['model_list']);
        ConfigService::set('chat_config',$params['key'],$params);
        if(1 == $params['status']){
            ConfigService::set('ai_chat','type',$params['key']);
        }
        (new KeyPoolCache($params['key']))->delKey();
        return true;
    }

    /**
     * @notes 查询余额
     * @return array|string
     * @author cjhao
     * @date 2023/4/23 16:28
     */
    public function queryBalance($params)
    {
        try{
            $queryBalance = (new ChatGptService())->queryKeyBalance($params['ai_api_key']);
            return $queryBalance;
        }catch (\Exception $e){
            self::$error = $e->getMessage();
            return false;
        }
    }

    /**
     * @notes 获取对话配置
     * @return array
     * @author ljj
     * @date 2023/5/25 2:54 下午
     */
    public function getChatConfig()
    {
        $chat_logo = ConfigService::get('default_image','chat_logo');
        $chat_example = ConfigService::get('default_image','chat_example');
        $result = [
//            'is_sensitive' => ConfigService::get('chat_config','is_sensitive',1),
            'is_markdown' => ConfigService::get('chat_config','is_markdown',1),
            'chat_logo' => ConfigService::get('chat_config','chat_logo',$chat_logo),
            'chat_default' => $chat_logo,
            'chat_example' => $chat_example,
            'is_tip' => ConfigService::get('chat_config','is_tip',1),
            'global_directives' => ConfigService::get('chat_config','global_directives',''),
            'chat_limit_tips' => ConfigService::get('chat_config','chat_limit_tips','今日对话次数已达上限'),
        ];
        $result['chat_logo'] = FileService::getFileUrl($result['chat_logo']);
        $result['chat_default'] = FileService::getFileUrl($result['chat_default']);
        $result['chat_example'] = FileService::getFileUrl($result['chat_example']);

        return $result;
    }

    /**
     * @notes 设置对话配置
     * @param array $params
     * @return bool
     * @author ljj
     * @date 2023/5/25 3:05 下午
     */
    public function setChatConfig(array $params)
    {
//        ConfigService::set('chat_config','is_sensitive',$params['is_sensitive']);
        ConfigService::set('chat_config','is_markdown',$params['is_markdown']);
        ConfigService::set('chat_config','chat_logo',FileService::setFileUrl($params['chat_logo']));
        ConfigService::set('chat_config','is_tip',$params['is_tip']);
        ConfigService::set('chat_config','global_directives',$params['global_directives']);
        ConfigService::set('chat_config','chat_limit_tips',$params['chat_limit_tips']);
        return true;
    }


    /**
     * @notes 绘画配置
     * @param array $params
     * @return bool
     * @author 段誉
     * @date 2023/6/21 9:48
     */
    public function setDrawConfig(array $params)
    {
        //绘画话配置
        $drawConfig = $params['draw_config'];
        //翻译配置
        $translateConfig = $params['translate_config'] ?? [];
        if (!isset($drawConfig['is_open']) || !in_array($drawConfig['is_open'], [0, 1])) {
            return '请选择绘画功能开关';
        }

        if (empty($drawConfig['type'])) {
            return '请选择ai绘画接口';
        }

//        if (empty($drawConfig['token'])) {
//            return '请填写token';
//        }

        if (!isset($drawConfig['status']) || !in_array($drawConfig['status'], [0, 1])) {
            return '参数缺失';
        }
        ConfigService::set('draw_config', 'is_open', $drawConfig['is_open']);

        unset($drawConfig['is_open']);
        ConfigService::set('draw_config',$drawConfig['type'], $drawConfig);
        if(1 == $drawConfig['status']) {
            ConfigService::set('draw_config','type', $drawConfig['type']);
        }
        if($drawConfig['auto_translate']){
            if(empty($translateConfig)){
                return '请填写翻译配置';
            }
            if(empty($translateConfig['prompt'])){
                return '请输入翻译指令';
            }
//            if(!strpos($translateConfig['prompt'], '${prompt}')){
//                return '翻译指令必须填写一个变量';
//            }

        }
        //配置绘画配置
        ConfigService::set('draw_config','translate', $translateConfig);

        return true;
    }

    /**
     * @notes 绘画配置
     * @return array
     * @author 段誉
     * @date 2023/7/7 14:33
     */
    public function getDrawConfig()
    {
        // 绘画总开关
        $isOpen = ConfigService::get('draw_config', 'is_open', 0);

        // 默认配置
        $defaultConfigLists = DrawEnum::getDrawDefaultConfig();
        // 选中类型
        $selectedType = ConfigService::get('draw_config',  'type',DrawEnum::API_ZHISHUYUN_FAST);
        // 已保存配置
        $configLists  = ConfigService::get('draw_config');
        // 返回数据
        $resultConfig = [];

        // 旧版本数据
        $oldConfigType = ConfigService::get('draw_config', 'api_type', "zhishuyun_fast");
        $oldConfigToken = ConfigService::get('draw_config', 'api_token', "");

        foreach ($defaultConfigLists as $key => $defaultConfig) {
            $drawConfig = $configLists[$key] ?? [];
            // 兼容旧版本数据
            if (empty($drawConfig) && $key == $oldConfigType) {
                $drawConfig['token'] = $oldConfigToken;
            }
            $drawConfig['type'] = $key;
            $drawConfig['status'] = $key == $selectedType ? 1 : 0;
            $itemConfig = array_merge($defaultConfig, $drawConfig);
            $itemConfig['auto_translate'] = (int)$itemConfig['auto_translate'];
            $itemConfig['status'] = (int)$itemConfig['status'];
            $itemConfig['translate_type'] = (int)$itemConfig['translate_type'];
            $resultConfig[$key] = $itemConfig;
        }
        //翻译模型
        $translateModelLists = [
            ChatEnum::OPEN_GPT_35,
            ChatEnum::OPEN_GPT_40,
            ChatEnum::API2D_35,
            ChatEnum::API2D_40
        ];
        //绘画翻译配置
        $translateConfig  = ConfigService::get('draw_config','translate',DrawEnum::getTranslateConfig());
        return [
            // 是否开启绘画功能
            'is_open'                   => $isOpen,
            // 配置列表
            'config_lists'              => $resultConfig,
            //翻译模型
            'translate_model_lists'     => $translateModelLists,
            //翻译配置
            'translate_config'           => $translateConfig
        ];
    }

    /**
     * @notes 获取对话模型计费配置
     * @return array
     * @author cjhao
     * @date 2023/7/18 18:21
     */
    public function getChatBillingConfig()
    {
        $isOpen = ConfigService::get('chat_config','billing_is_open');
        $billingConfig = ConfigService::get('chat_config','billing_config',[]);
        $defaultConfig = ChatEnum::getDefaultBillingConfig();
        $billingConfig = array_merge($defaultConfig,$billingConfig);
        $memberModel = ConfigService::get('ai_chat',  'type',ChatEnum::ZHUPI_GLM_STD);
        foreach ($billingConfig as $key => $config){
            $billingConfig[$key]['status'] = (int)$config['status'];
            $config['balance'] && $billingConfig[$key]['balance'] = (int)$config['balance'];
        }
        return [
            'is_open'           => $isOpen,
            'member_model'      => $memberModel,
            'billing_config'    => $billingConfig
        ];
    }


    /**
     * @notes 设置模型计费
     * @param array $post
     * @return string
     * @author cjhao
     * @date 2023/7/18 18:43
     */
    public function setChtBillingConfig(array $post)
    {
        $isOpen = $post['is_open'] ?? '';
        $billingConfig = $post['billing_config'] ?? [];
        if('' === $isOpen){
            return '请选择模型计费状态';
        }
        if(!in_array($isOpen,[0,1])){
            return '模型计费状态错误';
        }
        if(empty($billingConfig)){
            return '请配置模型费用';
        }
        foreach ($billingConfig as &$config){
            if(!isset($config['key']) || empty($config['key'])){
                return '模型数据错误';
            }
            if(!in_array($config['status'],[0,1])){
                return '模型：'.ChatEnum::getAiModelName($config['key']).' 状态错误';
            }
            if(0 == $config['status']){
                continue;
            }
            $config['alias'] = '' === $config['alias'] ? ChatEnum::getAiModelName($config['key']) : $config['alias'];
            $config['balance'] = '' === $config['balance'] ? 1 : $config['balance'];
            if($config['balance'] <= 0){
                return '模型：'.ChatEnum::getAiModelName($config['key']).' 消耗条数必须大于0';
            }
            if(!is_numeric($config['balance']) || false !== strpos($config['balance'], '.')){
                return '模型：'.ChatEnum::getAiModelName($config['key']).' 消耗条数必须是整数';
            }
        }
        //验证必须开启对话模型
        if($isOpen){
            $statusSum = array_sum(array_column($billingConfig,'status'));
            if($statusSum <= 0){
                return '计费模型已开启，至少开启一个对话模型';
            }
        }
        ConfigService::set('chat_config','billing_is_open',$isOpen);
        ConfigService::set('chat_config','billing_config',$billingConfig);
        return true;
    }


    /**
     * @notes 获取绘画计费模型配置
     * @return array
     * @author cjhao
     * @date 2023/7/18 19:00
     */
    public function getDrawBillingConfig(){

        $isOpen = ConfigService::get('draw_config','billing_is_open');
        $billingConfig = ConfigService::get('draw_config','billing_config',[]);
        $defaultConfig = DrawEnum::getDefaultBillingConfig();
        $billingConfig = array_merge($defaultConfig,$billingConfig);
        foreach ($billingConfig as $key => $config){
            $billingConfig[$key]['status'] = (int)$config['status'];
            $config['balance'] && $billingConfig[$key]['balance'] = (int)$config['balance'];
        }

        $defaultModel = ConfigService::get('draw_config', 'type', DrawEnum::API_ZHISHUYUN_FAST);
        $defaultModelName = DrawEnum::getDrawDefaultConfig($defaultModel)['name'] ?? $defaultModel;

        return [
            'is_open'           => $isOpen,
            'default_model'     => $defaultModelName,
            'billing_config'    => $billingConfig
        ];
    }

    /**
     * @notes 设置绘画模型计费
     * @param array $post
     * @return string
     * @author cjhao
     * @date 2023/7/18 18:43
     */
    public function setDrawBillingConfig(array $post)
    {
        $isOpen = $post['is_open'] ?? '';
        $billingConfig = $post['billing_config'] ?? [];
        if('' === $isOpen){
            return '请选择模型计费状态';
        }
        if(!in_array($isOpen,[0,1])){
            return '模型计费状态错误';
        }
        if(empty($billingConfig)){
            return '请配置模型费用';
        }
        foreach ($billingConfig as &$config){
            if(!isset($config['key']) || empty($config['key'])){
                return '模型数据错误';
            }
            if(!in_array($config['status'],[0,1])){
                return '模型：'.DrawEnum::getDefaultBillingConfig($config['key'])['name'].' 状态错误';
            }
            if(0 == $config['status']){
                continue;
            }

            $config['alias'] = '' === $config['alias'] ? DrawEnum::getDefaultBillingConfig($config['key'])['name'] : $config['alias'];
            $config['balance'] = '' === $config['balance'] ? 1 : $config['balance'];
            if($config['balance'] <= 0){
                return '模型：'.DrawEnum::getDefaultBillingConfig($config['key'])['name'].' 消耗条数必须大于0';
            }
            if(!is_numeric($config['balance']) || false !== strpos($config['balance'], '.')){
                return '模型：'.DrawEnum::getDefaultBillingConfig($config['key'])['name'].' 消耗条数必须是整数';
            }
        }
        //验证必须开启对话模型
        if($isOpen){
            $statusSum = array_sum(array_column($billingConfig,'status'));
            if($statusSum <= 0){
                return '计费模型已开启，至少开启一个绘画模型';
            }
        }
        ConfigService::set('draw_config','billing_is_open',$isOpen);
        ConfigService::set('draw_config','billing_config',$billingConfig);
        return true;
    }

}