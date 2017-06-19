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

//  [POST]      /user/inviteCode/verify
/**
 * @api {post} /user/inviteCode/verify Verify invite code
 * @apiName VerifyInviteCode
 * @apiGroup InviteCode
 *
 * @apiParam (Request body) {String} code invite code 
 * @apiParamExample {json} Request-Example:
{
  "code": "ppLCPS"
}
 * 
 * @apiSuccess {Boolean}  success API 執行成功與否
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

//  [GET]       /communities/:communityId/role/:role/inviteCode
/**
 * @api {get} /communities/:communityId/role/:role/inviteCode Get invite code of specific role in community
 * @apiName GetInviteCodeInCommunity
 * @apiGroup InviteCode
 * 
 * @apiParam {String} communityId 社區 ID
 * @apiParam {String} role 角色 (ex: COMMUNITY_ADMIN)
 *
 * @apiSuccess {Boolean}  success                               API 執行成功與否
 * @apiSuccess {Object}   message                               執行結果
 * @apiSuccess {Object}   message.id                            ID
 * @apiSuccess {String}   message.code                          invite code (6 位數字+大小寫字母隨機產生)
 * @apiSuccess {String}   message.role                          邀請加入的角色. ex:COMMUNITY_ADMIN
 * @apiSuccess {Object}   message.createTime                    invite code 建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.expiredTime                   invite code 過期時間, 建立時間 10 分鐘後 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {Object}   message.community                     邀請加入的社區資料
 * @apiSuccess {String}   message.community.id 社區 ID
 * @apiSuccess {String}   message.community.name 社區名稱
 * @apiSuccess {String}   message.community.address 社區地址
 * @apiSuccess {String}   message.community.createTime 社區建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.community.sn 社區序號
 * @apiSuccess {String}   message.community.photo 社區圖片 URL
 * @apiSuccess {Object}   message.community.createUser  社區建立人
 * @apiSuccess {String}   message.community.createUser.id  建立人 ID
 * @apiSuccess {String}   message.community.createUser.email  建立人 Email
 * @apiSuccess {String}   message.community.createUser.name  建立人暱稱
 * @apiSuccess {String}   message.community.createUser.photo  建立人大頭貼 URL
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "id": "GUARDHOeBzcVmwyPTL3Kdl6abfQwIbx82hQcpuyY6H0envkI4",
    "code": "HLvomd",
    "community": {
      "id": "hQcpuyY6H0envkI4",
      "address": "松勤路",
      "createTime": 1497020996855,
      "createUser": {
        "id": "WSvJfECtRMcSTg5E4bovG1bMJiy2",
        "email": "yongling225@gmail.com",
        "name": "John",
        "photo": ""
      },
      "name": "宜誠天匯",
      "photo": "",
      "sn": "009490"
    },
    "createTime": 1497099071147,
    "expiredTime": 1497099671147,
    "role": "GUARD"
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */

//  [POST]      /communities/:communityId/role/:role/inviteCode
/**
 * @api {post} /communities/:communityId/role/:role/inviteCode Generate invite code of specific role in community
 * @apiName PostInviteCodeInCommunity
 * @apiGroup InviteCode
 * 
 * @apiParam {String} communityId 社區 ID
 * @apiParam {String} role 角色 (ex: COMMUNITY_ADMIN)
 *
 * @apiSuccess {Boolean}  success                               API 執行成功與否
 * @apiSuccess {Object}   message                               執行結果
 * @apiSuccess {Object}   message.id                            ID
 * @apiSuccess {String}   message.code                          invite code (6 位數字+大小寫字母隨機產生)
 * @apiSuccess {String}   message.role                          邀請加入的角色. ex:COMMUNITY_ADMIN
 * @apiSuccess {Object}   message.createTime                    invite code 建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.expiredTime                   invite code 過期時間, 建立時間 10 分鐘後 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {Object}   message.community                     邀請加入的社區資料
 * @apiSuccess {String}   message.community.id 社區 ID
 * @apiSuccess {String}   message.community.name 社區名稱
 * @apiSuccess {String}   message.community.address 社區地址
 * @apiSuccess {String}   message.community.createTime 社區建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.community.sn 社區序號
 * @apiSuccess {String}   message.community.photo 社區圖片 URL
 * @apiSuccess {Object}   message.community.createUser  社區建立人
 * @apiSuccess {String}   message.community.createUser.id  建立人 ID
 * @apiSuccess {String}   message.community.createUser.email  建立人 Email
 * @apiSuccess {String}   message.community.createUser.name  建立人暱稱
 * @apiSuccess {String}   message.community.createUser.photo  建立人大頭貼 URL
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "id": "GUARDHOeBzcVmwyPTL3Kdl6abfQwIbx82hQcpuyY6H0envkI4",
    "code": "HLvomd",
    "community": {
      "id": "hQcpuyY6H0envkI4",
      "address": "松勤路",
      "createTime": 1497020996855,
      "createUser": {
        "id": "WSvJfECtRMcSTg5E4bovG1bMJiy2",
        "email": "yongling225@gmail.com",
        "name": "John",
        "photo": ""
      },
      "name": "宜誠天匯",
      "photo": "",
      "sn": "009490"
    },
    "createTime": 1497099071147,
    "expiredTime": 1497099671147,
    "role": "GUARD"
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */

