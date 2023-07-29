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
use app\common\enum\DrawEnum;
use app\common\enum\KeyPoolEnum;
use app\common\logic\BaseLogic;
use app\common\model\KeyPool;
use app\common\service\openai\ChatGptService;
use think\Exception;

/**
 * key池逻辑类
 * Class KeyPoolLogic
 * @package app\adminapi\logic\setting
 */
class KeyPoolLogic extends BaseLogic
{


    /**
     * @notes 获取
     * @return array
     * @author cjhao
     * @date 2023/7/25 14:45
     */
    public function getAiModel($type)
    {
        $chatModel = [];
        $drawModel = [];
        if(empty($type)){
            $chatModel = ChatEnum::getAiModelName();
            $drawModel = DrawEnum::getAiModelName();
        }else{
            KeyPoolEnum::TYPE_CHAT == $type && $chatModel = ChatEnum::getAiModelName();
            KeyPoolEnum::TYPE_DRAW == $type && $drawModel = DrawEnum::getAiModelName();
        }
        return array_merge($chatModel,$drawModel);

    }


    /**
     * @notes 添加key
     * @param $params
     * @author cjhao
     * @date 2023/7/25 15:02
     */
    public function add(array $params)
    {
        (new KeyPoolCache($params['ai_key']))->delKey();
        KeyPool::create($params);
    }

    /**
     * @notes 更新key
     * @param $params
     * @author cjhao
     * @date 2023/7/25 15:02
     */
    public function edit(array $params)
    {
        (new KeyPoolCache($params['ai_key']))->delKey();
        KeyPool::update($params);
    }

    /**
     * @notes 删除key
     * @param int $id
     * @author cjhao
     * @date 2023/7/25 15:05
     */
    public function del(int $id)
    {
        $keyPool = KeyPool::where(['id'=>$id])->findOrEmpty();
        $keyPool->delete();
        (new KeyPoolCache($keyPool->ai_key))->delKey();
    }


    /**
     * @notes 修改状态
     * @author cjhao
     * @date 2023/7/25 15:06
     */
    public function status(int $id)
    {
        $keyPool = KeyPool::findOrEmpty($id);
        $keyPool->status = $keyPool->status ? 0 : 1;
        $keyPool->save();
        (new KeyPoolCache($keyPool->ai_key))->delKey();
    }

    /**
     * @notes 查询余额
     * @param int $id
     * @return array|bool
     * @author cjhao
     * @date 2023/7/25 15:23
     */
    public function queryBalance(int $id)
    {

        try{
            $keyPool = KeyPool::findOrEmpty($id);
            if($keyPool->isEmpty()){
                throw new Exception('秘钥不存在');
            }
            if(!in_array($keyPool->ai_key,ChatEnum::OPEN_CHAT)){
                throw new Exception('该key不支持查询余额');
            }
            $queryBalance = (new ChatGptService())->queryKeyBalance($keyPool->key);
            return $queryBalance;
        }catch (\Exception $e){
            self::$error = $e->getMessage();
            return false;
        }
    }
}