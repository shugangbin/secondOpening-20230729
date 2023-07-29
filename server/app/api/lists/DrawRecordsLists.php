<?php
// +----------------------------------------------------------------------
// | likeshop开源商城系统
// +----------------------------------------------------------------------
// | 欢迎阅读学习系统程序代码，建议反馈是我们前进的动力
// | gitee下载：https://gitee.com/likeshop_gitee
// | github下载：https://github.com/likeshop-github
// | 访问官网：https://www.likeshop.cn
// | 访问社区：https://home.likeshop.cn
// | 访问手册：http://doc.likeshop.cn
// | 微信公众号：likeshop技术社区
// | likeshop系列产品在gitee、github等公开渠道开源版本可免费商用，未经许可不能去除前后端官方版权标识
// |  likeshop系列产品收费版本务必购买商业授权，购买去版权授权后，方可去除前后端官方版权标识
// | 禁止对系统程序代码以任何目的，任何形式的再发布
// | likeshop团队版权所有并拥有最终解释权
// +----------------------------------------------------------------------
// | author: likeshop.cn.team
// +----------------------------------------------------------------------

namespace app\api\lists;

use app\common\model\draw\DrawRecords;
use app\common\service\FileService;

/**
 * 绘图记录
 * Class DrawRecordsLists
 * @package app\api\lists
 */
class DrawRecordsLists extends BaseApiDataLists
{

    /**
     * @notes 列表
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2023/6/20 12:04
     */
    public function lists(): array
    {
        $field = [
            'id', 'task_id', 'prompt', 'prompt_en', 'status', 'image', 'image_base',
            'image_url', 'image_id', 'scale', 'able_actions', 'create_time'
        ];
        $records = DrawRecords::field($field)
            ->where(['user_id' => $this->userId])
            ->order('id desc')
            ->select()
            ->toArray();

        foreach ($records as &$item) {
            $item['image'] = !empty($item['image']) ? FileService::getFileUrl($item['image']) : "";
            $item['actions'] = json_decode($item['able_actions'], true);
            $item['able_edit'] = 0;
            if (strtotime($item['create_time']) + 3600 > time()) {
                $item['able_edit'] = 1;
            }
            unset($item['create_time'], $item['able_actions']);
        }
        return $records;
    }

    /**
     * @notes 数量
     * @return int
     * @author 段誉
     * @date 2023/6/20 12:03
     */
    public function count(): int
    {
        return DrawRecords::where(['user_id' => $this->userId])
            ->count();
    }
}