//  [PUT]       /communities/:communityId/role/:role/inviteCode
/**
 * @api {put} /communities/:communityId/role/:role/inviteCode Re-generate invite code of specific role in community
 * @apiName PutInviteCodeInCommunity
 * @apiGroup InviteCode
 * 
 * @apiParam {String} communityId 社區 ID
 * @apiParam {String} role 角色 (ex: COMMUNITY_ADMIN)
 *
 * @apiSuccess {Boolean}  success                               API 執行成功與否
 * @apiSuccess {Object}   message                               執行結果
 * @apiSuccess {Object}   message.id                            ID
 * @apiSuccess {String}   message.code                          invite code (6 位數字+大小寫字母隨機產生)
 * @apiSuccess {String}   message.role                          邀請加入的角色. ex:COMMUNITY_ADMIN
 * @apiSuccess {Object}   message.createTime                    invite code 建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.expiredTime                   invite code 過期時間, 建立時間 10 分鐘後 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {Object}   message.community                     邀請加入的社區資料
 * @apiSuccess {String}   message.community.id 社區 ID
 * @apiSuccess {String}   message.community.name 社區名稱
 * @apiSuccess {String}   message.community.address 社區地址
 * @apiSuccess {String}   message.community.createTime 社區建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.community.sn 社區序號
 * @apiSuccess {String}   message.community.photo 社區圖片 URL
 * @apiSuccess {Object}   message.community.createUser  社區建立人
 * @apiSuccess {String}   message.community.createUser.id  建立人 ID
 * @apiSuccess {String}   message.community.createUser.email  建立人 Email
 * @apiSuccess {String}   message.community.createUser.name  建立人暱稱
 * @apiSuccess {String}   message.community.createUser.photo  建立人大頭貼 URL
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "id": "GUARDHOeBzcVmwyPTL3Kdl6abfQwIbx82hQcpuyY6H0envkI4",
    "code": "HLvomd",
    "community": {
      "id": "hQcpuyY6H0envkI4",
      "address": "松勤路",
      "createTime": 1497020996855,
      "createUser": {
        "id": "WSvJfECtRMcSTg5E4bovG1bMJiy2",
        "email": "yongling225@gmail.com",
        "name": "John",
        "photo": ""
      },
      "name": "宜誠天匯",
      "photo": "",
      "sn": "009490"
    },
    "createTime": 1497099071147,
    "expiredTime": 1497099671147,
    "role": "GUARD"
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */

