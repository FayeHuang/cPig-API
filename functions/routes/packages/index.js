const express = require('express');
const router = express.Router();

const communityPackages = require("./communityPackages");
const householdPackages = require("./householdPackages");
const householdPackage = require("./householdPackage");
const packageSignUp = require("./packageSignUp");
const packageReceiveCode = require("./packageReceiveCode");
const packageReceiveCodeVerify = require("./packageReceiveCodeVerify");

router.use('/communities/:communityId/packages', communityPackages);
router.use('/communities/:communityId/packageReceiveCodeVerify', packageReceiveCodeVerify);
router.use('/communities/:communityId/households/:householdId/packages', householdPackages);
router.use('/communities/:communityId/households/:householdId/packages/:packageId', householdPackage);
router.use('/communities/:communityId/households/:householdId/packages/:packageId/signUp', packageSignUp);
router.use('/communities/:communityId/households/:householdId/packages/:packageId/receiveCode', packageReceiveCode);


module.exports = router;


//  [GET]       /communities/:communityId/packages
/**
 * @api {get} /communities/:communityId/packages Get packages in community
 * @apiName GetPackageInCommunity
 * @apiGroup Package
 * 
 * @apiParam {String} communityId 社區 ID
 *
 * @apiSuccess {Boolean}  success               API 執行成功與否
 * @apiSuccess {Object[]} message               執行結果
 * @apiSuccess {String}   message.id            package ID
 * @apiSuccess {String}   message.community     package 所屬社區 ID
 * @apiSuccess {String}   message.createTime    package 建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.sn            package 序號
 * @apiSuccess {Boolean}  message.isInformed    是否已通知住戶
 * @apiSuccess {Boolean}  message.isLetter      是否為掛號信
 * @apiSuccess {Object}   message.createUser    package 建立人
 * @apiSuccess {String}   message.createUser.id     建立人 ID
 * @apiSuccess {String}   message.createUser.email  建立人 Email
 * @apiSuccess {String}   message.createUser.name   建立人暱稱
 * @apiSuccess {String}   message.createUser.photo  建立人大頭貼 URL
 * @apiSuccess {Object}   message.household         package 所屬住戶
 * @apiSuccess {String}   message.household.id      住戶 ID
 * @apiSuccess {String}   message.household.floor   住戶樓層
 * @apiSuccess {String}   message.household.number  住戶門牌號碼
 * @apiSuccess {String}   message.household.createTime  住戶建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {Object}   message.household.createUser  住戶建立人
 * @apiSuccess {String}   message.household.createUser.id     建立人 ID
 * @apiSuccess {String}   message.household.createUser.email  建立人 Email
 * @apiSuccess {String}   message.household.createUser.name   建立人暱稱
 * @apiSuccess {String}   message.household.createUser.photo  建立人大頭貼
 * @apiSuccess {Boolean}  message.isReceived          是否已被領取
 * @apiSuccess {String}   [message.receiveTime]       領取時間
 * @apiSuccess {Object}   [message.receiveUser]       領取人
 * @apiSuccess {String}   [message.receiveUser.id]    領取人 ID
 * @apiSuccess {String}   [message.receiveUser.email] 領取人 Email
 * @apiSuccess {String}   [message.receiveUser.name]  領取人暱稱
 * @apiSuccess {String}   [message.receiveUser.photo] 領取人大頭貼 URL
 * @apiSuccess {String}   [message.signImage]         簽收圖檔 URL
 * 
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": [
    {
      "id": "3RFc6PU8afri69FN",
      "community": "hQcpuyY6H0envkI4",
      "createTime": 1497868110792,
      "createUser": {
        "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
        "email": "root@cpig.com",
        "name": "system_admin",
        "photo": ""
      },
      "household": {
        "id": "i54xyZvdBg1aPQCg",
        "createTime": 1497095978390,
        "createUser": {
          "id": "6guc1Vmi9KfMJ5SgHkMs7sm6hE32",
          "email": "user1@cpig.com",
          "name": "user1",
          "photo": ""
        },
        "floor": "174",
        "number": "174"
      },
      "isInformed": false,
      "isLetter": false,
      "isReceived": true,
      "receiveTime": 1497868128142,
      "receiveUser": {
        "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
        "email": "root@cpig.com",
        "name": "system_admin",
        "photo": ""
      },
      "sn": "064193"
    }
  ]
}
 *
 * @apiUse Header
 * @apiUse Error
 */

