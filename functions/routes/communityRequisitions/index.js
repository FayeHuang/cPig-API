const express = require('express');
const router = express.Router();

const communityRequisitions = require("./communityRequisitions");
const communityRequisition = require("./communityRequisition");
const verifyCommunityRequisition = require("./verifyCommunityRequisition");

router.use('/user/communityRequisitions', communityRequisitions);
router.use('/user/communityRequisitions/:communityReqId', communityRequisition);
router.use('/user/communityRequisitions/:communityReqId/verify', verifyCommunityRequisition);

module.exports = router;

//  [GET]     /user/communityRequisitions
/**
 * @api {get} /user/communityRequisitions Read data of community requisitions
 * @apiName GetCommunityRequisitions
 * @apiGroup CommunityRequisitions
 *
 * @apiParam (Query string) {Boolean} [all] if true, 取得所有社區申請單. if false, 取得使用者的社區申請單.
 *
 * @apiSuccess {Boolean}  success         API 執行成功與否
 * @apiSuccess {Object}   message      執行結果
 * @apiSuccess {String}   message.communityReqId  社區申請單 ID
 * @apiSuccess {String}   message.communityReqId.address  新社區位址
 * @apiSuccess {String}   message.communityReqId.createUser  社區申請單建立人
 * @apiSuccess {String}   message.communityReqId.name 新社區名稱
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "lImUvcw0KQnGn3ZH": {
      "address": "community 624 address",
      "createUser": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
      "name": "community 624"
    }
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */

//  [POST]    /user/communityRequisitions
 /**
 * @api {post} /user/communityRequisitions Create a new community requisition
 * @apiName PostCommunityRequisitions
 * @apiGroup CommunityRequisitions
 *
 * @apiParam (Request body) {String} name    新社區名稱
 * @apiParam (Request body) {String} address 新社區地址
 * @apiParamExample {json} Request-Example:
 *  {
 *    "name": "community 624",
 *    "address": "community 624 address"
 *  }
 *
 * @apiSuccess {Boolean}  success                 API 執行成功與否
 * @apiSuccess {Object}   message                 執行結果
 * @apiSuccess {Object}   message.communityReqId  社區申請單 ID
 * @apiSuccess {String}   message.communityReqId.address  新社區地址
 * @apiSuccess {String}   message.communityReqId.createUser  社區申請單建立人
 * @apiSuccess {String}   message.communityReqId.name  新社區名稱
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "lImUvcw0KQnGn3ZH": {
      "address": "community 624 address",
      "createUser": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
      "name": "community 624"
    }
  }
}
 * 
 * @apiUse Header
 * @apiUse Error
 */

//  [GET]     /user/communityRequisitions/:communityReqId
/**
 * @api {get} /user/communityRequisitions/:communityReqId Read data of the community requisition
 * @apiName GetCommunityRequisition
 * @apiGroup CommunityRequisitions
 *
 * @apiParam {String} communityReqId 社區申請單 ID
 * 
 * @apiSuccess {Boolean}  success                           API 執行成功與否
 * @apiSuccess {Object}   message                           執行結果
 * @apiSuccess {String}   message.communityReqId            社區申請單 ID
 * @apiSuccess {String}   message.communityReqId.address    新社區位址
 * @apiSuccess {String}   message.communityReqId.createUser 社區申請單建立人
 * @apiSuccess {String}   message.communityReqId.name       新社區名稱
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "lImUvcw0KQnGn3ZH": {
      "address": "community 624 address",
      "createUser": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
      "name": "community 624"
    }
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */
 
//  [PUT]     /user/communityRequisitions/:communityReqId
/**
 * @api {put} /user/communityRequisitions/:communityReqId Modify data of the community requisition
 * @apiName PutCommunityRequisition
 * @apiGroup CommunityRequisitions
 *
 * @apiParam {String} communityReqId 社區申請單 ID
 * 
 * @apiParam (Request body) {String} [name]    修改的新社區名稱
 * @apiParam (Request body) {String} [address] 修改的新社區地址
 * @apiParamExample {json} Request-Example:
{
  "address": "community 1 address 123"
}
 * 
 * @apiSuccess {Boolean}  success                           API 執行成功與否
 * @apiSuccess {Object}   message                           執行結果
 * @apiSuccess {String}   message.communityReqId            社區申請單 ID
 * @apiSuccess {String}   message.communityReqId.address    修改後的新社區位址
 * @apiSuccess {String}   message.communityReqId.createUser 社區申請單建立人
 * @apiSuccess {String}   message.communityReqId.name       修改後的新社區名稱
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "pbNM7iAWdh1iBTRx": {
      "address": "community 1 address 123",
      "createUser": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
      "name": "community 1"
    }
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */

//  [DELETE]  /user/communityRequisitions/:communityReqId
/**
 * @api {delete} /user/communityRequisitions/:communityReqId Delete the community requisition
 * @apiName DeleteCommunityRequisition
 * @apiGroup CommunityRequisitions
 * 
 * @apiParam {String} communityReqId 社區申請單 ID
 * 
 * @apiSuccess {Boolean}  success                           API 執行成功與否
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "success": true
 *  }
 *
 * @apiUse Header
 * @apiUse Error
 */
 
//  [POST]    /user/communityRequisitions/:communityReqId/verify
/**
 * @api {post} /user/communityRequisitions/:communityReqId/verify Verify the community requisition
 * @apiName PostCommunityRequisitionVerify
 * @apiGroup CommunityRequisitions
 *
 * @apiParam {String} communityReqId 社區申請單 ID
 * 
 * @apiSuccess {Boolean}  success             API 執行成功與否
 * @apiSuccess {Object}   message             執行結果
 * @apiSuccess {String}   message.communityId 社區 ID
 * @apiSuccess {String}   message.communityId.name 社區名稱
 * @apiSuccess {String}   message.communityId.address 社區地址
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "0gFNpjr7SflMxw7Y": {
      "address": "community 624 address",
      "name": "community 624"
    }
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */