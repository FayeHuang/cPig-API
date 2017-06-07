const express = require('express');
const router = express.Router();

const communities = require("./communities");
const community = require("./community");
const communitySnVerify = require("./communitySnVerify");
const communitiesDetail = require("./communitiesDetail");
const communityDetail = require("./communityDetail");

router.use('/user/communities', communitiesDetail);
router.use('/user/communities/:communityId', communityDetail);
router.use('/user/communitySn/verify', communitySnVerify);
router.use('/communities', communities);
router.use('/communities/:communityId', community);


module.exports = router;

//  [GET]     /user/communities
/**
 * @api {get} /user/communities Read detail data of communities
 * @apiName GetOwnCommunitiesDetail
 * @apiGroup Communities
 *
 * @apiSuccess {Boolean}  success                     API 執行成功與否
 * @apiSuccess {Object}   message                     執行結果
 * @apiSuccess {Object}   message.communityId         社區 ID
 * @apiSuccess {String}   message.communityId.address 社區位址
 * @apiSuccess {String}   message.communityId.name    社區名稱
 * @apiSuccess {Object}   message.communityId.roles   所屬角色
 * @apiSuccess {String}   message.communityId.roles.role 角色名稱 (ex: COMMUNITY_ADMIN)
 * @apiSuccess {Object}   message.communityId.households  住戶資料
 * @apiSuccess {Object}   message.communityId.households.householdId  住戶 ID
 * @apiSuccess {String}   message.communityId.households.householdId.floor  住戶樓層
 * @apiSuccess {String}   message.communityId.households.householdId.number 住戶門牌號碼
 * @apiSuccess {Object}   message.communityId.households.householdId.roles  所屬角色
 * @apiSuccess {Object}   message.communityId.households.householdId.roles.role 角色名稱 (ex: RESIDENT_ADMIN)
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "VrlwXx2V6retICfR": {
      "households": {
        "YZyIzcg5A9xINOaC": {
          "floor": "37",
          "number": "37",
          "roles": {
            "RESIDENT_ADMIN": true
          }
        }
      },
      "address": "community 187 address",
      "name": "community 187",
      "roles": {
        "RESIDENT_ADMIN": true
      }
    }
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */
 
//  [GET]     /user/communities/:communityId
/**
 * @api {get} /user/communities Read detail data of the community
 * @apiName GetOwnCommunityDetail
 * @apiGroup Communities
 * 
 * @apiParam {String} communityId 社區 ID
 *
 * @apiSuccess {Boolean}  success                     API 執行成功與否
 * @apiSuccess {Object}   message                     執行結果
 * @apiSuccess {Object}   message.communityId         社區 ID
 * @apiSuccess {String}   message.communityId.address 社區位址
 * @apiSuccess {String}   message.communityId.name    社區名稱
 * @apiSuccess {Object}   message.communityId.roles   所屬角色
 * @apiSuccess {String}   message.communityId.roles.role 角色名稱 (ex: COMMUNITY_ADMIN)
 * @apiSuccess {Object}   message.communityId.households  住戶資料
 * @apiSuccess {Object}   message.communityId.households.householdId  住戶 ID
 * @apiSuccess {String}   message.communityId.households.householdId.floor  住戶樓層
 * @apiSuccess {String}   message.communityId.households.householdId.number 住戶門牌號碼
 * @apiSuccess {Object}   message.communityId.households.householdId.roles  所屬角色
 * @apiSuccess {Object}   message.communityId.households.householdId.roles.role 角色名稱 (ex: RESIDENT_ADMIN)
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "VrlwXx2V6retICfR": {
      "households": {
        "YZyIzcg5A9xINOaC": {
          "floor": "37",
          "number": "37",
          "roles": {
            "RESIDENT_ADMIN": true
          }
        }
      },
      "address": "community 187 address",
      "name": "community 187",
      "roles": {
        "RESIDENT_ADMIN": true
      }
    }
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */

//  [GET]     /communities
/**
 * @api {get} /communities Read data of communities
 * @apiName GetCommunities
 * @apiGroup Communities
 *
 * @apiParam (Query string) {Boolean} [all] if true, 取得所有社區資料. if false, 取得使用者的社區資料.
 *
 * @apiSuccess {Boolean}  success                     API 執行成功與否
 * @apiSuccess {Object}   message                     執行結果
 * @apiSuccess {Object}   message.communityId         社區 ID
 * @apiSuccess {String}   message.communityId.address 社區位址
 * @apiSuccess {String}   message.communityId.name    社區名稱
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "xamb5q0rwGaWxM3j": {
      "address": "community 1 address",
      "name": "community 1"
    }
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */

//  [GET]     /communities/:communityId
/**
 * @api {get} /communities/:communityId Read data of the community
 * @apiName GetCommunity
 * @apiGroup Communities
 *
 * @apiParam {String} communityId 社區 ID
 *
 * @apiSuccess {Boolean}  success                     API 執行成功與否
 * @apiSuccess {Object}   message                     執行結果
 * @apiSuccess {Object}   message.communityId         社區 ID
 * @apiSuccess {String}   message.communityId.address 社區位址
 * @apiSuccess {String}   message.communityId.name    社區名稱
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "xamb5q0rwGaWxM3j": {
      "address": "community 1 address",
      "name": "community 1"
    }
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */

//  [PUT]     /communities/:communityId
/**
 * @api {put} /communities/:communityId Modify data of the community
 * @apiName ModifyCommunity
 * @apiGroup Communities
 *
 * @apiParam {String} communityId 社區 ID
 * @apiParam (Request body) {String} [name]    社區名稱
 * @apiParam (Request body) {String} [address] 社區位址
 * 
 * @apiParamExample {json} Request-Example:
{
  "name": "community 123"
}
 *
 * @apiSuccess {Boolean}  success                     API 執行成功與否
 * @apiSuccess {Object}   message                     執行結果
 * @apiSuccess {Object}   message.communityId         社區 ID
 * @apiSuccess {String}   message.communityId.address 社區位址
 * @apiSuccess {String}   message.communityId.name    社區名稱
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "xamb5q0rwGaWxM3j": {
      "address": "community 1 address",
      "name": "community 123"
    }
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */

//  [DELETE]  /communities/:communityId
/**
 * @api {delete} /communities/:communityId Delete the community
 * @apiName DeleteCommunity
 * @apiGroup Communities
 *
 * @apiParam {String} communityId 社區 ID
 * 
 * @apiSuccess {Boolean}  success                     API 執行成功與否
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

//  [GET]     /communities/:communityId/sn
/**
 * @api {get} /communities/:communityId/sn Get serial number of the community
 * @apiName GetCommunitySN
 * @apiGroup Communities
 *
 * @apiParam {String} communityId 社區 ID
 *
 * @apiSuccess {Boolean}  success                 API 執行成功與否
 * @apiSuccess {Object}   message                 執行結果
 * @apiSuccess {Object}   message.communityId     社區 ID
 * @apiSuccess {String}   message.communityId.sn  社區 serial number
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "xamb5q0rwGaWxM3j": {
      "sn": "610598"
    }
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */

//  [POST]    /user/communitySn/verify
/**
 * @api {post} /user/communitySn/verify Verify serial number of the community
 * @apiName VerifyCommunitySN
 * @apiGroup Communities
 *
 * @apiParam (Request body) {String} sn 社區 serial number
 * @apiParamExample {json} Request-Example:
{
  "sn": "123456"
}
 *
 * @apiSuccess {Boolean}  success                     API 執行成功與否
 * @apiSuccess {Object}   message                     執行結果
 * @apiSuccess {Object}   message.communityId         社區 ID
 * @apiSuccess {String}   message.communityId.address 社區位址
 * @apiSuccess {String}   message.communityId.name    社區名稱
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "cgUHfXU3dbmDOmfI": {
      "address": "EEE address",
      "name": "DDD"
    }
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */