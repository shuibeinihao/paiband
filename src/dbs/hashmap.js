'use strict'

/**
* 键名为字符的hashmap存储
* ratio rem比例
* lang 语言
* uid 家长id
* token
* appid
* cid 当前选择的孩子id
* nickname 当前选择孩子的名字
* gender 当前选择孩子的性别 1男0女
* age 当前选择孩子的年龄
* device_id 当前选择的孩子对应的device_id
* bluetoothStatus 当前deviceid对应的蓝牙状态 0蓝牙已连接手环 1蓝牙连接中 2未搜索到葡萄手环 3手机未开启蓝牙
* bluetoothStatusCalls 蓝牙变更状态回调[function]
* appAwakeCalls app唤醒回调
* screenWidth  屏幕宽度
* screenHeight  屏幕宽度
* isSync 是否正在同步中
* isLocalTest 是否为本地测试
* appCloseWebCalls 安全距离监听 关闭页面的时候判断
* qrcode二维码 version版本号 murl固件包url msize 固件包大小 surl软件包url ssize软件包大小
*
*
* securitystatus 不同孩子安全距离按钮开启状态 securitystatus{cid:true/false}
*/
const map = {
    '_map': {},
    'has': key => !!map._map[key.toString()],
    'get': key => map._map[key.toString()],
    'set': (key, value) => (map._map[key.toString()] = value)
};

export default map;
