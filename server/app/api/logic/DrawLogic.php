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

namespace app\api\logic;

use app\common\enum\DrawEnum;
use app\common\enum\user\AccountLogEnum;
use app\common\logic\AccountLogLogic;
use app\common\logic\BaseLogic;
use app\common\model\draw\DrawRecords;
use app\common\model\user\User;
use app\common\service\ConfigService;
use app\common\service\draw\DrawDriver;
use app\common\service\storage\Driver as StorageDriver;
use think\facade\Db;
use think\facade\Log;
use app\common\service\openai\ChatGptService;


/**
 * 绘图逻辑
 * Class DrawLogic
 * @package app\api\logic
 */
class DrawLogic extends BaseLogic
{
    /**
     * @notes 生成图片
     * @param $userId
     * @param $params
     * @return array|false
     * @author 段誉
     * @date 2023/7/24 15:17
     */
    public static function imagine($userId, $params)
    {
        //校验能否绘画
        $checkResult = self::checkAbleDraw($userId, $params);
        if ($checkResult !== true) {
            self::$error = $checkResult;
            return false;
        }

        // 翻译关键词
        $translateResult = self::autoTranslatePrompt($params['prompt']);
        if ($translateResult === false) {
            return false;
        }

        $params['prompt_en'] = $translateResult;

        // 写入绘画记录，扣除用户余额 (内含事务)
        $recordData = self::drawRecordHandle($userId, $params);
        if ($recordData === false) {
            return false;
        }

        // 发起绘图请求
        $drawRes = self::drawImagineHandle($recordData['record'], $recordData['image_id']);
        if (false === $drawRes) {
            return false;
        }

        return ['records_id' => $recordData['record']['id']];
    }

    /**
     * @notes 下载图片
     * @param $downloadUrl
     * @return string
     * @throws \think\Exception
     * @author 段誉
     * @date 2023/6/19 19:58
     */
    public static function downloadImage($downloadUrl): string
    {
        if (empty($downloadUrl)) {
            return '';
        }

        // 存储引擎
        $config = [
            'default' => ConfigService::get('storage', 'default', 'local'),
            'engine' => ConfigService::get('storage')
        ];

        // 文件名称
        $fileName = md5($downloadUrl) . '.png';

        if ($config['default'] == 'local') {
            // 本地存储
            $localPath = download_file($downloadUrl, 'uploads/draw/' . date('Ymd') . '/', $fileName);
        } else {
            // 第三方存储
            $localPath = 'uploads/draw/' . date('ymd') . '/' . $fileName;
            $StorageDriver = new StorageDriver($config);
            if (!$StorageDriver->fetch($downloadUrl, $localPath)) {
                throw new \Exception('头像保存失败:' . $StorageDriver->getError());
            }
        }
        return $localPath;
    }

    /**
     * @notes 校验能否绘画
     * @param $userId
     * @return bool|string
     * @author 段誉
     * @date 2023/6/21 14:29
     */
    public static function checkAbleDraw($userId, $params)
    {
        $openConfig = ConfigService::get('draw_config', 'is_open', 0);;
        if ($openConfig != 1) {
            return "绘画功能已关闭";
        }

        // 绘画消耗
        $needBalance = 1;

        // 模型计费配置
        $drawBillConfig = self::drawBillingConfig();
        if ($drawBillConfig['is_open']) {
            // 开启模型计费
            $drawModel = $params['model'] ?? '';
            if (empty($drawModel)) {
                return '请选择绘画模型';
            }

            $billConfig = $drawBillConfig['billing_config'];
            if (empty($billConfig[$drawModel])) {
                return '所选模型不存在';
            }

            if ($billConfig[$drawModel]['status'] != 1) {
                return '所选模型已关闭';
            }

            $needBalance = $billConfig[$drawModel]['balance'] ?? 1;
        }

        $user = User::where('id', $userId)->findOrEmpty()->toArray();
        if ($user['balance_draw'] < $needBalance) {
            return '余额不足';
        }
        return true;
    }

