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
use app\common\model\draw\DrawRecords;
use app\common\service\FileService;

/**
 * 绘图记录
 * Class DrawRecordsLists
 * @package app\adminapi\lists\draw
 */
class DrawRecordsLists extends BaseAdminDataLists
{

    public function queryWhere()
    {
        $where = [];
        if (isset($this->params['user_info']) && $this->params['user_info'] != '') {
            $where[] = ['u.sn|u.nickname', 'like', '%' . $this->params['user_info'] . '%'];
        }
        if (isset($this->params['prompt']) && $this->params['prompt'] != '') {
            $where[] = ['r.prompt', 'like', '%' . $this->params['prompt'] . '%'];
        }
        if (isset($this->params['start_time']) && $this->params['start_time'] != '') {
            $where[] = ['r.create_time', '>=', strtotime($this->params['start_time'])];
        }
        if (isset($this->params['end_time']) && $this->params['end_time'] != '') {
            $where[] = ['r.create_time', '<=', strtotime($this->params['end_time'])];
        }
        return $where;
    }

    /**
     * @notes 列表
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2023/6/20 20:33
     */
    public function lists(): array
    {
        $lists = DrawRecords::alias('r')
            ->where($this->queryWhere())
            ->join('user u', 'u.id = r.user_id')
            ->field(['r.id', 'r.user_id', 'r.prompt', 'r.prompt_en', 'r.create_time',
                'r.image', 'r.image_url', 'r.image_base', 'r.use_tokens', 'u.avatar', 'u.nickname'
            ])
            ->limit($this->limitOffset, $this->limitLength)
            ->order(['id' => 'desc'])
            ->select()
            ->toArray();

        foreach ($lists as &$item) {
            $item['avatar'] = FileService::getFileUrl($item['avatar']);
//            $item['image'] = !empty($item['image']) ? FileService::getFileUrl($item['image']) : "";
            $item['image'] = $item['image_url'];
            $item['image_base'] = !empty($item['image_base']) ? FileService::getFileUrl($item['image_base']) : "";
        }

        return $lists;
    }


    /**
     * @notes 数量
     * @return int
     * @author 段誉
     * @date 2023/6/20 20:33
     */
    public function count(): int
    {
        return DrawRecords::alias('r')
            ->where($this->queryWhere())
            ->join('user u', 'u.id = r.user_id')
            ->count();
    }


}