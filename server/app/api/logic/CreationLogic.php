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
use app\common\model\creation\CreationCategory;
use app\common\model\creation\CreationModel;

/**
 * 创作逻辑类
 * Class CreationLogic
 * @package app\api\logic
 */
class CreationLogic
{

    /**
     * @notes 创作列表
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author cjhao
     * @date 2023/4/18 10:36
     */
    public static function lists(array $params)
    {

        $lists = CreationCategory::where(['status' => 1])
            ->with(['model' => function ($query) use ($params) {
                $where[] =['status','=',1];
                if(isset($params['keyword']) && $params['keyword']){
                    $where[] =['name','like','%'.$params['keyword'].'%'];
                }
                $query->where($where)->field('id,category_id,name,image,tips,content')->order('sort desc');
            }])
            ->field('id,name')
            ->order('sort desc')
            ->select()->toArray();
        return $lists;
    }

    /**
     * @notes 创作模型详情
     * @param int $id
     * @return array
     * @author ljj
     * @date 2023/4/25 5:07 下午
     */
    public function detail(int $id):array
    {
        $detail = CreationModel::withoutField('update_time,delete_time')->where(['id'=>$id])->findOrEmpty()->toArray();
        return $detail;
    }
}