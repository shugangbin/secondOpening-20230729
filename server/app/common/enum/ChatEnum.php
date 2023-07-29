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
 *
 * Class ChatEnum
 * @package app\common\enum
 */
class ChatEnum
{

    const OPEN_GPT_35     = 'gpt3.5';            //GPT-3.5
    const OPEN_GPT_40     = 'gpt4.0';            //GPT-4.0
    const ZHUPI_GLM_STD   = 'chatGLM-Std';       //智谱chatglm-std
    const ZHUPI_GLM_LITE  = 'chatGLM-Lite';      //智谱chatglm-lite
    const API2D_35        = 'api2d3.5';          //api2d3.5
    const API2D_40        = 'api2d4.0';          //api2d4.0
    const BAIDU           = 'BAIDU';             //文心一言
    const XUNFEI          = 'XUNFEI';            //讯飞星火
    const LINGXI          = 'LINGXI';            //灵犀星火


    //openai模型
    const OPEN_CHAT = [
        self::OPEN_GPT_35,
        self::OPEN_GPT_40,
    ];
    //api2d模型
    const API2D_CHAT = [
        self::API2D_35,
        self::API2D_40,
    ];
    //智谱模型
    const ZHUPI_CHAT = [
        self::ZHUPI_GLM_STD,
        self::ZHUPI_GLM_LITE,
    ];


    /**
     * @notes 获取模型名称
     * @param bool $from
     * @return array|mixed
     * @author cjhao
     * @date 2023/6/13 14:49
     */
    public static function getAiModelName($from = true)
    {
        $desc = [
            self::OPEN_GPT_35       => 'gpt3.5',
            self::OPEN_GPT_40       => 'gpt4.0',
            self::API2D_35          => 'api2d3.5',
            self::API2D_40          => 'api2d4.0',
            self::ZHUPI_GLM_STD     => 'chatGLM-Std',
            self::ZHUPI_GLM_LITE    => 'chatGLM-Lite',
            self::BAIDU             => '文心一言',
            self::XUNFEI            => '讯飞星火',
            self::LINGXI            => '灵犀星火',
        ];
        if(true === $from) {
            return $desc;
        }
        return $desc[$from] ?? '';
    }