//  [DELETE]    /communities/:communityId/role/:role/inviteCode
/**
 * @api {delete} /communities/:communityId/role/:role/inviteCode Delete invite code of specific role in community
 * @apiName DeleteInviteCodeInCommunity
 * @apiGroup InviteCode
 * 
 * @apiParam {String} communityId 社區 ID
 * @apiParam {String} role 角色 (ex: COMMUNITY_ADMIN)
 *
 * @apiSuccess {Boolean}  success API 執行成功與否
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

//  [GET]       /communities/:communityId/households/:householdId/role/:role/inviteCode
/**
 * @api {get} /communities/:communityId/households/:householdId/role/:role/inviteCode Get invite code of specific role in household
 * @apiName GetInviteCodeInHousehold
 * @apiGroup InviteCode
 * 
 * @apiParam {String} communityId 社區 ID
 * @apiParam {String} householdId 住戶 ID
 * @apiParam {String} role 角色 (ex: RESIDENT)
 *
 * @apiSuccess {Boolean}  success                               API 執行成功與否
 * @apiSuccess {Object}   message                               執行結果
 * @apiSuccess {String}   message.code                          invite code (6 位數字+大小寫字母隨機產生)
 * @apiSuccess {String}   message.role                          邀請加入的角色. ex:COMMUNITY_ADMIN
 * @apiSuccess {Object}   message.createTime                    invite code 建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.expiredTime                   invite code 過期時間, 建立時間 10 分鐘後 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {Object}   message.community                     邀請加入的社區資料
 * @apiSuccess {String}   message.community.id 社區 ID
 * @apiSuccess {String}   message.community.name 社區名稱
 * @apiSuccess {String}   message.community.address 社區地址
 * @apiSuccess {String}   message.community.createTime 社區建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.community.sn 社區序號
 * @apiSuccess {String}   message.community.photo 社區圖片 URL
 * @apiSuccess {Object}   message.community.createUser  社區建立人
 * @apiSuccess {String}   message.community.createUser.id  建立人 ID
 * @apiSuccess {String}   message.community.createUser.email  建立人 Email
 * @apiSuccess {String}   message.community.createUser.name  建立人暱稱
 * @apiSuccess {String}   message.community.createUser.photo  建立人大頭貼 URL
 * @apiSuccess {Object}   message.householder               邀請加入的住戶資料
 * @apiSuccess {String}   message.householder.id        住戶 ID
 * @apiSuccess {String}   message.householder.floor   住戶樓層
 * @apiSuccess {String}   message.householder.number  住戶門牌號碼
 * @apiSuccess {String}   message.householder.createTime  住戶建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {Object}   message.householder.createUser 住戶建立人
 * @apiSuccess {String}   message.householder.createUser.id  建立人 ID
 * @apiSuccess {String}   message.householder.createUser.email  建立人 Email
 * @apiSuccess {String}   message.householder.createUser.name  建立人暱稱
 * @apiSuccess {String}   message.householder.createUser.photo  建立人大頭貼
 * 
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "id": "RESIDENTHOeBzcVmwyPTL3Kdl6abfQwIbx82i54xyZvdBg1aPQCg",
    "code": "3O0CIR",
    "community": {
      "id": "hQcpuyY6H0envkI4",
      "address": "松勤路",
      "createTime": 1497020996855,
      "createUser": {
        "id": "WSvJfECtRMcSTg5E4bovG1bMJiy2",
        "email": "yongling225@gmail.com",
        "name": "John",
        "photo": ""
      },
      "name": "宜誠天匯",
      "photo": "",
      "sn": "009490"
    },
    "createTime": 1497099568814,
    "expiredTime": 1497100168814,
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
    "role": "RESIDENT"
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */

//  [POST]      /communities/:communityId/households/:householdId/role/:role/inviteCode
/**
 * @api {post} /communities/:communityId/households/:householdId/role/:role/inviteCode Generate invite code of specific role in household
 * @apiName PostInviteCodeInHousehold
 * @apiGroup InviteCode
 * 
 * @apiParam {String} communityId 社區 ID
 * @apiParam {String} householdId 住戶 ID
 * @apiParam {String} role 角色 (ex: RESIDENT)
 *
 * @apiSuccess {Boolean}  success                               API 執行成功與否
 * @apiSuccess {Object}   message                               執行結果
 * @apiSuccess {String}   message.code                          invite code (6 位數字+大小寫字母隨機產生)
 * @apiSuccess {String}   message.role                          邀請加入的角色. ex:COMMUNITY_ADMIN
 * @apiSuccess {Object}   message.createTime                    invite code 建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.expiredTime                   invite code 過期時間, 建立時間 10 分鐘後 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {Object}   message.community                     邀請加入的社區資料
 * @apiSuccess {String}   message.community.id 社區 ID
 * @apiSuccess {String}   message.community.name 社區名稱
 * @apiSuccess {String}   message.community.address 社區地址
 * @apiSuccess {String}   message.community.createTime 社區建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.community.sn 社區序號
 * @apiSuccess {String}   message.community.photo 社區圖片 URL
 * @apiSuccess {Object}   message.community.createUser  社區建立人
 * @apiSuccess {String}   message.community.createUser.id  建立人 ID
 * @apiSuccess {String}   message.community.createUser.email  建立人 Email
 * @apiSuccess {String}   message.community.createUser.name  建立人暱稱
 * @apiSuccess {String}   message.community.createUser.photo  建立人大頭貼 URL
 * @apiSuccess {Object}   message.householder               邀請加入的住戶資料
 * @apiSuccess {String}   message.householder.id        住戶 ID
 * @apiSuccess {String}   message.householder.floor   住戶樓層
 * @apiSuccess {String}   message.householder.number  住戶門牌號碼
 * @apiSuccess {String}   message.householder.createTime  住戶建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {Object}   message.householder.createUser 住戶建立人
 * @apiSuccess {String}   message.householder.createUser.id  建立人 ID
 * @apiSuccess {String}   message.householder.createUser.email  建立人 Email
 * @apiSuccess {String}   message.householder.createUser.name  建立人暱稱
 * @apiSuccess {String}   message.householder.createUser.photo  建立人大頭貼
 * 
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "id": "RESIDENTHOeBzcVmwyPTL3Kdl6abfQwIbx82i54xyZvdBg1aPQCg",
    "code": "3O0CIR",
    "community": {
      "id": "hQcpuyY6H0envkI4",
      "address": "松勤路",
      "createTime": 1497020996855,
      "createUser": {
        "id": "WSvJfECtRMcSTg5E4bovG1bMJiy2",
        "email": "yongling225@gmail.com",
        "name": "John",
        "photo": ""
      },
      "name": "宜誠天匯",
      "photo": "",
      "sn": "009490"
    },
    "createTime": 1497099568814,
    "expiredTime": 1497100168814,
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
    "role": "RESIDENT"
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */

