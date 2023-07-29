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
namespace app\adminapi\validate\setting;
use app\common\validate\BaseValidate;

/**
 * ai参数配置验证类
 * Class AiSettingValidate
 * @package app\adminapi\validate\setting
 */
class AiSettingValidate extends BaseValidate
{

    protected $rule = [
        'key'               => 'require',
//        'api_key'           => 'require|array|checkApiKey',
        'model'             => 'require',
        'ai_api_key'        => 'require',
        'is_sensitive'      => 'require|in:0,1',
        'is_markdown'       => 'require|in:0,1',
        'chat_logo'         => 'require',
        'is_tip'            => 'require|in:0,1',

//        'max_tokens'        => 'require|gt:0',
        'temperature'       => 'require|between:0,1',
        'context_num'       => 'require|in:0,1,2,3,4,5',
        'top_p'             => 'require|between:0,1',
//        'presence_penalty'  => 'require|between:0,1',
//        'frequency_penalty' => 'require|between:0,1',
//        'n'                 => 'require|in:1,2,3,4,5',
        'chat_limit_tips'         => 'require',
    ];

    protected $message = [
        'key.require'           => '请选择语言模型',
        'api_key.require'       => '请输入apiKey接口秘钥',
        'api_key.array'         => 'apiKey接口秘钥错误',
        'model.require'         => '请选择模型',
        'ai_api_key.require'    => '请输入apiKey',
        'is_sensitive.require'  => '请选择是否开启敏感词库',
        'is_sensitive.in'       => '敏感词库值错误',
        'is_markdown.require'   => '请选择是否开启markdown渲染',
        'is_markdown.in'        => 'markdown渲染值错误',
        'chat_logo.require'     => '请选择对话图标',
        'is_tip.require'        => '请选择是否开启局限性提示',
        'is_tip.in'             => '局限性提示值错误',

//        'max_tokens.require'    => '请输入最大长度',
//        'max_tokens.lt'         => '最大长度不能小于零',
        'temperature.require'   => '请选择词汇属性',
        'temperature.between'   => '词汇属性值在0~1之间',
        'context_num.require'   => '请选择上下文总数',
        'context_num.in'        => '上下文总数值错误',
        'top_p.require'         => '请选择随机属性',
        'top_p.between'         => '随机属性值在0~1之间',
        'presence_penalty.require'         => '请选择话题属性',
        'presence_penalty.between'         => '题属性值在0~1之间',
        'frequency_penalty.require'         => '请选择重复属性',
        'frequency_penalty.between'         => '重复属性值在0~1之间',
        'n.require'             => '请选择最大回复',
        'n.in'                  => '最大回复值错误',
        'chat_limit_tips.require'                  => '请输入对话上限提示语',
    ];

    public function sceneGetConfig()
    {
        return $this->only(['key']);
    }

    public function sceneSetConfig()
    {
        return $this->only(['key','api_key','model','temperature','context_num','top_p','presence_penalty','frequency_penalty','n']);
    }

    public function sceneQueryBalance()
    {
        return $this->only(['ai_api_key']);
    }

    public function sceneSetChatConfig()
    {
        return $this->only(['is_markdown','chat_logo','is_tip','chat_limit_tips']);
    }

    /**
     * @notes 验证api_key
     * @param $value
     * @param $rule
     * @param $data
     * @return bool|string
     * @author cjhao
     * @date 2023/6/13 16:15
     */
    public function checkApiKey($value,$rule,$data){
        foreach ($value as $key => $item){
            if(empty($item)){
                $keyNum = $key+1;
                return '请填写第'.$keyNum.'个接口秘钥';
            }
        }
        return true;
    }
}