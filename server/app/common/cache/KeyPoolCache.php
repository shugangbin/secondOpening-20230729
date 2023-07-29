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
namespace app\common\cache;
use app\common\model\KeyPool;
use think\facade\Cache;

/**
 * keyKPool的缓存类
 * Class ChatKeyCache
 * @package app\common\cache
 */
class KeyPoolCache extends BaseCache
{

    private $cacheName = 'ai_key_';
    private $key = '';
    private $apiKey = [];

    public function __construct($key)
    {
        $this->key = $key;
        $this->cacheName .= $key;
    }

    /**
     * @notes 获取key
     * @return string
     * @author cjhao
     * @date 2023/6/19 17:15
     * 每次从缓存key数组里面拿第一个元素并移除第一个元素，
     * 再将缓存key重置，如果缓存key为空，则重新从数据库读取
     */
    public function getKey():string
    {
        $cacheKey = Cache::get($this->cacheName);
        if(empty($cacheKey)){
            $cacheKey = KeyPool::where(['status'=>1,'ai_key'=>$this->key])->column('key');
        }
        if(empty($cacheKey)){
            return '';
        }
        $key = array_shift($cacheKey);
        $this->apiKey = $cacheKey;
        //重新设置缓存
        $this->setKey();
        return $key;
    }

    /**
     * @notes 设置key
     * @param $type
     * @param $cacheKey
     * @author cjhao
     * @date 2023/6/19 17:09
     */
    public function setKey($key = [])
    {
        $apiKey = $this->apiKey;
        if($key){
            $apiKey = $key;
        }
        return Cache::set($this->cacheName,$apiKey);
    }


    /**
     * @notes 删除key
     * @return bool
     * @author cjhao
     * @date 2023/7/26 9:50
     */
    public function delKey()
    {
        return Cache::delete($this->cacheName);
    }


}