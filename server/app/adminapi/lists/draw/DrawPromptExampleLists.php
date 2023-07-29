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

namespace app\adminapi\lists\draw;

use app\adminapi\lists\BaseAdminDataLists;
use app\common\lists\ListsSearchInterface;
use app\common\model\draw\DrawPromptExample;

/**
 * 绘图关键词示例
 * Class DrawPromptExampleLists
 * @package app\adminapi\lists\draw
 */
class DrawPromptExampleLists extends BaseAdminDataLists implements ListsSearchInterface
{

    /**
     * @notes 搜索条件
     * @return \string[][]
     * @author 段誉
     * @date 2023/7/17 15:48
     */
    public function setSearch(): array
    {
       return [
           '=' => ['status']
       ];
    }


    /**
     * @notes 获取列表
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2023/6/27 18:51
     */
    public function lists(): array
    {
        $lists = DrawPromptExample::where($this->searchWhere)
            ->limit($this->limitOffset, $this->limitLength)
            ->order(['sort' => 'desc', 'id' => 'desc'])
            ->select()
            ->toArray();

        return $lists;
    }

    /**
     * @notes 获取数量
     * @return int
     * @author 段誉
     * @date 2023/6/27 18:51
     */
    public function count(): int
    {
        return DrawPromptExample::where($this->searchWhere)->count();
    }


}