//  [PUT]       /communities/:communityId/households/:householdId/role/:role/inviteCode
/**
 * @api {put} /communities/:communityId/households/:householdId/role/:role/inviteCode Re-generate invite code of specific role in household
 * @apiName PutInviteCodeInHousehold
 * @apiGroup InviteCode
 * 
 * @apiParam {String} communityId 社區 ID
 * @apiParam {String} householdId 住戶 ID
 * @apiParam {String} role 角色 (ex: RESIDENT)
 *
 * @apiSuccess {Boolean}  success                               API 執行成功與否
 * @apiSuccess {Object}   message                               執行結果
 * @apiSuccess {String}   message.code                          invite code (6 位數字+大小寫字母隨機產生)
 * @apiSuccess {String}   message.role                          邀請加入的角色. ex:COMMUNITY_ADMIN
 * @apiSuccess {Object}   message.createTime                    invite code 建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.expiredTime                   invite code 過期時間, 建立時間 10 分鐘後 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {Object}   message.community                     邀請加入的社區資料
 * @apiSuccess {String}   message.community.id 社區 ID
 * @apiSuccess {String}   message.community.name 社區名稱
 * @apiSuccess {String}   message.community.address 社區地址
 * @apiSuccess {String}   message.community.createTime 社區建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.community.sn 社區序號
 * @apiSuccess {String}   message.community.photo 社區圖片 URL
 * @apiSuccess {Object}   message.community.createUser  社區建立人
 * @apiSuccess {String}   message.community.createUser.id  建立人 ID
 * @apiSuccess {String}   message.community.createUser.email  建立人 Email
 * @apiSuccess {String}   message.community.createUser.name  建立人暱稱
 * @apiSuccess {String}   message.community.createUser.photo  建立人大頭貼 URL
 * @apiSuccess {Object}   message.householder               邀請加入的住戶資料
 * @apiSuccess {String}   message.householder.id        住戶 ID
 * @apiSuccess {String}   message.householder.floor   住戶樓層
 * @apiSuccess {String}   message.householder.number  住戶門牌號碼
 * @apiSuccess {String}   message.householder.createTime  住戶建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {Object}   message.householder.createUser 住戶建立人
 * @apiSuccess {String}   message.householder.createUser.id  建立人 ID
 * @apiSuccess {String}   message.householder.createUser.email  建立人 Email
 * @apiSuccess {String}   message.householder.createUser.name  建立人暱稱
 * @apiSuccess {String}   message.householder.createUser.photo  建立人大頭貼
 * 
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "id": "RESIDENTHOeBzcVmwyPTL3Kdl6abfQwIbx82i54xyZvdBg1aPQCg",
    "code": "3O0CIR",
    "community": {
      "id": "hQcpuyY6H0envkI4",
      "address": "松勤路",
      "createTime": 1497020996855,
      "createUser": {
        "id": "WSvJfECtRMcSTg5E4bovG1bMJiy2",
        "email": "yongling225@gmail.com",
        "name": "John",
        "photo": ""
      },
      "name": "宜誠天匯",
      "photo": "",
      "sn": "009490"
    },
    "createTime": 1497099568814,
    "expiredTime": 1497100168814,
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
    "role": "RESIDENT"
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */

//  [DELETE]    /communities/:communityId/households/:householdId/role/:role/inviteCode
/**
 * @api {post} /communities/:communityId/households/:householdId/role/:role/inviteCode Delete invite code of specific role in household
 * @apiName DeleteInviteCodeInHousehold
 * @apiGroup InviteCode
 * 
 * @apiParam {String} communityId 社區 ID
 * @apiParam {String} householdId 住戶 ID
 * @apiParam {String} role 角色 (ex: RESIDENT)
 *
 * @apiSuccess {Boolean}  success API 執行成功與否
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