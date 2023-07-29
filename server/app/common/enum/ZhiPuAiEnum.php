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
 * 智谱ai枚举类
 * Class ZhiPuAiEnum
 * @package app\common\enum
 */
class ZhiPuAiEnum
{
    const MODEL_CHATGLM_STD        = "chatglm_Std";           //
    const MODEL_CHATGLM_Lite       = "chatglm_Lite";           //

    //智谱ai默认配置
    const DAFAULT_CONFIG = [
        'glm-model-std'         => ZhiPuAiEnum::MODEL_CHATGLM_STD,
        'glm-model-lite'        => ZhiPuAiEnum::MODEL_CHATGLM_Lite,
        'context_num'           => 3,           //上下文总数
        'temperature'           => 0.95,         //词汇属性
        'top_p'                 => 0.7,          //随机属性
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
            ChatEnum::ZHUPI_GLM_STD  => [
                self::MODEL_CHATGLM_STD,
            ],
            ChatEnum::ZHUPI_GLM_LITE  => [
                self::MODEL_CHATGLM_Lite,
            ],
        ];
        if(true === $from){
            return $desc;
        }
        return $desc[$from] ?? [];
    }

}