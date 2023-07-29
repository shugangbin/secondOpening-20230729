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
namespace app\adminapi\lists\skill;
use app\adminapi\lists\BaseAdminDataLists;
use app\common\lists\ListsSearchInterface;
use app\common\model\skill\Skill;

/**
 * 模型列表类
 * Class CreationModelLists
 * @package app\common\lists\creation
 */
class SkillLists extends BaseAdminDataLists
{
    /**
     * @notes 实现数据列表
     * @return array
     * @author 令狐冲
     * @date 2021/7/6 00:33
     */
    public function lists(): array
    {
        $skillLists = Skill::alias('S')
            ->where($this->where())
            ->join('skill_category SC','SC.id = S.category_id')
            ->limit($this->limitOffset, $this->limitLength)
            ->field('S.*,SC.name as category_name')
            ->order('S.sort desc')
            ->order(['S.sort'=>'desc','S.id'=>'desc'])
            ->select()
            ->toArray();
        return $skillLists;
    }

    /**
     * @notes 实现数据列表记录数
     * @return int
     * @author 令狐冲
     * @date 2021/7/6 00:34
     */
    public function count(): int
    {
        return Skill::alias('S')
            ->where($this->where())
            ->join('skill_category SC','SC.id = S.category_id')
            ->count();
    }

    /**
     * @notes 设置搜索条件
     * @return array
     * @author 令狐冲
     * @date 2021/7/7 19:44
     */
    public function where()
    {
        $where = [];
        if (isset($this->params['name']) && $this->params['name'] != '') {
            $where[] = ['S.name|S.describe','like','%'.$this->params['name'].'%'];
        }
        if (isset($this->params['status']) && $this->params['status'] != '') {
            $where[] = ['S.status','=',$this->params['status']];
        }
        if (isset($this->params['category_id']) && $this->params['category_id'] != '') {
            $where[] = ['S.category_id','=',$this->params['category_id']];
        }

        return $where;
    }
}