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

use app\common\enum\DrawEnum;
use app\common\logic\BaseLogic;
use app\common\model\draw\DrawRecords;
use app\common\model\draw\DrawRecordsCollect;
use app\common\service\FileService;


/**
 * 绘画记录逻辑
 * Class DrawRecordsLogic
 * @package app\api\logic
 */
class DrawRecordsLogic extends BaseLogic
{
    /**
     * @notes 绘图记录
     * @param $userId
     * @return DrawRecords[]|array|\think\Collection
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2023/6/20 20:01
     */
    public static function records($userId)
    {
        $field = [
            'id', 'task_id', 'prompt', 'prompt_en', 'status', 'image', 'image_base',
            'image_url', 'image_id', 'scale', 'able_actions', 'fail_reason', 'create_time'
        ];
        $records = DrawRecords::field($field)
            ->where(['user_id' => $userId])
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
     * @notes 收藏
     * @param $userId
     * @param $params
     * @author 段誉
     * @date 2023/6/27 11:33
     */
    public static function collect($userId, $params)
    {
        if ($params['status']) {
            // 收藏
            DrawRecordsCollect::create([
                'user_id' => $userId,
                'records_id' => $params['records_id'],
            ]);
        } else {
            // 取消收藏
            DrawRecordsCollect::where([
                'user_id' => $userId,
                'records_id' => $params['records_id'],
            ])->delete();
        }
    }

    /**
     * @notes 删除绘画记录
     * @param $userId
     * @param $ids
     * @author 段誉
     * @date 2023/6/25 11:27
     */
    public static function delete($userId, $ids)
    {
        DrawRecords::destroy(function ($query) use ($userId, $ids) {
            $query->where('user_id', $userId)
                ->whereIn('id', $ids);
        });
    }

    /**
     * @notes 任务详情
     * @param $taskId
     * @param $userId
     * @return array
     * @author 段誉
     * @date 2023/7/24 15:11
     */
    public static function getDrawDetail($recordId, $userId)
    {
        $field = [
            'id', 'task_id', 'prompt', 'prompt_en', 'status', 'image', 'image_base',
            'image_url', 'image_id', 'scale', 'able_actions', 'fail_reason', 'create_time'
        ];
        return DrawRecords::field($field)
            ->where(['id' => $recordId, 'user_id' => $userId])
            ->findOrEmpty()->toArray();
    }

}