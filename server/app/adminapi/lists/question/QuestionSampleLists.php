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
namespace app\adminapi\lists\question;
use app\adminapi\lists\BaseAdminDataLists;
use app\common\model\question\QuestionSample;
use app\common\lists\ListsSearchInterface;

/**
 * 问题示例控制器类
 * Class QuestionSample
 * @package app\adminapi\controller\question
 */
class QuestionSampleLists extends BaseAdminDataLists implements ListsSearchInterface
{


    /**
     * @notes 实现数据列表
     * @return array
     * @author 令狐冲
     * @date 2021/7/6 00:33
     */
    public function lists(): array
    {

        $questionSampleLists = QuestionSample::alias('QS')
            ->where($this->searchWhere)
            ->join('question_category QC','QC.id = QS.category_id')
            ->limit($this->limitOffset, $this->limitLength)
            ->field('QS.*,QC.name as category_name')
            ->order(['QS.sort'=>'desc','id'=>'desc'])
            ->select()
            ->toArray();

        return $questionSampleLists;

    }

    /**
     * @notes 实现数据列表记录数
     * @return int
     * @author 令狐冲
     * @date 2021/7/6 00:34
     */
    public function count(): int
    {
        return QuestionSample::alias('QS')
            ->where($this->searchWhere)
            ->join('question_category QC','QC.id = QS.category_id')
            ->count();
    }

    /**
     * @notes 设置搜索条件
     * @return array
     * @author 令狐冲
     * @date 2021/7/7 19:44
     */
    public function setSearch(): array
    {
        return [
            '%like%' => ['QS.content'],
            '=' => ['QS.status','QS.category_id']
        ];
    }
}
