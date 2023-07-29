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
namespace app\common\service;
use app\common\enum\ChatEnum;
use app\common\enum\ChatRecordEnum;
use app\common\logic\BaseLogic;
use app\common\model\SensitiveWord;
use app\common\model\user\User;
use DfaFilter\SensitiveHelper;
use think\Exception;


/**
 * ai统一逻辑服务类
 * Class AiChatService
 * @package app\common\service
 */
class AiChatService extends BaseLogic
{

    /**
     * @notes 获取各个模型的计费
     * @param int $userId
     * @param string $model
     * @return array
     * @author cjhao
     * @date 2023/7/19 12:15
     */
    public static function getbillingModel(int $userId,$model = true):array
    {
        $type = ConfigService::get('ai_chat',  'type',ChatEnum::ZHUPI_GLM_STD);
        $isOpen = ConfigService::get('chat_config','billing_is_open');
        $billingModelLists = [];
        //判断用户当前是否属于会员
        $user = User::findOrEmpty($userId);
        $now = time();
        $userMember = false;
        if($user->member_perpetual || ($user->member_end_time && $user->member_end_time > $now)){
            $userMember = true;
        }
        //计费模型没开启，系统默认模型一条
        if(0 == $isOpen){
            $balance = 1;
            $memberFree = false;
            //会员不消耗次数
            if($userMember){
                $balance = 0;
                $memberFree = true;
            }
            return $billingModelLists[$type] = [
                'key'           => $type,
                'alias'         => $type,
                'balance'       => (int)$balance,
                'default'       => true,
                'member_free'   => $memberFree,
            ];
        }

        $billingConfig = ConfigService::get('chat_config','billing_config');
        foreach ($billingConfig as $config){
            if( 0 == $config['status']){
                continue;
            }
            $default = false;
            $memberFree = false;
            $balance = $config['balance'];
            if($type === $config['key']){
                $default = true;
                //会员不消耗次数
                if($userMember){
                    $balance = 0;
                    $memberFree = true;
                }
            }
            $billingModelLists[$config['key']] = [
                'key'           => $config['key'],
                'alias'         => $config['alias'],
                'balance'       => (int)$balance,
                'default'       => $default,
                'member_free'   => $memberFree,
            ];
        }
        //如果只有一个模型，直接变成默认的
        if( 1 == count($billingModelLists)){
            $billingModelLists[array_keys($billingModelLists)[0]]['default'] = true;
        }
        if(true === $model){
            return $billingModelLists;
        }
        return $billingModelLists[$model] ?? [];
    }

    /**
     * @notes 审核全局指令
     * @param $messages
     * @author cjhao
     * @date 2023/6/21 15:14
     */
    public static function getGlobalDirectives(&$message,$source = 'openai')
    {

        //全局审核指令
        $globalDirectives = ConfigService::get('chat_config','global_directives','');
        if(!$globalDirectives){
            return ;
        }
        switch ($source){
            case 'openai':
                $message[] = ['role' => 'system', 'content' => $globalDirectives];
                break;

        }

    }

    /**
     * @notes 敏感词验证
     * @param string $content
     * @throws \DfaFilter\Exceptions\PdsBusinessException
     * @throws \DfaFilter\Exceptions\PdsSystemException
     * @throws \think\Exception
     * @author cjhao
     * @date 2023/6/21 10:42
     */
    public static function Sensitive(string $content):void
    {
        //敏感词过滤
        $isSensitive      = ConfigService::get('chat_config','is_sensitive',1); //默认开启
        if(!$isSensitive){
            return ;
        }
        //获取数据库敏感词
        $sensitiveWord = SensitiveWord::where(['status'=>1])->column('word');
        //一条数据可能含有多个敏感词，'；'分隔开
        $sensitive_arr = [];
        foreach ($sensitiveWord as $sensitiveWordValue) {
            $sensitive_arr = array_merge($sensitive_arr,explode('；',$sensitiveWordValue));
        }

        //读取敏感词文件
        //读取加密的密钥
        $file = fopen("../extend/sensitive_key.bin", "rb");
        $key = fread($file, 32);
        $iv = fread($file, 16);
        fclose($file);
        //读取加密的数据
        $ciphertext = file_get_contents("../extend/sensitive_data.bin");
        //使用 CBC 模式解密数据
        $plaintext = openssl_decrypt($ciphertext, 'aes-256-cbc', $key, OPENSSL_RAW_DATA, $iv);

        //过滤敏感词
        $wordFilePath = explode(PHP_EOL,trim($plaintext));
        $sensitiveWord = array_merge($wordFilePath,$sensitive_arr);
        $handle = SensitiveHelper::init()->setTree($sensitiveWord);
        $sensitiveWordGroup = $handle->getBadWord($content);// 获取内容中所有的敏感词
        if (!empty($sensitiveWordGroup)) {
            throw new Exception('提问存在敏感词：'.implode(',',$sensitiveWordGroup));
        }

    }


