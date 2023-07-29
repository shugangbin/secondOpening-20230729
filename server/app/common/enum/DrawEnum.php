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

use app\common\model\creation\CreationModel;
use app\common\model\question\QuestionSample;
use app\common\model\skill\Skill;

/**
 * 绘图枚举
 * Class DrawEnum
 * @package app\common\enum
 */
class DrawEnum
{
    // 状态
    const STATUS_NOT = 0; // 待处理
    const STATUS_IN_PROGRESS = 1; // 执行中
    const STATUS_FAIL = 2; // 失败
    const STATUS_SUCCESS = 3; // 成功

    // 灵犀绘图回调状态
    const STATUS_NOT_TEXT = "NOT_START"; // 待处理
    const STATUS_IN_PROGRESS_TEXT = "IN_PROGRESS"; // 执行中
    const STATUS_FAIL_TEXT = "FAILURE"; // 失败
    const STATUS_SUCCESS_TEXT = "SUCCESS"; // 成功

    // 类型
    const TYPE_TEXT_TO_IMAGE = 1; // 文生图
    const TYPE_IMAGE_TO_IMAGE = 2; // 图生图
    const TYPE_UPSCALE_IMAGE = 3; // 图变大
    const TYPE_VARIATION_IMAGE = 4; // 图变化

    // 绘画api配置
    const API_ZHISHUYUN_FAST = 'zhishuyun_fast';
    const API_ZHISHUYUN_RELAX = 'zhishuyun_relax';
    const API_YIJIANAI = 'yijianai';
    const API_RELICATEMJ = 'relicate_mj';
    const API_LINGXI_SD = 'lingxi_sd';
    const API_LINGXI_MJ = 'lingxi_mj';


    /**
     * @notes 获取模型名称
     * @param bool $from
     * @return array|mixed
     * @author cjhao
     * @date 2023/7/25 14:49
     */
    public static function getAiModelName($from = true)
    {
        $desc = [
            self::API_ZHISHUYUN_FAST       => '知数云-MJ',
            self::API_ZHISHUYUN_RELAX      => '知数云-慢速MJ',
            self::API_YIJIANAI             => '意间AI',
            self::API_RELICATEMJ           => 'Relicate-MJ',
            self::API_LINGXI_SD            => '灵犀-SD',
            self::API_LINGXI_MJ            => '灵犀-MJ',
        ];
        if(true === $from) {
            return $desc;
        }
        return $desc[$from] ?? '';
    }

    /**
     * @notes
     * @param bool $from
     * @return array|string[]|\string[][]
     * @author 段誉
     * @date 2023/7/7 11:26
     */
    public static function getDrawDefaultConfig($from = true)
    {
        $desc = [
            // 知数云fast
            self::API_ZHISHUYUN_FAST => [
                'name' => '知数云-MJ',
                'status' => 1,
                'token' => "",
                'auto_translate' => 0,
                'translate_type'    => 1,   //1-系统翻译；2-手动翻译;
                'is_open' => 1,
            ],
            // 知数云relax
            self::API_ZHISHUYUN_RELAX => [
                'name' => '知数云-慢速MJ',
                'status' => 0,
                'token' => "",
                'auto_translate' => 0,
                'translate_type'    => 1,   //1-系统翻译；2-手动翻译;
                'is_open' => 1,
            ],
            // 意间ai
            self::API_YIJIANAI => [
                'name' => '意间AI',
                'status' => 0,
                'token' => "",
                'auto_translate' => 0,
                'translate_type'    => 1,   //1-系统翻译；2-手动翻译;
                'is_open' => 0,
            ],
            // relicate_mj
            self::API_RELICATEMJ => [
                'name' => 'Relicate-MJ',
                'status' => 0,
                'token' => "",
                'auto_translate' => 0,
                'translate_type'    => 1,   //1-系统翻译；2-手动翻译;
                'is_open' => 0,
            ],
            // 灵犀-sd
            self::API_LINGXI_SD => [
                'name' => '灵犀-SD',
                'status' => 0,
                'token' => "",
                'auto_translate' => 0,
                'translate_type'    => 1,   //1-系统翻译；2-手动翻译;
                'is_open' => 0,
            ],
            // 灵犀-MJ
            self::API_LINGXI_MJ => [
                'name' => ' 灵犀-MJ',
                'status' => 0,
                'token' => "",
                'auto_translate' => 0,
                'translate_type'    => 1,   //1-系统翻译；2-手动翻译;
                'is_open' => 0,
            ],
        ];
        if (true === $from) {
            return $desc;
        }
        return $desc[$from] ?? [];
    }

    /**
     * @notes 计费模型默认配置
     * @param bool $from
     * @return array|mixed
     * @author cjhao
     * @date 2023/7/18 19:00
     */
    public static function getDefaultBillingConfig($from = true)
    {
        $desc = [
            // 知数云fast
            self::API_ZHISHUYUN_FAST => [
                'name'              => '知数云-MJ',
                'key'               => self::API_ZHISHUYUN_FAST,
                'status'            => 0,
                'alias'             => '',
                'balance'           => '',
            ],
            // 知数云relax
            self::API_ZHISHUYUN_RELAX => [
                'name'              => '知数云-慢速MJ',
                'key'               => self::API_ZHISHUYUN_RELAX,
                'status'            => 0,
                'alias'             => '',
                'balance'           => '',
            ],
        ];
        if (true === $from) {
            return $desc;
        }
        return $desc[$from] ?? [];
    }

    /**
     * @notes 获取翻译配置
     * @return array
     * @author cjhao
     * @date 2023/7/17 17:15
     */
    public static function getTranslateConfig()
    {
        return [
            'model'     => ChatEnum::OPEN_GPT_35,
            'prompt'    => '我会用任何语言和你交流，你只需将我的话翻译为英语，不要解释我的话或者回复其他信息，请立刻将我的话翻译返回，我的话是:{prompt}',
        ];
    }


}