//  [GET]       /communities/:communityId/households/:householdId/packages
/**
 * @api {get} /communities/:communityId/households/:householdId/packages Get packages in household
 * @apiName GetPackageInHousehold
 * @apiGroup Package
 * 
 * @apiParam {String} communityId 社區 ID
 * @apiParam {String} householdId 住戶 ID
 *
 * @apiSuccess {Boolean}  success               API 執行成功與否
 * @apiSuccess {Object[]} message               執行結果
 * @apiSuccess {String}   message.id            package ID
 * @apiSuccess {String}   message.community     package 所屬社區 ID
 * @apiSuccess {String}   message.createTime    package 建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.sn            package 序號
 * @apiSuccess {Boolean}  message.isInformed    是否已通知住戶
 * @apiSuccess {Boolean}  message.isLetter      是否為掛號信
 * @apiSuccess {Object}   message.createUser    package 建立人
 * @apiSuccess {String}   message.createUser.id     建立人 ID
 * @apiSuccess {String}   message.createUser.email  建立人 Email
 * @apiSuccess {String}   message.createUser.name   建立人暱稱
 * @apiSuccess {String}   message.createUser.photo  建立人大頭貼 URL
 * @apiSuccess {String}   message.household         package 所屬住戶 ID
 * @apiSuccess {Boolean}  message.isReceived          是否已被領取
 * @apiSuccess {String}   [message.receiveTime]       領取時間
 * @apiSuccess {Object}   [message.receiveUser]       領取人
 * @apiSuccess {String}   [message.receiveUser.id]    領取人 ID
 * @apiSuccess {String}   [message.receiveUser.email] 領取人 Email
 * @apiSuccess {String}   [message.receiveUser.name]  領取人暱稱
 * @apiSuccess {String}   [message.receiveUser.photo] 領取人大頭貼 URL
 * @apiSuccess {String}   [message.signImage]         簽收圖檔 URL
 * 
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": [
    {
      "id": "3RFc6PU8afri69FN",
      "community": "hQcpuyY6H0envkI4",
      "createTime": 1497868110792,
      "createUser": {
        "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
        "email": "root@cpig.com",
        "name": "system_admin",
        "photo": ""
      },
      "household": "i54xyZvdBg1aPQCg",
      "isInformed": false,
      "isLetter": false,
      "isReceived": true,
      "receiveTime": 1497868128142,
      "receiveUser": {
        "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
        "email": "root@cpig.com",
        "name": "system_admin",
        "photo": ""
      },
      "sn": "064193"
    }
  ]
}
 *
 * @apiUse Header
 * @apiUse Error
 */
 
//  [POST]      /communities/:communityId/households/:householdId/packages
/**
 * @api {post} /communities/:communityId/households/:householdId/packages Create package
 * @apiName CreatePackage
 * @apiGroup Package
 * 
 * @apiParam {String} communityId 社區 ID
 * @apiParam {String} householdId 住戶 ID
 *
 * @apiSuccess {Boolean}  success               API 執行成功與否
 * @apiSuccess {Object} message               執行結果
 * @apiSuccess {String}   message.id            package ID
 * @apiSuccess {String}   message.community     package 所屬社區 ID
 * @apiSuccess {Object}   message.createTime    package 建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.sn            package 序號
 * @apiSuccess {Boolean}  message.isInformed    是否已通知住戶
 * @apiSuccess {Boolean}  message.isLetter      是否為掛號信
 * @apiSuccess {Object}   message.createUser    package 建立人
 * @apiSuccess {String}   message.createUser.id     建立人 ID
 * @apiSuccess {String}   message.createUser.email  建立人 Email
 * @apiSuccess {String}   message.createUser.name   建立人暱稱
 * @apiSuccess {String}   message.createUser.photo  建立人大頭貼 URL
 * @apiSuccess {Object}   message.household         package 所屬住戶 ID
 * @apiSuccess {Boolean}  message.isReceived          是否已被領取
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
    "success": true,
    "message": {
        "id": "0rMs5yUIYyBlWMG8",
        "community": "hQcpuyY6H0envkI4",
        "createTime": 1497925416758,
        "createUser": {
            "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
            "email": "root@cpig.com",
            "name": "system_admin",
            "photo": ""
        },
        "household": "i54xyZvdBg1aPQCg",
        "isInformed": false,
        "isLetter": false,
        "isReceived": false,
        "sn": "491160"
    }
}
 *
 * @apiUse Header
 * @apiUse Error
 */
 
