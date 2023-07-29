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

namespace app\api\logic;


use app\common\enum\PayEnum;
use app\common\logic\BaseLogic;
use app\common\model\member\MemberPackage;
use app\common\model\member\MemberOrder;
use app\common\service\ConfigService;

class MemberLogic extends BaseLogic
{
    /**
     * @notes 会员套餐列表
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author ljj
     * @date 2023/4/20 5:11 下午
     */
    public function lists()
    {
        $status = ConfigService::get('member', 'status', 1);
        $lists = MemberPackage::field('id,name,duration,is_perpetual,sell_price,lineation_price,is_retrieve,retrieve_amount,is_default,benefits_ids')
            ->append(['member_benefits'])
            ->where(['status'=>1])
            ->order(['sort'=>'desc','id'=>'asc'])
            ->select()
            ->toArray();

        return ['status'=>$status,'lists'=>$lists];
    }

    /**
     * @notes 购买
     * @param $params
     * @return array|false
     * @author ljj
     * @date 2023/4/20 5:50 下午
     */
    public function buy($params)
    {
        try {
            $member_package = MemberPackage::where(['id'=>$params['member_package_id']])->findOrEmpty()->toArray();

            //优惠金额
            $discount_amount = (!isset($params['discount_amount']) || $params['discount_amount'] == '') ? 0 : $params['discount_amount'];
            if ($member_package['is_retrieve'] == 0) {
                $discount_amount = 0;
            }
            if ($member_package['is_retrieve'] == 1 && $discount_amount > $member_package['retrieve_amount']) {
                $discount_amount = $member_package['retrieve_amount'];
            }

            $order_amount = $member_package['sell_price'] - $discount_amount;
            $order_amount = $order_amount > 0 ? $order_amount : 0;

            $order = MemberOrder::create([
                'user_id' => $params['user_id'],
                'sn' => generate_sn(MemberOrder::class, 'sn'),
                'terminal' => $params['terminal'],
                'order_amount' => round($order_amount,2),
                'discount_amount' => $discount_amount,
                'total_amount' => $member_package['sell_price'],
                'member_package_id' => $params['member_package_id'],
                'member_package_info' => json_encode($member_package,JSON_UNESCAPED_UNICODE),
            ]);

            return [
                'order_id' => $order->id,
                'from' => 'member'
            ];
        } catch (\Exception $e) {
            self::setError($e->getMessage());
            return false;
        }
    }

    /**
     * @notes 最近三十条购买记录
     * @return mixed
     * @author ljj
     * @date 2023/4/25 7:32 下午
     */
    public function buyLog()
    {
        $lists = MemberOrder::alias('mo')
            ->join('user u', 'u.id = mo.user_id')
            ->field('u.avatar,u.nickname,mo.member_package_info')
            ->append(['member_package'])
            ->hidden(['member_package_info'])
            ->order(['mo.id'=>'desc'])
            ->where(['pay_status'=>PayEnum::ISPAID])
            ->limit(30)
            ->select()
            ->toArray();

        return $lists;
    }
}