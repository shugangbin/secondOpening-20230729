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
namespace app\common\command;
use app\adminapi\logic\setting\KeyPoolLogic;
use app\common\enum\KeyPoolEnum;
use app\common\model\KeyPool;
use app\common\service\ConfigService;
use think\console\Command;
use think\console\Input;
use think\console\Output;
use think\facade\Cache;
use think\facade\Db;
use think\facade\Log;

/**
 * 迁移配置
 * Class MigrationKey
 */
class MigrationData extends Command
{
    protected function configure()
    {
        $this->setName('migration_data')
            ->setDescription('迁移数据');
    }

    protected function execute(Input $input, Output $output)
    {

        try{
            //如果存在缓存，直接不执行
            $chacheMigration = Cache::get('chache_migration_data',0);
            if($chacheMigration){
                return;
            }
            //更新配置
            $this->addTablecolumn();
            //对话配置
            $this->chatConfig();
            //计费配置
            $this->billingConfig();
            //迁移key池
            $this->keys();



            //迁移数据成功，加个缓存
            Cache::set('chache_migration_data',1);

        }catch (Exception $e){
            $output->error('配置迁移失败:'.$e->getMessage());
            Log::write('配置迁移错误:'.$e->getLine().'-'.$e->getMessage());
        }



    }

    /**
     * @notes 迁移chat_config配置
     * @author cjhao
     * @date 2023/7/28 10:14
     */
    public function chatConfig()
    {

        //如果开启的chatGLM6B或者是chatGLM13B,更新配置
        $type = ConfigService::get('ai_chat', 'type');
        if('chatGLM-6B' == $type){
            ConfigService::set('ai_chat', 'type','chatGLM-Std');
            Log::write('模型开启:'.$type.' 更新为：chatGLM-Std');
        }
        if('chatGLM-130B' == $type){
            ConfigService::set('ai_chat', 'type','chatGLM-Lite');
            Log::write('模型开启:'.$type.' 更新为：chatGLM-Lite');
        }
        //迁移chat_config配置
        $configList = ConfigService::get('ai_chat_config');
        if(empty($configList)){
            Log::write('当前没设置对话配置，不迁移数据');
        }
        foreach ($configList as $chat => $config) {
            $dataConfig = ConfigService::get('chat_config', $chat);
            if($dataConfig){
                Log::write('对话模型：'.$chat.' 数据已存在,不迁移数据');
                continue;
            }
            if('chatGLM-6B' == $chat){
                $chat = 'chatGLM-Std';
                $config['name'] = 'chatGLM-Std';
                $config['key'] = 'chatGLM-Std';
                $config['model'] = 'chatGLM-Std';
            }
            if('chatGLM-130B' == $chat){
                $chat = 'chatGLM-Lite';
                $config['name'] = 'chatGLM-Lite';
                $config['key'] = 'chatGLM-Lite';
                $config['model'] = 'chatGLM-Lite';
            }
            ConfigService::set('chat_config',$chat,$config);
            Log::write('对话模型:'.$chat.' 配置迁移成功');
        }


    }

    /**
     * @notes 迁移模型计费
     * @author cjhao
     * @date 2023/7/28 10:17
     */
    public function billingConfig()
    {
        //迁移计费配置
        $configList = ConfigService::get('ai_chat_billing');
        $billingDataConfig = ConfigService::get('chat_config','billing_config',[]);
        if($billingDataConfig){
            Log::write('模型计费数据已存在，不迁移数据');
            return true;
        }
        //模型计费数据空的情况
        if($configList && empty($billingDataConfig)){
            $isOpen = $configList['is_open'] ?? 0;
            ConfigService::set('chat_config','billing_is_open',$isOpen);
            $billingConfig = [];
            foreach ($configList['billing_config'] as $chat => $config) {
                if('chatGLM-6B' == $chat){
                    $chat = 'chatGLM-Std';
                    $config['name'] = 'chatGLM-Std';
                    $config['key'] = 'chatGLM-Std';
                }
                if('chatGLM-130B' == $chat){
                    $chat = 'chatGLM-Lite';
                    $config['name'] = 'chatGLM-Lite';
                    $config['key'] = 'chatGLM-Lite';
                }
                $billingConfig[$chat] = $config;
            }
            //模型计费
            ConfigService::set('chat_config','billing_config',$billingConfig);
            Log::write('模型计费配置迁移成功,共迁移了2个配置');

        }

    }

    /**
     * @notes 迁移keys
     * @throws \Exception
     * @author cjhao
     * @date 2023/7/28 10:21
     */
    public function keys(){

        //用来验证key是否存在
        $keyPool = KeyPool::column('ai_key,key');
        $keyPools = [];
        foreach ($keyPool as $pool){
            $keyPools[$pool['ai_key']][] = $pool['key'];
        }

        //对话key
        $modelLists = (new KeyPoolLogic())->getAiModel(KeyPoolEnum::TYPE_CHAT);
        $lists = [];
        foreach ($modelLists as $aiKey => $model)
        {
            $config = ConfigService::get('chat_config',$aiKey);
            if(empty($config)){
                continue;
            }
            $pools = $keyPools[$aiKey] ?? [];

            if(is_array($config['api_key'])){
                foreach ($config['api_key'] as $key) {
                    //已经存在的
                    if(in_array($key,$pools)){
                        continue;
                    }
                    $lists[] = [
                        'type'      => KeyPoolEnum::TYPE_CHAT,
                        'ai_key'    => $aiKey,
                        'key'       => $key,
                        'status'    => 1,
                    ];
                }
            }else{
                if(in_array($config['key'],$pools)){
                    continue;
                }
                $lists[] = [
                    'type'      => KeyPoolEnum::TYPE_CHAT,
                    'ai_key'    => $aiKey,
                    'key'       => $config['key'],
                    'status'    => 1,
                ];
            }
        }
        //绘画key
        $modelLists = (new KeyPoolLogic())->getAiModel(KeyPoolEnum::TYPE_DRAW);
        foreach ($modelLists as $aiKey => $model){
            $config = ConfigService::get('draw_config',$aiKey);
            if(empty($config)){
                continue;
            }
            $pools = $keyPools[$aiKey] ?? [];
            //如果数数组格式
            if(is_array($config['token'])){
                foreach ($config['token'] as $token) {
                    //已经存在的
                    if(in_array($token,$pools)){
                        continue;
                    }
                    $lists[] = [
                        'type'      => KeyPoolEnum::TYPE_DRAW,
                        'ai_key'    => $aiKey,
                        'key'       => $token,
                        'status'    => 1,
                    ];
                }
            }else{
                if(in_array($config['token'],$pools)){
                    continue;
                }
                $lists[] = [
                    'type'      => KeyPoolEnum::TYPE_DRAW,
                    'ai_key'    => $aiKey,
                    'key'       => $config['token'],
                    'status'    => 1,
                ];
            }
        }
        (new KeyPool())->saveAll($lists);
        $keyCount = count($lists);
        Log::write('key池配置迁移成功,共迁移了'.$keyCount.'个配置');
    }


    /**
     * @notes 新增字段
     * @author cjhao
     * @date 2023/7/27 18:32
     */
    public function addTablecolumn()
    {
        $prefix = env('database.prefix');
        $tableName = $prefix.'chat_records';
        $sql = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME ='$tableName' AND COLUMN_NAME = 'model'";
        $column = Db::query($sql);
        if(empty($column)){
            $sql = "ALTER TABLE `$tableName` ADD COLUMN `model` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '对话模型' AFTER `is_show`";;
             Db::execute($sql);
             Log::write('chat_records表增加了model字段');
        }

    }

}