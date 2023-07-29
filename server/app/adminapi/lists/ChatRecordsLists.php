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

namespace app\adminapi\lists;


use app\common\model\ChatRecords;

class ChatRecordsLists extends BaseAdminDataLists
{
    /**
     * @notes 搜索条件
     * @return array
     * @author ljj
     * @date 2023/4/25 10:06 上午
     */
    public function where()
    {
        $where = [];
        $type = $this->params['type'] ?? 1;
        $where[] = ['cr.type','=',$type];
        if (isset($this->params['user_info']) && $this->params['user_info'] != '') {
            $where[] = ['u.sn|u.nickname','like','%'.$this->params['user_info'].'%'];
        }
        if (isset($this->params['keyword']) && $this->params['keyword'] != '') {
            $where[] = ['cr.ask','like','%'.$this->params['keyword'].'%'];
        }
        if (isset($this->params['start_time']) && $this->params['start_time'] != '') {
            $where[] = ['cr.create_time','>=',strtotime($this->params['start_time'])];
        }
        if (isset($this->params['end_time']) && $this->params['end_time'] != '') {
            $where[] = ['cr.create_time','<=',strtotime($this->params['end_time'])];
        }
        if (isset($this->params['censor_status']) && $this->params['censor_status'] != '') {
            $where[] = ['cr.censor_status','=',$this->params['censor_status']];
        }

        return $where;
    }

    /**
     * @notes AI对话记录列表
     * @return array
     * @author ljj
     * @date 2023/4/25 10:29 上午
     */
    public function lists(): array
    {
        $lists = ChatRecords::alias('cr')
            ->join('user u', 'u.id = cr.user_id')
            ->field('cr.id,u.avatar,u.nickname,cr.create_time,cr.ask,cr.reply,cr.use_tokens,cr.other_id,cr.type,cr.censor_status,cr.censor_result,cr.censor_num')
            ->append(['other_desc','censor_status_desc','censor_result_desc'])
            ->hidden(['other_id','type'])
            ->where($this->where())
            ->order('cr.id', 'desc')
            ->limit($this->limitOffset, $this->limitLength)
            ->select()
            ->toArray();

        return $lists;
    }

    /**
     * @notes AI对话记录数量
     * @return int
     * @author ljj
     * @date 2023/4/25 10:29 上午
     */
    public function count(): int
    {
        return ChatRecords::alias('cr')
            ->join('user u', 'u.id = cr.user_id')
            ->where($this->where())
            ->count();
    }
}