//  [PUT]       /communities/:communityId/households/:householdId/packages/:packageId
/**
 * @api {put} /communities/:communityId/households/:householdId/packages/:packageId Modify package
 * @apiName PutPackage
 * @apiGroup Package
 * 
 * @apiParam {String} communityId 社區 ID
 * @apiParam {String} householdId 住戶 ID
 * @apiParam {String} packageId package ID
 * 
 * @apiParam (Request Body) {Boolean} isInformed 是否已通知住戶
 * @apiParamExample {json} Request-Example:
 *  {
 *    "isInformed": true
 *  }
 *
 * @apiSuccess {Boolean}  success               API 執行成功與否
 * @apiSuccess {Object}   message               執行結果
 * @apiSuccess {String}   message.id            package ID
 * @apiSuccess {String}   message.community     package 所屬社區 ID
 * @apiSuccess {String}   message.createTime    package 建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.sn            package 序號
 * @apiSuccess {Boolean}  message.isInformed    是否已通知住戶
 * @apiSuccess {Boolean}  message.isLetter      是否為掛號信
 * @apiSuccess {Object}   message.createUser    package 建立人
 * @apiSuccess {String}   message.createUser.id     建立人 ID
 * @apiSuccess {String}   message.createUser.email  建立人 Email
 * @apiSuccess {String}   message.createUser.name   建立人暱稱
 * @apiSuccess {String}   message.createUser.photo  建立人大頭貼 URL
 * @apiSuccess {String}   message.household         package 所屬住戶 ID
 * @apiSuccess {Boolean}  message.isReceived          是否已被領取
 * @apiSuccess {String}   [message.receiveTime]       領取時間
 * @apiSuccess {Object}   [message.receiveUser]       領取人
 * @apiSuccess {String}   [message.receiveUser.id]    領取人 ID
 * @apiSuccess {String}   [message.receiveUser.email] 領取人 Email
 * @apiSuccess {String}   [message.receiveUser.name]  領取人暱稱
 * @apiSuccess {String}   [message.receiveUser.photo] 領取人大頭貼 URL
 * @apiSuccess {String}   [message.signImage]         簽收圖檔 URL
 * 
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
    "success": true,
    "message": {
        "id": "0rMs5yUIYyBlWMG8",
        "community": "hQcpuyY6H0envkI4",
        "createTime": 1497925416758,
        "createUser": {
            "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
            "email": "root@cpig.com",
            "name": "system_admin",
            "photo": ""
        },
        "household": "i54xyZvdBg1aPQCg",
        "isInformed": true,
        "isLetter": false,
        "isReceived": false,
        "sn": "491160"
    }
}
 *
 * @apiUse Header
 * @apiUse Error
 */

//  [DELETE]    /communities/:communityId/households/:householdId/packages/:packageId
/**
 * @api {delete} /communities/:communityId/households/:householdId/packages/:packageId Delete package
 * @apiName DeletePackage
 * @apiGroup Package
 * 
 * @apiParam {String} communityId 社區 ID
 * @apiParam {String} householdId 住戶 ID
 * @apiParam {String} packageId package ID
 * 
 * @apiSuccess {Boolean}  success               API 執行成功與否
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
    "success": true
}
 *
 * @apiUse Header
 * @apiUse Error
 */
 
