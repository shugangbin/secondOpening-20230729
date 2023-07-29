<?php

namespace app\common\service\draw;


use app\common\enum\DrawEnum;
use app\common\service\ConfigService;
use WpOrg\Requests\Requests;

class DrawService
{
    protected $baseUrl = "https://api.zhishuyun.com/midjourney/imagine";

    protected $headers = [];

    protected $apiToken;

    protected $notifyHook;

    public function __construct($model = '')
    {
        $openConfig = ConfigService::get('draw_config', 'is_open', 0);
        if (!$openConfig) {
            throw new \Exception("绘画功能已关闭");
        }

        if (!empty($model)) {
            $apiType = $model;
        } else {
            $apiType = ConfigService::get('draw_config', 'type', DrawEnum::API_ZHISHUYUN_FAST);
        }

        if ($apiType == DrawEnum::API_ZHISHUYUN_RELAX) {
            $this->baseUrl .= '/relax';
        }

        $apiConfig = ConfigService::get('draw_config', $apiType, []);
        if (empty($apiConfig['token'])) {
            throw new \Exception("请在后台设置绘画相关配置");
        }

        $this->apiToken = $apiConfig['token'];
        $this->headers['content-type'] = 'application/json';
        $this->headers['accept'] = "application/json";
        $this->notifyHook = request()->domain() . '/api/draw/notify';
    }

    /**
     * @notes 文生图,图生图
     * @param string $prompt 关键词
     * @param string $imageId 图片id
     * @return array
     * @throws \Exception
     * @author 段誉
     * @date 2023/6/19 11:22
     */
    public function imagine(string $prompt, string $action = 'generate', string $imageId = "")
    {
        $url = $this->baseUrl . "?token=" . $this->apiToken;
        $params = [
            'action' => $action,
            'prompt' => $prompt,
            'image_id' => $imageId,
            'callback_url' => $this->notifyHook,
        ];
        $response = Requests::post($url, $this->headers, json_encode($params));
        return $this->getResponseData($response);
    }

    /**
     * @notes 流式输出
     * @param string $prompt
     * @param string $action
     * @param string $imageId
     * @return array|false
     * @throws \Exception
     * @author 段誉
     * @date 2023/6/20 16:31
     */
    public function drawStream(string $prompt, string $action = 'generate', string $imageId = "")
    {
        ignore_user_abort(true);

        $url = $this->baseUrl . "?token=" . $this->apiToken;

        $params = [
            'action' => $action,
            'prompt' => $prompt,
            'image_id' => $imageId,
            'timeout' => 1000,
//            'callback_url' => $this->notifyHook,
        ];

        header("Access-Control-Allow-Origin: *");
        header('X-Accel-Buffering: no');
        header('Content-type: text/event-stream');
        header('Cache-Control: no-cache');

        return self::postCurl($url, $params);
    }

    /**
     * @notes 提交请求
     * @param string $url
     * @param string $param
     * @return array
     * @throws \Exception
     * @author 段誉
     * @date 2023/6/25 15:38
     */
    public static function postCurl($url = '', $param = '')
    {
        $flag = true;
        $content = [];
        $callback = function ($ch, $data) use (&$content, &$flag) {
            $result = @json_decode($data, true);

            if (!empty($result['code'])) {
                $flag = !empty($result['detail']) ? $result['detail'] : "绘图异常";
            } else {
                $content = [
                    'task_id' => $result['task_id'] ?? '',
                    'image_id' => $result['image_id'] ?? '',
                    'image_url' => '',
                    'progress' => $result['progress'] ?? 0,
                    'notify_snap' => $data,
                    'actions' => $result['actions'] ?? ''
                ];

                if (!empty($result['progress']) && $result['progress'] == 100) {
                    $content['image_url'] = $result['image_url'];
                }
                echo $data;
                ob_flush();
                flush();
            }
            return strlen($data);
        };

        $curlInfo = [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => json_encode($param),
            CURLOPT_WRITEFUNCTION => $callback,
            CURLOPT_TIMEOUT => 600,
            CURLOPT_HTTPHEADER => array("accept: application/x-ndjson", "content-type: application/json"),
        ];
        $curl = curl_init();
        curl_setopt_array($curl, $curlInfo);
        curl_exec($curl);
        curl_close($curl);

        if(true !== $flag) {
            throw new \Exception($flag);
        }

        return $content;
    }


    /**
     * @notes 结果处理
     * @param $response
     * @return array
     * @throws \Exception
     * @author 段誉
     * @date 2023/6/19 11:27
     */
    public function getResponseData($response): array
    {
        return json_decode($response->body, true);
    }


}