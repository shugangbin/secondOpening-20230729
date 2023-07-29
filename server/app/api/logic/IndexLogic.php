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

namespace app\api\logic;


use app\common\enum\DrawEnum;
use app\common\enum\user\UserTerminalEnum;
use app\common\logic\BaseLogic;
use app\common\model\article\Article;
use app\common\model\decorate\DecoratePage;
use app\common\model\decorate\DecorateTabbar;
use app\common\model\IndexVisit;
use app\common\service\ConfigService;
use app\common\service\FileService;
use app\common\service\wechat\WeChatOaService;
use think\facade\Log;


/**
 * index
 * Class IndexLogic
 * @package app\api\logic
 */
class IndexLogic extends BaseLogic
{

    /**
     * @notes 首页数据
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2022/9/21 19:15
     */
    public static function getIndexData()
    {
        // 装修配置
        $decoratePage = DecoratePage::findOrEmpty(1);

        // 首页文章
        $field = [
            'id', 'title', 'desc', 'abstract', 'image',
            'author', 'click_actual', 'click_virtual', 'create_time'
        ];

        $article = Article::field($field)
            ->where(['is_show' => 1])
            ->order(['id' => 'desc'])
            ->limit(20)->append(['click'])
            ->hidden(['click_actual', 'click_virtual'])
            ->select()->toArray();

        return [
            'page' => $decoratePage,
            'article' => $article
        ];
    }


    /**
     * @notes 获取政策协议
     * @param string $type
     * @return array
     * @author 段誉
     * @date 2022/9/20 20:00
     */
    public static function getPolicyByType(string $type)
    {
        return [
            'title' => ConfigService::get('agreement', $type . '_title', ''),
            'content' => ConfigService::get('agreement', $type . '_content', ''),
        ];
    }


    /**
     * @notes 装修信息
     * @param $id
     * @return array
     * @author 段誉
     * @date 2022/9/21 18:37
     */
    public static function getDecorate($id)
    {
        return DecoratePage::field(['type', 'name', 'data'])
            ->findOrEmpty($id)->toArray();
    }