    /**
     * @notes 翻译提示词
     * @param $prompt
     * @return array|false|string
     * @author 段誉
     * @date 2023/7/7 15:50
     */
    public static function autoTranslatePrompt($prompt)
    {
        try {
            $promptEn = "";
            // 自动翻译关键词
            $apiType = ConfigService::get('draw_config', 'type', DrawEnum::API_ZHISHUYUN_FAST);
            // api配置
            $apiConfig = ConfigService::get('draw_config', $apiType, []);
            if (isset($apiConfig['auto_translate']) && $apiConfig['auto_translate'] == 1
                && isset($apiConfig['translate_type']) && $apiConfig['translate_type'] == 1) {
                // 翻译配置
                $translateConfig = ConfigService::get('draw_config','translate',DrawEnum::getTranslateConfig());
                // 自动翻译
                $prompt = str_replace('{prompt}', $prompt, $translateConfig['prompt']);
                $promptEn = (new ChatGptService($translateConfig['model']))->translate($prompt);
            }
            return $promptEn;
        } catch (\Exception $e) {
            self::$error = "翻译失败:" . $e->getMessage();
            return false;
        }
    }

    /**
     * @notes 绘画记录处理
     * @param $userId
     * @param $params
     * @return array|false
     * @author 段誉
     * @date 2023/6/25 16:10\
     */
    public static function drawRecordHandle($userId, $params)
    {
        Db::startTrans();
        try {
            // 绘画类型
            $drawType = DrawEnum::TYPE_TEXT_TO_IMAGE;
            // 绘画动作
            $action = $params['action'];
            // 操作图片id
            $imageId = '';
            // 关键词
            $prompt = $params['prompt'];
            if (!empty($params['prompt_en'])) {
                $prompt = $params['prompt_en'];
            }

            // uv操作
            if ($params['action'] != 'generate') {
                if (str_contains($params['action'], 'upsample')) {
                    $drawType = DrawEnum::TYPE_UPSCALE_IMAGE;
                }

                if (str_contains($params['action'], 'variation')) {
                    $drawType = DrawEnum::TYPE_VARIATION_IMAGE;
                }

                $imageId = $params['image_id'];
            }

            // 垫图
            if (!empty($params['image_base'])) {
                $prompt = $params['image_base'] . ' ' . $prompt;
            }

            // 图片比例
            if (!empty($params['scale'])) {
                $prompt .= ' --ar ' . $params['scale'];
            }

            // 如果开启模型计费则使用
            $drawModel = self::drawModelConfig($params['model']);

            // 扣除用户余额
            self::drawBalanceHandle(
                $userId, $drawModel['balance'],
                AccountLogEnum::DRAW_DEC_IMAGE
            );

            // 增加绘图记录
            $record = DrawRecords::create([
                'user_id' => $userId,
                'type' => $drawType,
                'action' => $action,
                'prompt' => $params['prompt'],
                'prompt_en' => $params['prompt_en'],
                'prompt_desc' => $prompt,
                'scale' => $params['scale'] ?? '',
                'image_base' => $params['image_base'] ?? '',
                'status' => DrawEnum::STATUS_NOT,
                'use_tokens' => $drawModel['balance'],
                'model' => $drawModel['model'],
            ]);

            Db::commit();

            return [
                'record' => $record,
                'image_id' => $imageId,
            ];

        } catch (\Exception $e) {
            Db::rollback();
            self::$error = $e->getMessage();
            return false;
        }
    }