//  [POST]      /communities/:communityId/households/:householdId/packages/:packageId/signUp
/**
 * @api {post} /communities/:communityId/households/:householdId/packages/:packageId/signUp sign up package
 * @apiName SignUpPackage
 * @apiGroup Package
 * 
 * @apiParam {String} communityId 社區 ID
 * @apiParam {String} householdId 住戶 ID
 * @apiParam {String} packageId package ID
 * 
 * @apiParam (Request Body) {String} signImage 簽收圖檔 URL
 * @apiParamExample {json} Request-Example:
 *  {
 *    "signImage": "http://xxx"
 *  }
 *
 * @apiSuccess {Boolean}  success               API 執行成功與否
 * @apiSuccess {Object}   message               執行結果
 * @apiSuccess {String}   message.id            package ID
 * @apiSuccess {String}   message.community     package 所屬社區 ID
 * @apiSuccess {String}   message.createTime    package 建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.sn            package 序號
 * @apiSuccess {Boolean}  message.isInformed    是否已通知住戶
 * @apiSuccess {Boolean}  message.isLetter      是否為掛號信
 * @apiSuccess {Object}   message.createUser    package 建立人
 * @apiSuccess {String}   message.createUser.id     建立人 ID
 * @apiSuccess {String}   message.createUser.email  建立人 Email
 * @apiSuccess {String}   message.createUser.name   建立人暱稱
 * @apiSuccess {String}   message.createUser.photo  建立人大頭貼 URL
 * @apiSuccess {String}   message.household         package 所屬住戶 ID
 * @apiSuccess {Boolean}  message.isReceived          是否已被領取
 * @apiSuccess {String}   message.receiveTime       領取時間
 * @apiSuccess {String}   message.signImage         簽收圖檔 URL
 * 
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
    "success": true,
    "message": {
        "id": "0rMs5yUIYyBlWMG8",
        "community": "hQcpuyY6H0envkI4",
        "createTime": 1497925416758,
        "createUser": {
            "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
            "email": "root@cpig.com",
            "name": "system_admin",
            "photo": ""
        },
        "household": "i54xyZvdBg1aPQCg",
        "isInformed": false,
        "isLetter": false,
        "isReceived": true,
        "receiveTime": 1497926090090,
        "signImage": "http://xxx",
        "sn": "491160"
    }
}
 *
 * @apiUse Header
 * @apiUse Error
 */
 
//  [GET]       /communities/:communityId/households/:householdId/packages/:packageId/receiveCode
/**
 * @api {get} /communities/:communityId/households/:householdId/packages/:packageId/receiveCode Get receive code of package
 * @apiName GetReveiveCode
 * @apiGroup Package
 * 
 * @apiParam {String} communityId 社區 ID
 * @apiParam {String} householdId 住戶 ID
 * @apiParam {String} packageId package ID
 *
 * @apiSuccess {Boolean}  success                               API 執行成功與否
 * @apiSuccess {Object}   message                               執行結果
 * @apiSuccess {String}   message.id                            ID
 * @apiSuccess {String}   message.code                          receive code (6 位數字+大小寫字母隨機產生)
 * @apiSuccess {String}   message.createTime                    receive code 建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.expiredTime                   receive code 過期時間, 建立時間 5 分鐘後 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {Object}   message.package            package
 * @apiSuccess {String}   message.package.id            package ID
 * @apiSuccess {String}   message.package.community     package 所屬社區 ID
 * @apiSuccess {String}   message.package.createTime    package 建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.package.sn            package 序號
 * @apiSuccess {Boolean}  message.package.isInformed    是否已通知住戶
 * @apiSuccess {Boolean}  message.package.isLetter      是否為掛號信
 * @apiSuccess {Object}   message.package.createUser    package 建立人
 * @apiSuccess {String}   message.package.createUser.id     建立人 ID
 * @apiSuccess {String}   message.package.createUser.email  建立人 Email
 * @apiSuccess {String}   message.package.createUser.name   建立人暱稱
 * @apiSuccess {String}   message.package.createUser.photo  建立人大頭貼 URL
 * @apiSuccess {String}   message.package.household         package 所屬住戶 ID
 * @apiSuccess {Boolean}  message.package.isReceived          是否已被領取
 * @apiSuccess {String}   message.user 領取人
 * @apiSuccess {String}   message.user.id     領取人 ID
 * @apiSuccess {String}   message.user.email  領取人 Email
 * @apiSuccess {String}   message.user.name   領取人暱稱
 * @apiSuccess {String}   message.user.photo  領取人大頭貼 URL
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
    "success": true,
    "message": {
        "code": "QKaSzt",
        "createTime": 1497926294660,
        "expiredTime": 1497926594660,
        "package": {
            "id": "0rMs5yUIYyBlWMG8",
            "community": "hQcpuyY6H0envkI4",
            "createTime": 1497925416758,
            "createUser": {
                "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
                "email": "root@cpig.com",
                "name": "system_admin",
                "photo": ""
            },
            "household": "i54xyZvdBg1aPQCg",
            "isInformed": false,
            "isLetter": false,
            "isReceived": false,
            "sn": "491160"
        },
        "user": {
            "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
            "email": "root@cpig.com",
            "name": "system_admin",
            "photo": ""
        }
    }
}
 *
 * @apiUse Header
 * @apiUse Error
 */