    /**
     * @notes 获取配置
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2022/9/21 19:38
     */
    public static function getConfigData($code)
    {

        // 导航颜色
        $style = ConfigService::get('tabbar', 'style', config('project.decorate.tabbar_style'));
        // 登录配置
        $loginConfig = [
            // 登录方式
            'login_way' => ConfigService::get('login', 'login_way', config('project.login.login_way')),
            // 注册强制绑定手机
//            'coerce_mobile' => ConfigService::get('login', 'coerce_mobile', config('project.login.coerce_mobile')),
            // 政策协议
            'login_agreement' => ConfigService::get('login', 'login_agreement', config('project.login.login_agreement')),
            // 第三方登录 开关
//            'third_auth' => ConfigService::get('login', 'third_auth', config('project.login.third_auth')),
            // 微信授权登录
//            'wechat_auth' => ConfigService::get('login', 'wechat_auth', config('project.login.wechat_auth')),
            // qq授权登录
//            'qq_auth' => ConfigService::get('login', 'qq_auth', config('project.login.qq_auth')),
            // 短信验证码
            'sms_verify' => ConfigService::get('login', 'sms_verify', config('project.login.sms_verify')),
            // 关注文案
            'involved_text' => ConfigService::get('login', 'involved_text'),
        ];
        // 网址信息
        $website = [
            'shop_name' => ConfigService::get('website', 'shop_name'),
            'shop_logo' => FileService::getFileUrl(ConfigService::get('website', 'shop_logo')),
        ];
        // H5配置
        $webPage = [
            // 渠道状态 0-关闭 1-开启
            'status' => ConfigService::get('web_page', 'status', 1),
            // 关闭后渠道后访问页面 0-空页面 1-自定义链接
            'page_status' => ConfigService::get('web_page', 'page_status', 0),
            // 自定义链接
            'page_url' => ConfigService::get('web_page', 'page_url', ''),
            'url' => request()->domain() . '/mobile'
        ];
        //分享配置
        $share = [
            'share_page'        => ConfigService::get('share', 'share_page',2),
            'share_title'       => ConfigService::get('share', 'share_title',''),
            'share_content'     => ConfigService::get('share', 'share_content',''),
            'share_image'       => FileService::getFileUrl(ConfigService::get('share', 'share_image','')),
        ];
        //对话配置
        $chat = [
            'is_sensitive' => ConfigService::get('chat_config','is_sensitive',1),
            'is_markdown' => ConfigService::get('chat_config','is_markdown',1),
            'chat_logo' => FileService::getFileUrl(ConfigService::get('chat_config','chat_logo',ConfigService::get('default_image','chat_logo'))),
            'is_tip' => ConfigService::get('chat_config','is_tip',1),
        ];



        //是否需要强制关注公众号
        $is_follow_official = ConfigService::get('login', 'is_follow_official', config('project.login.is_follow_official'));
        $subscribe = 0;
        if ($code && $is_follow_official) {
            try {
                $response = (new WeChatOaService())->getOaResByCode($code);
                $response = (new WeChatOaService())->userInfo($response['openid'] ?? '');
                $subscribe = $response['subscribe'] ?? 0;
            } catch (\Exception $e) {
                Log::write('获取用户基本信息异常：'.$e->getMessage());
            }
        }

        //公众号二维码
        $official_qr_code = ConfigService::get('oa_setting', 'qr_code', '');
        $official_qr_code = empty($official_qr_code) ? $official_qr_code : FileService::getFileUrl($official_qr_code);

        // 绘画配置
        $drawApiType = ConfigService::get('draw_config', 'api_type', DrawEnum::API_ZHISHUYUN_FAST);
        $drawTranslateType = ConfigService::get('draw_config', $drawApiType, []);
        $drawTranslateType = array_merge(DrawEnum::getDrawDefaultConfig(DrawEnum::API_ZHISHUYUN_FAST),$drawTranslateType);
        $draw = [
            'is_open' => ConfigService::get('draw_config', 'is_open', 0),
            'num' => ConfigService::get('draw_config', 'num', 10),
            'translate_type' => (int)$drawTranslateType['translate_type'] ?? 1,
        ];

        // 公告配置
        $bulletinConfig = [
            // 公告弹窗
            'is_bulletin' => ConfigService::get('bulletin_config', 'is_bulletin', 0),
            // 公告内容
            'bulletin_content' => ConfigService::get('bulletin_config', 'bulletin_content'),
        ];

        //卡密配置
        $cardCode = [
            'is_show' =>  ConfigService::get('card_code','is_show'),
            'buy_site' =>  ConfigService::get('card_code','buy_site'),
        ];

        // 底部导航
        $tabbar = DecorateTabbar::where(['type'=>1])->value('data');
        //关闭绘画功能，移除绘画菜单
//        if(0 == $draw['is_open']){
//            foreach ($tabbar['list'] as $key => $nav){
//                //移除绘画菜单
//                if('/pages/drawing/drawing' == $nav['link']['path']){
//                    unset($tabbar['list'][$key]);
//                }
//                $tabbar['list'] = array_values($tabbar['list']);
//            }
//        }
        return [
            'domain' => FileService::getFileUrl(),
            'style' => $style,
            'login' => $loginConfig,
            'website' => $website,
            'webPage' => $webPage,
            'version'=> config('project.version'),
            'share' => $share,
            'member_package_status' => ConfigService::get('member', 'status', 1),
            'recharge_package_status' => ConfigService::get('recharge', 'status', 1),
            'chat' => $chat,
            'is_follow_official' => $is_follow_official,
            'subscribe' => $subscribe,
            'official_qr_code' => $official_qr_code,
            'draw' => $draw,
            'tabbar' =>  $tabbar,
            'bulletin_config' => $bulletinConfig,
            'card_code'  => $cardCode,
        ];
    }



    /**
     * @notes 首页访客记录
     * @return bool
     * @author Tab
     * @date 2021/9/11 9:29
     */
    public static function visit()
    {
        try {
            $params = request()->post();
            if (!isset($params['terminal']) || !in_array($params['terminal'], UserTerminalEnum::ALL_TERMINAL)) {
                throw new \Exception('终端参数缺失或有误');
            }
            $ip =  request()->ip();
            // 一个ip一个终端一天只生成一条记录
            $record = IndexVisit::where([
                'ip' => $ip,
                'terminal' => $params['terminal']
            ])->whereDay('create_time')->findOrEmpty();
            if (!$record->isEmpty()) {
                // 增加访客在终端的浏览量
                $record->visit += 1;
                $record->save();
                return true;
            }
            // 生成访客记录
            IndexVisit::create([
                'ip' => $ip,
                'terminal' => $params['terminal'],
                'visit' => 1
            ]);

            return true;
        } catch (\Exception $e) {
            self::setError($e->getMessage());
            return false;
        }
    }
}