    /**
     * @notes 绘画生成处理
     * @param $record
     * @param $selectImageId
     * @return bool
     * @author 段誉
     * @date 2023/7/25 16:57
     */
    public static function drawImagineHandle($record, $selectImageId)
    {
        $response = [];
        try {
            // 投递任务 关键词生图
            $drawDriver = new DrawDriver($record['model']);
            $response = $drawDriver->imagine([
                'prompt' => $record['prompt_desc'],
                'action' => $record['action'],
                'image_id' => $selectImageId,
            ]);

            // 更新绘图记录
            switch ($record['model']) {
                //知数云
                case DrawEnum::API_ZHISHUYUN_FAST:
                case DrawEnum::API_ZHISHUYUN_RELAX:
                    if (empty($response['task_id'])) {
                        $errMsg = !empty($response['detail']) ? $response['detail'] : '提交失败';
                        throw new \Exception($errMsg);
                    }

                    if (isset($response['success']) && $response['success'] == false) {
                        $errMsg = !empty($response['detail']) ? $response['detail'] : '提交失败';
                        throw new \Exception($errMsg);
                    }

                    DrawRecords::where(['id' => $record['id']])->update([
                        'task_id' => $response['task_id'] ?? '',
                        'notify_snap' => json_encode($response, JSON_UNESCAPED_UNICODE),
                        'status' => DrawEnum::STATUS_IN_PROGRESS,
                        'update_time' => time(),
                    ]);
                    break;
            }

            return true;

        } catch (\Exception $e) {
            self::$error = $e->getMessage();

            // 生成图片失败更新记录状态
            DrawRecords::where(['id' => $record['id']])->update([
                'status' => DrawEnum::STATUS_FAIL,
                'notify_snap' => !empty($response) ? json_encode($response, JSON_UNESCAPED_UNICODE) : [],
                'fail_reason' => $e->getMessage(),
                'update_time' => time(),
            ]);

            // 生成失败, 没有任务id,回退用户金额
            self::drawBalanceHandle(
                $record['user_id'], $record['use_tokens'],
                AccountLogEnum::DRAW_INC_DRAW_FAIL
            );

            return false;
        }
    }

    /**
     * @notes 绘画计费模型
     * @return array
     * @author 段誉
     * @date 2023/7/19 11:59
     */
    public static function drawBillingConfig()
    {
        $isOpen = ConfigService::get('draw_config','billing_is_open', 0);
        $billingConfig = ConfigService::get('draw_config','billing_config',[]);
        $defaultConfig = DrawEnum::getDefaultBillingConfig();
        $billingConfig = array_merge($defaultConfig,$billingConfig);
        return [
            'is_open'           => $isOpen,
            'billing_config'    => $billingConfig
        ];
    }

    /**
     * @notes 绘画模型配置
     * @param $drawModel
     * @return array
     * @author 段誉
     * @date 2023/7/19 11:21
     */
    public static function drawModelConfig($drawModel)
    {
        $apiType = ConfigService::get('draw_config', 'type', DrawEnum::API_ZHISHUYUN_FAST);
        $modelConfig = [
            'model' => $apiType,
            'balance' => 1,
        ];

        if (empty($drawModel)) {
            return $modelConfig;
        }

        $billConfig = self::drawBillingConfig();
        if ($billConfig['is_open'] && !empty($billConfig['billing_config'][$drawModel])) {
            $modelConfig['model'] = $drawModel;
            $modelConfig['balance'] = $billConfig['billing_config'][$drawModel]['balance'] ?? 1;
        }

        return $modelConfig;
    }

    /**
     * @notes 模型配置
     * @return array
     * @author 段誉
     * @date 2023/7/19 14:41
     */
    public static function modelConfig()
    {
        $modelArr = [];
        $config = self::drawBillingConfig();

        $apiType = ConfigService::get('draw_config', 'type', DrawEnum::API_ZHISHUYUN_FAST);
        $default = DrawEnum::getDefaultBillingConfig($apiType);

        if ($config['is_open'] == 0) {
            return [
                'name' => !empty($default['alias']) ? $default['alias'] : $default['name'],
                'model' => $default['key'],
                'balance' => 1,
                'default' => true
            ];
        }

        $defaultStatus = false;
        foreach ($config['billing_config'] as $item) {
            if (0 == $item['status']) {
                continue;
            }

            $itemDefaultStatus = false;
            if ($apiType == $item['key']) {
                $defaultStatus = true;
                $itemDefaultStatus = true;
            }

            $model = [
                'name' => !empty($item['alias']) ? $item['alias'] : $item['name'],
                'model' => $item['key'],
                'balance' => (int)$item['balance'],
                'default' => $itemDefaultStatus,
            ];
            $modelArr[] = $model;
        }

        if (!empty($modelArr) && false === $defaultStatus) {
            $modelArr[0]['default'] = true;
        }

        return $modelArr;
    }