    /**
     * @notes 问题审核
     * @param string $content
     * @throws Exception
     * @author ljj
     * @date 2023/7/19 10:02 上午
     */
    public static function askCensor(string $content):void
    {
        $ask_open = ConfigService::get('content_censor','ask_open',0);
        if(!$ask_open){
            return ;
        }

        $APP_ID = ConfigService::get('content_censor','app_id');
        $API_KEY = ConfigService::get('content_censor','api_key');
        $SECRET_KEY = ConfigService::get('content_censor','secret_key');
        if (!$APP_ID || !$API_KEY || !$SECRET_KEY) {
            throw new Exception('内容审核配置缺失', 10006);
        }
        $client = new \aip\AipContentCensor($APP_ID, $API_KEY, $SECRET_KEY);
        $result = $client->textCensorUserDefined($content);
        if (isset($result['error_code'])) {
            throw new Exception($result['error_msg'] ?? '审核错误', 10006);
        }
        $data = [];
        if ($result['conclusionType'] > ChatRecordEnum::CENSOR_STATUS_COMPLIANCE) {
            if (isset($result['data']) && !empty($result['data'])) {
                foreach ($result['data'] as $key=>$val) {
                    if (isset($val['msg'])) {
                        $data[$key] = $val['msg'].'：';
                    }
                    if (isset($val['hits']) && !empty($val['hits'])) {
                        foreach ($val['hits'] as $hits_val) {
                            if (isset($hits_val['words'])) {
                                $data[$key] .= implode('、',$hits_val['words']);
                            }
                        }
                    }
                }
            }
        }
        if (!empty($data)) {
            throw new Exception(implode('、',$data), 10006);
        }

    }



    /**
     * @notes 返回流数据
     * @param string $event:事件
     * @param string $data：流数据
     * @param string $id：id
     * @param int $index：层级
     * @param string $model：模型类型
     * @author cjhao
     * @date 2023/6/21 18:21
     */
    public static function parseReturnStream(string $event,string $id,string $data,int $index,string $model)
    {
        $chatMessage = [
            'event'         => $event,
            'id'            => $id,
            'data'          => $data,
            'model'         => $model,
            'index'         => $index,
            'incremental'   => true,//默认增量返回
        ];

        $jsonchatMessage = json_encode($chatMessage);
        echo "data:".$jsonchatMessage."\n\n";
        ob_flush();
        flush();
    }

    /**
     * @notes 返回错误流数据
     * @param string $event:事件
     * @param string $data：流数据
     * @param string $model：模型类型
     * @author cjhao
     * @date 2023/6/21 18:21
     */
    public static function parseReturnErrorStream(string $event,string $data,string $model,$code = 0)
    {
        header('Access-Control-Allow-Origin: *');
        header('Connection: keep-alive');
        header('Content-Type: text/event-stream');
        header('Cache-Control: no-cache');
        header('X-Accel-Buffering: no');
        $chatMessage = [
            'event'         => $event,
            'id'            => '',
            'data'          => $data,
            'model'         => $model,
            'code'          => $code,
            'index'         => 0,
            'incremental'   => true,//默认增量返回
        ];

        $jsonchatMessage = json_encode($chatMessage);
        echo "data:".$jsonchatMessage."\n\n";
        ob_flush();
        flush();
        exit();
    }

}