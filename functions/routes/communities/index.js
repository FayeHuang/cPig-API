const express = require('express');
const router = express.Router();

const communities = require("./communities");
const community = require("./community");
const communitySnVerify = require("./communitySnVerify")

router.use('/user/communitySn/verify', communitySnVerify);
router.use('/communities', communities);
router.use('/communities/:communityId', community);


module.exports = router;

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