    /**
     * @notes 绘画余额处理
     * @param $userId
     * @param $usedToken
     * @param $changeType
     * @author 段誉
     * @date 2023/7/24 11:35
     */
    public static function drawBalanceHandle($userId, $usedToken, $changeType)
    {
        // 用户信息
        $user = User::findOrEmpty($userId);

        // $action 变动类型 $totalDraw 累计绘画消费 $balanceDraw 绘画余额
        if (in_array($changeType, AccountLogEnum::DRAW_INC)) {
            $action = AccountLogEnum::INC;
            $totalDraw = $user->total_draw - $usedToken;
            $balanceDraw = $user->balance_draw + $usedToken;
        } else {
            $action = AccountLogEnum::DEC;
            $totalDraw = $user->total_draw + $usedToken;
            $balanceDraw = $user->balance_draw - $usedToken;
        }
        $totalDraw = $totalDraw < 0 ? 0 : $totalDraw;

        $user->balance_draw = $balanceDraw;
        $user->total_draw = $totalDraw;
        $user->save();

        // 记录账户流水
        AccountLogLogic::add($userId, $changeType, $action, $usedToken);
    }

    /**
     * @notes 绘画回调处理
     * @param $response
     * @return false|void
     * @author 段誉
     * @date 2023/6/25 14:52
     */
    public static function notifyZsy($response)
    {
        try {
            if (!isset($response['success']) || empty($response['task_id'])) {
                throw new \Exception("回调参数缺失");
            }

            // 绘图记录
            $record = DrawRecords::where(['task_id' => $response['task_id']])->findOrEmpty();
            if ($record->isEmpty()) {
                throw new \Exception("绘图记录信息不存在");
            }

            // 已标记成功或失败的记录不处理
            if (in_array($record['status'], [DrawEnum::STATUS_FAIL, DrawEnum::STATUS_SUCCESS])) {
                throw new \Exception("绘图记录状态为已成功或失败，无需处理");
            }

            // 回调快照
            $oldNotifySnap = !empty($record['notify_snap']) ? $record['notify_snap'] : '';
            $nowNotifySnap = json_encode($response, JSON_UNESCAPED_UNICODE);
            $notifySnap = trim($oldNotifySnap . ',' . $nowNotifySnap , ',');

            // 更新信息
            $updateData = [
                'status' => DrawEnum::STATUS_FAIL,
                'notify_snap' => $notifySnap,
                'able_actions' => !empty($response['actions']) ? json_encode($response['actions']) : "",
                'fail_reason' => !empty($response['detail']) ? $response['detail'] : '',
                'update_time' => time(),
            ];

            // 回调成功
            if ($response['success'] == true) {
                // 成功
                $updateData['status'] = DrawEnum::STATUS_SUCCESS;

                // 下载到本地
                if (!empty($response['image_url'])) {
                    $updateData['image'] = self::downloadImage($response['image_url']);
                    $updateData['image_id'] = $response['image_id'] ?? '';
                    $updateData['image_url'] = $response['image_url'] ?? '';
                }
            } else {
                self::drawBalanceHandle(
                    $record['user_id'], $record['use_tokens'],
                    AccountLogEnum::DRAW_INC_DRAW_FAIL
                );
            }

            DrawRecords::where(['id' => $record['id']])->update($updateData);

        } catch (\Exception $e) {
            Log::write('知数云绘图回调失败:' . $e->getMessage());
        }
    }

}