    /**
     * @notes 获取chat模型配置
     * @param bool $from
     * @return array|mixed
     * @author cjhao
     * @date 2023/6/13 12:01
     */
    public static function getDefaultChatConfig($from = true)
    {
        $desc = [
            //智谱ai-6B
            self::ZHUPI_GLM_STD  =>[
                'status'            => 1,//默认开启6b
                'name'              => self::getAiModelName(self::ZHUPI_GLM_STD),
                'key'               => self::ZHUPI_GLM_STD,
                'api_key'           => [],
                'model'             => ZhiPuAiEnum::DAFAULT_CONFIG['glm-model-std'],
                'model_list'        => ZhiPuAiEnum::getModelLists(self::ZHUPI_GLM_STD),
                'context_num'       => ZhiPuAiEnum::DAFAULT_CONFIG['context_num'],
                'temperature'       => ZhiPuAiEnum::DAFAULT_CONFIG['temperature'],
                'top_p'             => ZhiPuAiEnum::DAFAULT_CONFIG['top_p'],
                'source'            => 'zhipu',
                'is_open'           => 1,
//                'api_url'           => '/api/paas/v3/model-api/chatglm_6b/sse-invoke',
                'api_url'           => '/api/paas/v3/model-api/chatglm_std/sse-invoke',

            ],
            //智谱ai-130B
            self::ZHUPI_GLM_LITE  =>[
                'status'            => 0,
                'name'              => self::getAiModelName(self::ZHUPI_GLM_LITE),
                'key'               => self::ZHUPI_GLM_LITE,
                'api_key'           => [],
                'model'             => ZhiPuAiEnum::DAFAULT_CONFIG['glm-model-lite'],
                'model_list'        => ZhiPuAiEnum::getModelLists(self::ZHUPI_GLM_LITE),
                'context_num'       => ZhiPuAiEnum::DAFAULT_CONFIG['context_num'],
                'temperature'       => ZhiPuAiEnum::DAFAULT_CONFIG['temperature'],
                'top_p'             => ZhiPuAiEnum::DAFAULT_CONFIG['top_p'],
                'source'            => 'zhipu',
                'is_open'           => 1,
//                'api_url'           => '/api/paas/v3/model-api/chatglm_130b/sse-invoke',
                'api_url'           => '/api/paas/v3/model-api/chatglm_lite/sse-invoke',

            ],
            //openai3.5
            self::OPEN_GPT_35    => [
                'status'            => 0,
                'name'              => self::getAiModelName(self::OPEN_GPT_35),
                'key'               => self::OPEN_GPT_35,
                'api_key'           => [],
                'model'             => OpenAiEnum::OPENAI_CONFIG['gpt3.5-model'],
                'model_list'        => OpenAiEnum::getModelLists(self::OPEN_GPT_35),
                'context_num'       => OpenAiEnum::OPENAI_CONFIG['context_num'],
                'temperature'       => OpenAiEnum::OPENAI_CONFIG['temperature'],
                'top_p'             => OpenAiEnum::OPENAI_CONFIG['top_p'],
                'presence_penalty'  => OpenAiEnum::OPENAI_CONFIG['presence_penalty'],
                'frequency_penalty' => OpenAiEnum::OPENAI_CONFIG['frequency_penalty'],
                'n'                 => OpenAiEnum::OPENAI_CONFIG['n'],
                'source'            => 'openai',
                'is_open'           => 1,
            ],
            //openai4.0
            self::OPEN_GPT_40    => [
                'status'            => 0,
                'name'              => self::getAiModelName(self::OPEN_GPT_40),
                'key'               => self::OPEN_GPT_40,
                'api_key'           => [],
                'model'             => OpenAiEnum::OPENAI_CONFIG['gpt4.0-model'],
                'model_list'        => OpenAiEnum::getModelLists(self::OPEN_GPT_40),
                'context_num'       => OpenAiEnum::OPENAI_CONFIG['context_num'],
                'temperature'       => OpenAiEnum::OPENAI_CONFIG['temperature'],
                'top_p'             => OpenAiEnum::OPENAI_CONFIG['top_p'],
                'presence_penalty'  => OpenAiEnum::OPENAI_CONFIG['presence_penalty'],
                'frequency_penalty' => OpenAiEnum::OPENAI_CONFIG['frequency_penalty'],
                'n'                 => OpenAiEnum::OPENAI_CONFIG['n'],
                'source'            => 'openai',
                'is_open'           => 1,

            ],
            //api2d3.5
            self::API2D_35    => [
                'status'            => 0,
                'name'              => self::getAiModelName(self::API2D_35),
                'key'               => self::API2D_35,
                'api_key'           => [],
                'model'             => Api2DEnum::DAFAULT_CONFIG['apid2-3.5-model'],
                'model_list'        => Api2DEnum::getModelLists(self::API2D_35),
                'context_num'       => Api2DEnum::DAFAULT_CONFIG['context_num'],
                'temperature'       => Api2DEnum::DAFAULT_CONFIG['temperature'],
                'top_p'             => Api2DEnum::DAFAULT_CONFIG['top_p'],
                'presence_penalty'  => Api2DEnum::DAFAULT_CONFIG['presence_penalty'],
                'frequency_penalty' => Api2DEnum::DAFAULT_CONFIG['frequency_penalty'],
                'n'                 => Api2DEnum::DAFAULT_CONFIG['n'],
                'source'            => 'openai',
                'is_open'           => 1,

            ],
            //api2d4.0
            self::API2D_40    => [
                'status'            => 0,
                'name'              => self::getAiModelName(self::API2D_40),
                'key'               => self::API2D_40,
                'api_key'           => [],
                'model'             => Api2DEnum::DAFAULT_CONFIG['apid2-4.0-model'],
                'model_list'        => Api2DEnum::getModelLists(self::API2D_40),
                'context_num'       => Api2DEnum::DAFAULT_CONFIG['context_num'],
                'temperature'       => Api2DEnum::DAFAULT_CONFIG['temperature'],
                'top_p'             => Api2DEnum::DAFAULT_CONFIG['top_p'],
                'presence_penalty'  => Api2DEnum::DAFAULT_CONFIG['presence_penalty'],
                'frequency_penalty' => Api2DEnum::DAFAULT_CONFIG['frequency_penalty'],
                'n'                 => Api2DEnum::DAFAULT_CONFIG['n'],
                'source'            => 'openai',
                'is_open'           => 1,

            ],

            //文言一心
            self::BAIDU        => [
                'key'               => self::BAIDU,
                'name'              => self::getAiModelName(self::BAIDU),
                'is_open'           => 0,
                'status'            => 0,
                'context_num'       => 0,
                'temperature'       => 0,
                'top_p'             => 0,

            ],
            //讯飞星火
            self::XUNFEI        => [
                'key'               => self::XUNFEI,
                'name'              => self::getAiModelName(self::XUNFEI),
                'is_open'           => 0,
                'status'            => 0,
                'context_num'       => 0,
                'temperature'       => 0,
                'top_p'             => 0,
            ],
            //灵犀星火
            self::LINGXI        => [
                'key'               => self::LINGXI,
                'name'              => self::getAiModelName(self::LINGXI),
                'is_open'           => 0,
                'status'            => 0,
                'context_num'       => 0,
                'temperature'       => 0,
                'top_p'             => 0,

            ],
        ];
        if(true === $from) {
            return $desc;
        }
        return $desc[$from] ?? [];
    }


