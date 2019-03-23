/* eslint-disable */
// 判断是否为安卓
function isAndroid () {
    return /(Android)/i.test(navigator.userAgent);
}
// 判断是否为iOS
function isIOS () {
    return /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
}
/**
 * @description 获取客户端版本号
 * @param {Function} callback 回调函数
 */
function getInsideVersion (callback) {
    try {
        window.webkit.messageHandlers.getVersionCode.postMessage({
            callBack: 'getVersionCodeSuc'
        })
    } catch (e) {
        try {
            var version = parseInt(window.SecrectActivity.getVersionCode());
            if (isAndroid()) {
                version = version / 10;
            }
            callback && callback(version);
        } catch (e) {
            callback && callback(false);
        }
    }
    window.getVersionCodeSuc = function (version) {
        callback && callback(version);
    }
}
// 在客户端内调用会返回版本号数值，在客户端外会返回false
// 如：在3.8.0版本会返回380
// getInsideVersion(function (version) {
//     // 判断版本号是否大于等于3.8.0
//     if (version >= 380) {
//         // 处理逻辑
//     }
// })
/**
 * @description 获取客户端设备ID
 * @param {Function} callback 回调函数
 */
function getDeviceId (callback) {
    var blankStr = '';
    try {
        window.webkit.messageHandlers.getDeviceId.postMessage({
            callBack: 'getDeviceIdSuc'
        })
    } catch (e) {
        try {
            if (isIOS()) {
                callback && callback(window.SecrectActivity.getDeviceId());
            } else if (isAndroid()) {
                callback && callback(window.activity.getDeviceId());
            } else {
                callback && callback(blankStr);
            }
        } catch (e) {
            callback && callback(blankStr);
        }
    }
    window.getDeviceIdSuc = function (deviceId) {
        callback && callback(deviceId);
    }
}
// 在客户端内调用会返回设备ID字符串，在客户端外会返回空字符串
// getDeviceId(function (deviceId) {
//     // 处理逻辑
// })
/**
 * @description 获取用户登录信息
 * @param {Function} callback 回调函数
 */
function getUserInfoFromInside (callback) {
    try {
        window.webkit.messageHandlers.getUserInfo.postMessage({
            callBack: 'getUserInfoSuc'
        })
    } catch (e) {
        try {
            var res = window.SecrectActivity.getUserInfo();
            callback && callback(JSON.parse(res));
        } catch (e) {
            callback && callback(false);
        }
    }
    window.getUserInfoSuc = function (res) {
        callback && callback(JSON.parse(res));
    }
}
// 在客户端内调用会返回用户登录信息，在客户端外会返回false
// 返回信息为Object，包含以下两个字段：
// userUuid: 用于数据请求的userUuid，未登录的情况下为空字符串
// phone: 用户是否用使用手机号登录或账户是否绑定手机号，是则返回1，否则返回0（未登录也返回0）
/*
返回样例：
{
  userUuid: 'fdfsafds-fdfsdfsdf-fdfasfsdf-fdsaff',
  phone: 1
}
*/
// getUserInfoFromInside(function (userInfo) {
//     // 处理逻辑
// })
// 首先获取客户端版本信息
// getInsideVersion(function (version) {
//     if (version >= 380) {
//         if (version >= 460) {
//             getUserInfoFromInside(function (userInfo) {
//                 var userUuid = userInfo.userUuid;
//                 var phone = userInfo.phone;
//                 // 首先判断是否已经登录
//                 // 没有登录的需要先弹出手机登录框
//                 if (!userUuid) {
//                     // 进入登录协议头获取登录信息
//                     window.location.href = 'getLoginPhoneInfo:///';
//                     return;
//                 }
//                 // 然后判断是否绑定手机号
//                 if (!phone) {
//                     // 弹出绑定手机号弹窗，具体样式看后文
//                     // 弹出绑定手机号弹窗代码
//                     return;
//                 }
//                 // 最后符合要求的进入登录协议头获取登录信息
//                 // 进入登录协议头获取登录信息
//                 window.location.href = 'getLoginPhoneInfo:///';
//             })
//         } else {
//             // 低于4.6.0版本直接获取登录信息
//             // 进入登录协议头获取登录信息
//             window.location.href = 'getLoginPhoneInfo:///';
//         }
//     } else {
//         // 低于3.8.0版本提示用户下载南方+或者不做处理
//     }
// })
// // 获取登录信息
// // 该方法需要提前实现在全局下，当调用登录协议头时，客户端会调用该方法并传值
// /*
// 返回样例："{"userUuid":"fdfsafds-fdfsdfsdf-fdfasfsdf-fdsaff"}"
// */
// window.getLoginUserData = function (userData) {
//     // 进入登录回调方法需要先隐藏绑定手机号弹框
//     // 隐藏绑定手机号弹窗代码
//     // 获取登录信息
//     // 返回的是字符串，需要转换为Object
//     let data = JSON.parse(userData);
//     if (data.userUuid !== '') {
//         // 得到用户的userUuid
//     }
// }
// 分享地址，需自己配置

export {
    getInsideVersion,
    getDeviceId,
    getUserInfoFromInside,
}