//  [POST]      /communities/:communityId/households/:householdId/packages/:packageId/receiveCode
/**
 * @api {post} /communities/:communityId/households/:householdId/packages/:packageId/receiveCode Create receive code of package
 * @apiName PostReveiveCode
 * @apiGroup Package
 * 
 * @apiParam {String} communityId 社區 ID
 * @apiParam {String} householdId 住戶 ID
 * @apiParam {String} packageId package ID
 *
 * @apiSuccess {Boolean}  success                               API 執行成功與否
 * @apiSuccess {Object}   message                               執行結果
 * @apiSuccess {String}   message.id                            ID
 * @apiSuccess {String}   message.code                          receive code (6 位數字+大小寫字母隨機產生)
 * @apiSuccess {String}   message.createTime                    receive code 建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.expiredTime                   receive code 過期時間, 建立時間 5 分鐘後 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {Object}   message.package            package
 * @apiSuccess {String}   message.package.id            package ID
 * @apiSuccess {String}   message.package.community     package 所屬社區 ID
 * @apiSuccess {String}   message.package.createTime    package 建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.package.sn            package 序號
 * @apiSuccess {Boolean}  message.package.isInformed    是否已通知住戶
 * @apiSuccess {Boolean}  message.package.isLetter      是否為掛號信
 * @apiSuccess {Object}   message.package.createUser    package 建立人
 * @apiSuccess {String}   message.package.createUser.id     建立人 ID
 * @apiSuccess {String}   message.package.createUser.email  建立人 Email
 * @apiSuccess {String}   message.package.createUser.name   建立人暱稱
 * @apiSuccess {String}   message.package.createUser.photo  建立人大頭貼 URL
 * @apiSuccess {String}   message.package.household         package 所屬住戶 ID
 * @apiSuccess {Boolean}  message.package.isReceived          是否已被領取
 * @apiSuccess {String}   message.user 領取人
 * @apiSuccess {String}   message.user.id     領取人 ID
 * @apiSuccess {String}   message.user.email  領取人 Email
 * @apiSuccess {String}   message.user.name   領取人暱稱
 * @apiSuccess {String}   message.user.photo  領取人大頭貼 URL
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
    "success": true,
    "message": {
        "code": "QKaSzt",
        "createTime": 1497926294660,
        "expiredTime": 1497926594660,
        "package": {
            "id": "0rMs5yUIYyBlWMG8",
            "community": "hQcpuyY6H0envkI4",
            "createTime": 1497925416758,
            "createUser": {
                "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
                "email": "root@cpig.com",
                "name": "system_admin",
                "photo": ""
            },
            "household": "i54xyZvdBg1aPQCg",
            "isInformed": false,
            "isLetter": false,
            "isReceived": false,
            "sn": "491160"
        },
        "user": {
            "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
            "email": "root@cpig.com",
            "name": "system_admin",
            "photo": ""
        }
    }
}
 *
 * @apiUse Header
 * @apiUse Error
 */

//  [PUT]       /communities/:communityId/households/:householdId/packages/:packageId/receiveCode
/**
 * @api {put} /communities/:communityId/households/:householdId/packages/:packageId/receiveCode Update receive code of package
 * @apiName PutReveiveCode
 * @apiGroup Package
 * 
 * @apiParam {String} communityId 社區 ID
 * @apiParam {String} householdId 住戶 ID
 * @apiParam {String} packageId package ID
 *
 * @apiSuccess {Boolean}  success                               API 執行成功與否
 * @apiSuccess {Object}   message                               執行結果
 * @apiSuccess {String}   message.id                            ID
 * @apiSuccess {String}   message.code                          receive code (6 位數字+大小寫字母隨機產生)
 * @apiSuccess {String}   message.createTime                    receive code 建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.expiredTime                   receive code 過期時間, 建立時間 5 分鐘後 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {Object}   message.package            package
 * @apiSuccess {String}   message.package.id            package ID
 * @apiSuccess {String}   message.package.community     package 所屬社區 ID
 * @apiSuccess {String}   message.package.createTime    package 建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.package.sn            package 序號
 * @apiSuccess {Boolean}  message.package.isInformed    是否已通知住戶
 * @apiSuccess {Boolean}  message.package.isLetter      是否為掛號信
 * @apiSuccess {Object}   message.package.createUser    package 建立人
 * @apiSuccess {String}   message.package.createUser.id     建立人 ID
 * @apiSuccess {String}   message.package.createUser.email  建立人 Email
 * @apiSuccess {String}   message.package.createUser.name   建立人暱稱
 * @apiSuccess {String}   message.package.createUser.photo  建立人大頭貼 URL
 * @apiSuccess {String}   message.package.household         package 所屬住戶 ID
 * @apiSuccess {Boolean}  message.package.isReceived          是否已被領取
 * @apiSuccess {String}   message.user 領取人
 * @apiSuccess {String}   message.user.id     領取人 ID
 * @apiSuccess {String}   message.user.email  領取人 Email
 * @apiSuccess {String}   message.user.name   領取人暱稱
 * @apiSuccess {String}   message.user.photo  領取人大頭貼 URL
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
    "success": true,
    "message": {
        "code": "QKaSzt",
        "createTime": 1497926294660,
        "expiredTime": 1497926594660,
        "package": {
            "id": "0rMs5yUIYyBlWMG8",
            "community": "hQcpuyY6H0envkI4",
            "createTime": 1497925416758,
            "createUser": {
                "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
                "email": "root@cpig.com",
                "name": "system_admin",
                "photo": ""
            },
            "household": "i54xyZvdBg1aPQCg",
            "isInformed": false,
            "isLetter": false,
            "isReceived": false,
            "sn": "491160"
        },
        "user": {
            "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
            "email": "root@cpig.com",
            "name": "system_admin",
            "photo": ""
        }
    }
}
 *
 * @apiUse Header
 * @apiUse Error
 */

