const express = require('express');
const router = express.Router();

const communityInviteCode = require("./communityInviteCode");
const householdInviteCode = require("./householdInviteCode");
const inviteCodeVerify = require("./inviteCodeVerify");

router.use('/user/inviteCode/verify', inviteCodeVerify);
router.use('/communities/:communityId/role/:role/inviteCode', communityInviteCode);
router.use('/communities/:communityId/households/:householdId/role/:role/inviteCode', householdInviteCode);

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
 * @apiSuccess {String}   message.code                          invite code (6 位數字+大小寫字母隨機產生)
 * @apiSuccess {String}   message.role                          邀請加入的角色. ex:COMMUNITY_ADMIN
 * @apiSuccess {Object}   message.createTime                    invite code 建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.expiredTime                   invite code 過期時間, 建立時間 10 分鐘後 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {Object}   message.community                     邀請加入的社區資料
 * @apiSuccess {Object}   message.community.communityId         社區 ID 
 * @apiSuccess {String}   message.community.communityId.name    社區名稱
 * @apiSuccess {String}   message.community.communityId.address 社區地址
 * 
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "community": {
      "0gFNpjr7SflMxw7Y": {
        "address": "community 624 address",
        "name": "community 624"
      }
    },
    "role": "COMMUNITY_ADMIN",
    "code": "ojVSuk",
    "createTime": 1494512489270,
    "expiredTime": 1494513089270
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
 * @apiSuccess {String}   message.code                          invite code (6 位數字+大小寫字母隨機產生)
 * @apiSuccess {String}   message.role                          邀請加入的角色. ex:COMMUNITY_ADMIN
 * @apiSuccess {Object}   message.createTime                    invite code 建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.expiredTime                   invite code 過期時間, 建立時間 10 分鐘後 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {Object}   message.community                     邀請加入的社區資料
 * @apiSuccess {Object}   message.community.communityId         社區 ID 
 * @apiSuccess {String}   message.community.communityId.name    社區名稱
 * @apiSuccess {String}   message.community.communityId.address 社區地址
 * 
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "community": {
      "0gFNpjr7SflMxw7Y": {
        "address": "community 624 address",
        "name": "community 624"
      }
    },
    "role": "COMMUNITY_ADMIN",
    "code": "ojVSuk",
    "createTime": 1494512489270,
    "expiredTime": 1494513089270
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
 * @apiSuccess {String}   message.code                          invite code (6 位數字+大小寫字母隨機產生)
 * @apiSuccess {String}   message.role                          邀請加入的角色. ex:COMMUNITY_ADMIN
 * @apiSuccess {Object}   message.createTime                    invite code 建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.expiredTime                   invite code 過期時間, 建立時間 10 分鐘後 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {Object}   message.community                     邀請加入的社區資料
 * @apiSuccess {Object}   message.community.communityId         社區 ID 
 * @apiSuccess {String}   message.community.communityId.name    社區名稱
 * @apiSuccess {String}   message.community.communityId.address 社區地址
 * 
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "community": {
      "0gFNpjr7SflMxw7Y": {
        "address": "community 624 address",
        "name": "community 624"
      }
    },
    "role": "COMMUNITY_ADMIN",
    "code": "ojVSuk",
    "createTime": 1494512489270,
    "expiredTime": 1494513089270
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
 * @apiSuccess {Object}   message.community.communityId         社區 ID 
 * @apiSuccess {String}   message.community.communityId.name    社區名稱
 * @apiSuccess {String}   message.community.communityId.address 社區地址
 * @apiSuccess {Object}   message.householder                   邀請加入的住戶資料
 * @apiSuccess {Object}   message.householder.householderId         住戶 ID 
 * @apiSuccess {String}   message.householder.householderId.number  住戶門牌號碼
 * @apiSuccess {String}   message.householder.householderId.floor   住戶樓層
 * 
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "community": {
      "0gFNpjr7SflMxw7Y": {
        "address": "community 624 address",
        "name": "community 624"
      }
    },
    "role": "RESIDENT_ADMIN",
    "code": "ZxdTyQ",
    "createTime": 1494513096923,
    "expiredTime": 1494513696923,
    "household": {
      "6XimnblO5LFRSqIJ": {
        "floor": "323",
        "number": "323"
      }
    }
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
 * @apiSuccess {Object}   message.community.communityId         社區 ID 
 * @apiSuccess {String}   message.community.communityId.name    社區名稱
 * @apiSuccess {String}   message.community.communityId.address 社區地址
 * @apiSuccess {Object}   message.householder                   邀請加入的住戶資料
 * @apiSuccess {Object}   message.householder.householderId         住戶 ID 
 * @apiSuccess {String}   message.householder.householderId.number  住戶門牌號碼
 * @apiSuccess {String}   message.householder.householderId.floor   住戶樓層
 * 
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "community": {
      "0gFNpjr7SflMxw7Y": {
        "address": "community 624 address",
        "name": "community 624"
      }
    },
    "role": "RESIDENT_ADMIN",
    "code": "ZxdTyQ",
    "createTime": 1494513096923,
    "expiredTime": 1494513696923,
    "household": {
      "6XimnblO5LFRSqIJ": {
        "floor": "323",
        "number": "323"
      }
    }
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
 * @apiSuccess {Object}   message.community.communityId         社區 ID 
 * @apiSuccess {String}   message.community.communityId.name    社區名稱
 * @apiSuccess {String}   message.community.communityId.address 社區地址
 * @apiSuccess {Object}   message.householder                   邀請加入的住戶資料
 * @apiSuccess {Object}   message.householder.householderId         住戶 ID 
 * @apiSuccess {String}   message.householder.householderId.number  住戶門牌號碼
 * @apiSuccess {String}   message.householder.householderId.floor   住戶樓層
 * 
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "community": {
      "0gFNpjr7SflMxw7Y": {
        "address": "community 624 address",
        "name": "community 624"
      }
    },
    "role": "RESIDENT_ADMIN",
    "code": "ZxdTyQ",
    "createTime": 1494513096923,
    "expiredTime": 1494513696923,
    "household": {
      "6XimnblO5LFRSqIJ": {
        "floor": "323",
        "number": "323"
      }
    }
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