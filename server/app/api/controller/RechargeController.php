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
namespace app\api\controller;

use app\api\logic\RechargeLogic;
use app\api\validate\RechargeValidate;


/**
 * 充值控制器
 * Class RechargeController
 * @package app\shopapi\controller
 */
class RechargeController extends BaseApiController
{
    public array $notNeedLogin = ['rechargePackage'];


    /**
     * @notes 充值套餐
     * @return \think\response\Json
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author ljj
     * @date 2023/4/18 6:52 下午
     */
    public function rechargePackage()
    {
        $result = (new RechargeLogic())->rechargePackage();
        return $this->success('',$result);
    }

    /**
     * @notes 充值
     * @return \think\response\Json
     * @author ljj
     * @date 2023/4/19 2:33 下午
     */
    public function recharge()
    {
        $params = (new RechargeValidate())->post()->goCheck('recharge', [
            'user_id' => $this->userId,
            'terminal' => $this->userInfo['terminal'],
        ]);
        $result = RechargeLogic::recharge($params);
        if (false === $result) {
            return $this->fail(RechargeLogic::getError());
        }
        return $this->data($result);
    }

}