    /**
     * @notes 默认计费配置
     * @param bool $from
     * @return array|mixed
     * @author cjhao
     * @date 2023/7/18 17:14
     */
    public static function getDefaultBillingConfig($from = true)
    {
        $desc = [
            //智谱ai-6B
            self::ZHUPI_GLM_STD  =>[
                'key'               => self::ZHUPI_GLM_STD,
                'name'              => self::getAiModelName(self::ZHUPI_GLM_STD),
                'status'            => 0,
                'alias'             => '',
                'balance'           => '',
            ],
            //智谱ai-130B
            self::ZHUPI_GLM_LITE  =>[
                'key'               => self::ZHUPI_GLM_LITE,
                'name'              => self::getAiModelName(self::ZHUPI_GLM_LITE),
                'status'            => 0,
                'alias'             => '',
                'balance'           => '',

            ],
            //openai3.5
            self::OPEN_GPT_35    => [
                'key'               => self::OPEN_GPT_35,
                'name'              => self::getAiModelName(self::OPEN_GPT_35),
                'status'            => 0,
                'alias'             => '',
                'balance'           => '',
            ],
            //openai4.0
            self::OPEN_GPT_40    => [
                'key'               => self::OPEN_GPT_40,
                'name'              => self::getAiModelName(self::OPEN_GPT_40),
                'status'            => 0,
                'alias'             => '',
                'balance'           => '',
            ],
            //api2d3.5
            self::API2D_35    => [
                'key'               => self::API2D_35,
                'name'              => self::getAiModelName(self::API2D_35),
                'status'            => 0,
                'alias'             => '',
                'balance'           => '',
            ],
            //api2d4.0
            self::API2D_40    => [
                'key'               => self::API2D_40,
                'name'              => self::getAiModelName(self::API2D_40),
                'status'            => 0,
                'alias'             => '',
                'balance'           => '',
            ],
        ];
        if(true === $from) {
            return $desc;
        }
        return $desc[$from] ?? [];

    }



}