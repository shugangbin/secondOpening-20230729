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
namespace app\common\enum;
/**
 * api2d枚举类
 * Class ChatGptEnum
 * @package app\common\enum\ChatGptEnum
 */
class Api2DEnum
{

    const MODEL_GPT_35_TURBO            = "gpt-3.5-turbo";              //适用于技能
    const MODEL_GPT_35_TURBO_0301       = "gpt-3.5-turbo-0301";         //适用于技能 更适用于生成更加具有想象力和创造力的故事和游戏情节等。
    const MODEL_GPT_35_TURBO_0613       = "gpt-3.5-turbo-0613";
    const MODEL_GPT_35_TURBO_16K        = "gpt-3.5-turbo-16k";
    const MODEL_GPT_35_TURBO_16K_0613   = "gpt-3.5-turbo-16k-0613";


    const MODEL_GPT_4                   = "gpt-4";
    const MODEL_GPT_4_0314              = "gpt-4-0314";
    const MODEL_GPT_4_0613              = "gpt-4-0613";



    //api2d默认配置
    const DAFAULT_CONFIG   = [
        'apid2-3.5-model'       => Api2DEnum::MODEL_GPT_35_TURBO,
        'apid2-4.0-model'       => Api2DEnum::MODEL_GPT_4_0613,
        'context_num'           => 3,           //上下文总数
        'temperature'           => 0.7,         //词汇属性
        'top_p'                 => 0.9,         //随机属性
        'presence_penalty'      => 0.5,         //话题属性
        'frequency_penalty'     => 0.5,         //重复属性
        'n'                     => 1,           //最大回复
    ];


    /**
     * @notes 获取模型
     * @return array
     * @author cjhao
     * @date 2023/4/21 14:55
     */
    public static function getModelLists($from)
    {
        $desc = [
            ChatEnum::API2D_35  => [
                self::MODEL_GPT_35_TURBO,
                self::MODEL_GPT_35_TURBO_0301,
                self::MODEL_GPT_35_TURBO_0613,
                self::MODEL_GPT_35_TURBO_16K,
                self::MODEL_GPT_35_TURBO_16K_0613,
            ],
            ChatEnum::API2D_40  => [
                self::MODEL_GPT_4,
                self::MODEL_GPT_4_0314,
                self::MODEL_GPT_4_0613,
            ],
        ];
        if(true === $from){
            return $desc;
        }
        return $desc[$from] ?? [];
    }



}