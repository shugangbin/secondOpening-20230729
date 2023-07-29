<?php

namespace app\common\service\draw;

use app\common\cache\KeyPoolCache;
use app\common\enum\DrawEnum;
use app\common\service\ConfigService;
use app\common\service\draw\engine\DrawZsy;

class DrawDriver
{
    protected $apiType;

    protected $engine;

    public function __construct(string $model = '')
    {
        // 绘画开关
        $openConfig = ConfigService::get('draw_config', 'is_open', 0);
        if (!$openConfig) {
            throw new \Exception("绘画功能已关闭");
        }

        if (!empty($model)) {
            $apiType = $model;
        } else {
            $apiType = ConfigService::get('draw_config', 'type', DrawEnum::API_ZHISHUYUN_FAST);
        }

        // 获取绘画秘钥
        $apiToken = (new KeyPoolCache($apiType))->getKey();
        if (empty($apiToken)) {
            throw new \Exception('请在后台设置绘画配置');
        }

        switch ($apiType) {
            //知数云
            case DrawEnum::API_ZHISHUYUN_FAST:
            case DrawEnum::API_ZHISHUYUN_RELAX:
                $this->engine = new DrawZsy($apiType, $apiToken);
                break;
            default:
                throw new \Exception('绘画服务异常');
        }
    }

    // 文生图，图生图
    public function imagine(array $params)
    {
        return $this->engine->imagine($params);
    }

    // 变大，变换
    public function imagineUv(array $params)
    {
        return $this->engine->imagineUv($params);
    }



}