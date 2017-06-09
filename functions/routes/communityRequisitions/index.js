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
 * @apiSuccess {Boolean}  success                 API 執行成功與否
 * @apiSuccess {Object[]}   message                 執行結果
 * @apiSuccess {String}   message.id  社區申請單 ID
 * @apiSuccess {String}   message.name  新社區名稱
 * @apiSuccess {String}   message.address  新社區地址
 * @apiSuccess {String}   message.createTime  申請單建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {Object}   message.owner  社區申請單建立人
 * @apiSuccess {String}   message.owner.id  建立人 ID
 * @apiSuccess {String}   message.owner.email  建立人 Email
 * @apiSuccess {String}   message.owner.name  建立人暱稱
 * @apiSuccess {String}   message.owner.photo  建立人大頭貼
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": [
    {
      "id": "Pmk8bOwR9LvZ5LdV",
      "address": "community 8 address",
      "createTime": 1496990259669,
      "name": "community 8",
      "owner": {
        "id": "6guc1Vmi9KfMJ5SgHkMs7sm6hE32",
        "email": "user1@cpig.com",
        "name": "user1",
        "photo": ""
      }
    }
  ]
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
 * @apiSuccess {String}   message.id  社區申請單 ID
 * @apiSuccess {String}   message.name  新社區名稱
 * @apiSuccess {String}   message.address  新社區地址
 * @apiSuccess {String}   message.createTime  申請單建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {Object}   message.owner  社區申請單建立人
 * @apiSuccess {String}   message.owner.id  建立人 ID
 * @apiSuccess {String}   message.owner.email  建立人 Email
 * @apiSuccess {String}   message.owner.name  建立人暱稱
 * @apiSuccess {String}   message.owner.photo  建立人大頭貼
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "id": "Pmk8bOwR9LvZ5LdV",
    "address": "community 8 address",
    "createTime": 1496990259669,
    "name": "community 8",
    "owner": {
      "id": "6guc1Vmi9KfMJ5SgHkMs7sm6hE32",
      "email": "user1@cpig.com",
      "name": "user1",
      "photo": ""
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
 * @apiSuccess {Boolean}  success                 API 執行成功與否
 * @apiSuccess {Object}   message                 執行結果
 * @apiSuccess {String}   message.id  社區申請單 ID
 * @apiSuccess {String}   message.name  新社區名稱
 * @apiSuccess {String}   message.address  新社區地址
 * @apiSuccess {String}   message.createTime  申請單建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {Object}   message.owner  社區申請單建立人
 * @apiSuccess {String}   message.owner.id  建立人 ID
 * @apiSuccess {String}   message.owner.email  建立人 Email
 * @apiSuccess {String}   message.owner.name  建立人暱稱
 * @apiSuccess {String}   message.owner.photo  建立人大頭貼
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "id": "Pmk8bOwR9LvZ5LdV",
    "address": "community 8 address",
    "createTime": 1496990259669,
    "name": "community 8",
    "owner": {
      "id": "6guc1Vmi9KfMJ5SgHkMs7sm6hE32",
      "email": "user1@cpig.com",
      "name": "user1",
      "photo": ""
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
 * @apiSuccess {Boolean}  success                 API 執行成功與否
 * @apiSuccess {Object}   message                 執行結果
 * @apiSuccess {String}   message.id  社區申請單 ID
 * @apiSuccess {String}   message.name  新社區名稱
 * @apiSuccess {String}   message.address  新社區地址
 * @apiSuccess {String}   message.createTime  申請單建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {Object}   message.owner  社區申請單建立人
 * @apiSuccess {String}   message.owner.id  建立人 ID
 * @apiSuccess {String}   message.owner.email  建立人 Email
 * @apiSuccess {String}   message.owner.name  建立人暱稱
 * @apiSuccess {String}   message.owner.photo  建立人大頭貼
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "id": "Pmk8bOwR9LvZ5LdV",
    "address": "community 1 address 123",
    "createTime": 1496990259669,
    "name": "community 8",
    "owner": {
      "id": "6guc1Vmi9KfMJ5SgHkMs7sm6hE32",
      "email": "user1@cpig.com",
      "name": "user1",
      "photo": ""
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
 * @apiSuccess {String}   message.id 社區 ID
 * @apiSuccess {String}   message.name 社區名稱
 * @apiSuccess {String}   message.address 社區地址
 * @apiSuccess {String}   message.createTime 社區建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.sn 社區序號
 * @apiSuccess {String}   message.photo 社區圖片 URL
 * @apiSuccess {Object}   message.createUser  社區建立人
 * @apiSuccess {String}   message.createUser.id  建立人 ID
 * @apiSuccess {String}   message.createUser.email  建立人 Email
 * @apiSuccess {String}   message.createUser.name  建立人暱稱
 * @apiSuccess {String}   message.createUser.photo  建立人大頭貼 URL
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "id": "tV6SDD4FCJm1O9DL",
    "address": "community 8 address",
    "createTime": 1496990711878,
    "createUser": {
      "id": "6guc1Vmi9KfMJ5SgHkMs7sm6hE32",
      "email": "user1@cpig.com",
      "name": "user1",
      "photo": ""
    },
    "name": "community 8",
    "photo": "",
    "sn": "543208"
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */