<?php
// +----------------------------------------------------------------------
// | likeadmin快速开发前后端分离管理后台（PHP版）
// +----------------------------------------------------------------------
// | 欢迎阅读学习系统程序代码，建议反馈是我们前进的动力
// | 开源版本可自由商用，可去除界面版权logo
// | gitee下载：https://gitee.com/likeshop_gitee/likeadmin
// | github下载：https://github.com/likeshop-github/likeadmin
// | 访问官网：https://www.likeadmin.cn
// | likeadmin团队 版权所有 拥有最终解释权
// +----------------------------------------------------------------------
// | author: likeadminTeam
// +----------------------------------------------------------------------
namespace app\adminapi\lists\user;

use app\adminapi\lists\BaseAdminDataLists;
use app\common\enum\PayEnum;
use app\common\enum\user\UserTerminalEnum;
use app\common\lists\ListsExcelInterface;
use app\common\model\user\User;
use app\common\model\user\UserMember;
use think\facade\Db;

/**
 * 用户列表
 * Class UserLists
 * @package app\adminapi\lists\user
 */
class UserLists extends BaseAdminDataLists implements ListsExcelInterface
{

    /**
     * @notes 搜索条件
     * @return array
     * @author 段誉
     * @date 2022/9/22 15:50
     */
    public function setSearch(): array
    {
        $allowSearch = ['keyword', 'channel', 'create_time_start', 'create_time_end','is_distribution','is_member'];
        return array_intersect(array_keys($this->params), $allowSearch);
    }


    /**
     * @notes 获取用户列表
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2022/9/22 15:50
     */
    public function lists(): array
    {
        $field = "id,sn,avatar,nickname,account,mobile,is_blacklist,channel,balance,member_end_time,member_perpetual,total_amount,create_time,balance_draw";
        $lists = User::withSearch($this->setSearch(), $this->params)
            ->limit($this->limitOffset, $this->limitLength)
            ->field($field)
            ->order('id desc')
            ->select()->toArray();

        foreach ($lists as &$item) {
            $item['channel'] = UserTerminalEnum::getTermInalDesc($item['channel']);

            $item['member_desc'] = '未开通';
            $item['member_end_time_desc'] = '-';
            $item['is_end'] = 0;
            if (isset($item['member_perpetual']) && $item['member_perpetual']) {
                $item['member_desc'] = '已开通';
                $item['member_end_time_desc'] = '永久';
            } elseif ($item['member_end_time']) {
                $item['member_desc'] = '已开通';
                $item['member_end_time_desc'] = date('Y-m-d H:i:s',$item['member_end_time']);
                if ($item['member_end_time'] < time()) {
                    $item['is_end'] = 1;
                }
            }
            $user_member = UserMember::field('is_perpetual,package_name,member_end_time')->where(['user_id'=>$item['id'],'refund_status'=>PayEnum::REFUND_NOT])->order(['is_perpetual'=>'desc','add_member_time'=>'desc','id'=>'desc'])->findOrEmpty()->toArray();
            if (!empty($user_member) && (!empty($item['member_end_time']) || $item['member_perpetual'])) {
                $item['member_desc'] = $user_member['package_name'];
            }
        }

        return $lists;
    }


    /**
     * @notes 获取数量
     * @return int
     * @author 段誉
     * @date 2022/9/22 15:51
     */
    public function count(): int
    {
        return User::withSearch($this->setSearch(), $this->params)->count();
    }


    /**
     * @notes 导出文件名
     * @return string
     * @author 段誉
     * @date 2022/11/24 16:17
     */
    public function setFileName(): string
    {
        return '用户列表';
    }


    /**
     * @notes 导出字段
     * @return string[]
     * @author 段誉
     * @date 2022/11/24 16:17
     */
    public function setExcelFields(): array
    {
        return [
            'sn' => '用户编号',
            'nickname' => '用户昵称',
            'account' => '账号',
            'mobile' => '手机号码',
            'channel' => '注册来源',
            'create_time' => '注册时间',
        ];
    }

}