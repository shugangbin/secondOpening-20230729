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

namespace app\common\command;

use app\api\logic\DrawLogic;
use app\common\enum\DrawEnum;
use app\common\enum\user\AccountLogEnum;
use app\common\model\draw\DrawRecords;
use think\console\Command;
use think\console\Input;
use think\console\Output;

/**
 * 绘画失败处理
 * Class DrawFail
 * @package app\common\command
 */
class DrawFail extends Command
{
    protected function configure()
    {
        $this->setName('draw_fail')
            ->setDescription('处理未接收到回调的绘画记录');
    }

    protected function execute(Input $input, Output $output)
    {
        $nowTime = time();
        $expireTime = 2 * 60 * 60;

        $records = DrawRecords::where(['status' => DrawEnum::STATUS_IN_PROGRESS])
            ->whereRaw("create_time + $expireTime < $nowTime")
            ->select()
            ->toArray();

        if (empty($records)) {
            return true;
        }

        foreach ($records as $record) {
            // 生成图片失败更新记录状态
            DrawRecords::where(['id' => $record['id']])->update([
                'status' => DrawEnum::STATUS_FAIL,
                'fail_reason' => '绘画服务响应失败',
                'update_time' => time(),
            ]);

            // 生成失败, 没有任务id,回退用户金额
            DrawLogic::drawBalanceHandle(
                $record['user_id'], $record['use_tokens'],
                AccountLogEnum::DRAW_INC_DRAW_FAIL
            );
        }
    }
}