//  [DELETE]    /communities/:communityId/households/:householdId/packages/:packageId/receiveCode
/**
 * @api {delete} /communities/:communityId/households/:householdId/packages/:packageId/receiveCode Delete receive code of package
 * @apiName DeleteReveiveCode
 * @apiGroup Package
 * 
 * @apiParam {String} communityId 社區 ID
 * @apiParam {String} householdId 住戶 ID
 * @apiParam {String} packageId package ID
 *
 * @apiSuccess {Boolean}  success                               API 執行成功與否
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
    "success": true
}
 *
 * @apiUse Header
 * @apiUse Error
 */
 
//  [POST]      /communities/:communityId/packageReceiveCodeVerify
/**
 * @api {post} /communities/:communityId/packageReceiveCodeVerify verify package receive code
 * @apiName VerifyReceiveCode
 * @apiGroup Package
 * 
 * @apiParam {String} communityId 社區 ID
 * 
 * @apiParam (Request Body) {String} code package receive code
 * @apiParamExample {json} Request-Example:
 *  {
 *    "code": "QKaSzt"
 *  }
 *
 * @apiSuccess {Boolean}  success               API 執行成功與否
 * @apiSuccess {Object}   message               執行結果
 * @apiSuccess {String}   message.id            package ID
 * @apiSuccess {String}   message.community     package 所屬社區 ID
 * @apiSuccess {String}   message.createTime    package 建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.sn            package 序號
 * @apiSuccess {Boolean}  message.isInformed    是否已通知住戶
 * @apiSuccess {Boolean}  message.isLetter      是否為掛號信
 * @apiSuccess {Object}   message.createUser    package 建立人
 * @apiSuccess {String}   message.createUser.id     建立人 ID
 * @apiSuccess {String}   message.createUser.email  建立人 Email
 * @apiSuccess {String}   message.createUser.name   建立人暱稱
 * @apiSuccess {String}   message.createUser.photo  建立人大頭貼 URL
 * @apiSuccess {String}   message.household         package 所屬住戶 ID
 * @apiSuccess {Boolean}  message.isReceived          是否已被領取
 * @apiSuccess {String}   message.receiveTime       領取時間
 * @apiSuccess {Object}   message.receiveUser       領取人
 * @apiSuccess {String}   message.receiveUser.id    領取人 ID
 * @apiSuccess {String}   message.receiveUser.email 領取人 Email
 * @apiSuccess {String}   message.receiveUser.name  領取人暱稱
 * @apiSuccess {String}   message.receiveUser.photo 領取人大頭貼 URL
 * 
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
    "success": true,
    "message": {
        "id": "0rMs5yUIYyBlWMG8",
        "community": "hQcpuyY6H0envkI4",
        "createTime": 1497925416758,
        "createUser": {
            "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
            "email": "root@cpig.com",
            "name": "system_admin",
            "photo": ""
        },
        "household": "i54xyZvdBg1aPQCg",
        "isInformed": false,
        "isLetter": false,
        "isReceived": true,
        "receiveTime": 1497926952366,
        "receiveUser": {
            "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
            "email": "root@cpig.com",
            "name": "system_admin",
            "photo": ""
        },
        "sn": "491160"
    }
}
 *
 * @apiUse Header
 * @apiUse Error
 */
 
 
 

