const express = require('express');
const router = express.Router();

const householdRequisitions = require("./householdRequisitions");
const householdRequisition = require("./householdRequisition");
const verifyHouseholdRequisition = require("./verifyHouseholdRequisition");
const userHouseholdRequisitions = require("./userHouseholdRequisitions");
const userHouseholdRequisition = require("./userHouseholdRequisition");

router.use('/user/householdRequisitions', userHouseholdRequisitions);
router.use('/user/householdRequisitions/:householdReqId', userHouseholdRequisition);

router.use('/communities/:communityId/householdRequisitions', householdRequisitions);
router.use('/communities/:communityId/householdRequisitions/:householdReqId', householdRequisition);
router.use('/communities/:communityId/householdRequisitions/:householdReqId/verify', verifyHouseholdRequisition);

module.exports = router;


//  [GET]     /user/householdRequisitions
/**
 * @api {get} /user/householdRequisitions Read data of user household requisitions
 * @apiName GetHouseholdRequisitions
 * @apiGroup HouseholdRequisitions
 *
 * @apiParam (Query string) {Boolean} [all] if true, 取得所有住戶申請單. if false, 取得使用者的住戶申請單.
 *
 * @apiSuccess {Boolean}  success                           API 執行成功與否
 * @apiSuccess {Object[]}   message                           執行結果
 * @apiSuccess {String}   message.id          住戶申請單 ID
 * @apiSuccess {String}   message.floor       新住戶樓層
 * @apiSuccess {String}   message.number      新住戶門牌號碼
 * @apiSuccess {String}   message.createTime  申請單建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {Object}   message.community  社區
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
 * @apiSuccess {Object}   message.owner 住戶申請單建立人
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
      "id": "IoeQIVJyiPKfziGF",
      "community": {
        "id": "WIOmgnw9Og37fk73",
        "address": "community 712 address",
        "createTime": 1496991275991,
        "createUser": {
          "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
          "email": "root@cpig.com",
          "name": "system_admin",
          "photo": ""
        },
        "name": "community 712",
        "photo": "",
        "sn": "016993"
      },
      "createTime": 1496992255232,
      "floor": "674",
      "number": "674",
      "owner": {
        "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
        "email": "root@cpig.com",
        "name": "system_admin",
        "photo": ""
      }
    }
  ]
}
 *
 * @apiUse Header
 * @apiUse Error
 */
 
//  [GET]     /user/householdRequisitions/:householdReqId
/**
 * @api {get} /user/householdRequisitions/:householdReqId Read data of the household requisition
 * @apiName GetHouseholdRequisition
 * @apiGroup HouseholdRequisitions
 *
 * @apiParam {String} householdReqId 住戶申請單 ID
 * 
 * @apiSuccess {Boolean}  success                           API 執行成功與否
 * @apiSuccess {Object}   message                           執行結果
 * @apiSuccess {String}   message.id          住戶申請單 ID
 * @apiSuccess {String}   message.floor       新住戶樓層
 * @apiSuccess {String}   message.number      新住戶門牌號碼
 * @apiSuccess {String}   message.createTime  申請單建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {Object}   message.community  社區
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
 * @apiSuccess {Object}   message.owner 住戶申請單建立人
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
    "id": "IoeQIVJyiPKfziGF",
    "community": {
      "id": "WIOmgnw9Og37fk73",
      "address": "community 712 address",
      "createTime": 1496991275991,
      "createUser": {
        "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
        "email": "root@cpig.com",
        "name": "system_admin",
        "photo": ""
      },
      "name": "community 712",
      "photo": "",
      "sn": "016993"
    },
    "createTime": 1496992255232,
    "floor": "674",
    "number": "674",
    "owner": {
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

//  [DELETE]  /user/householdRequisitions/:householdReqId
/**
 * @api {delete} /user/householdRequisitions/:householdReqId Delete the household requisition
 * @apiName DeleteHouseholdRequisition
 * @apiGroup HouseholdRequisitions
 *
 * @apiParam {String} householdReqId 住戶申請單 ID
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

//  [GET]     /communities/:communityId/householdRequisitions
/**
 * @api {get} /communities/:communityId/householdRequisitions Read data of household requisitions in the community
 * @apiName GetHouseholdRequisitionsInCommunity
 * @apiGroup HouseholdRequisitions
 *
 * @apiParam {String} communityId 社區 ID
 * 
 * @apiParam (Query string) {Boolean} [all] if true, 取得所有住戶申請單. if false, 取得使用者的住戶申請單.
 *
 * @apiSuccess {Boolean}  success                           API 執行成功與否
 * @apiSuccess {Object[]}   message                           執行結果
 * @apiSuccess {String}   message.id          住戶申請單 ID
 * @apiSuccess {String}   message.floor       新住戶樓層
 * @apiSuccess {String}   message.number      新住戶門牌號碼
 * @apiSuccess {String}   message.createTime  申請單建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.community  社區 ID
 * @apiSuccess {Object}   message.owner 住戶申請單建立人
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
      "id": "IoeQIVJyiPKfziGF",
      "community": "WIOmgnw9Og37fk73",
      "createTime": 1496992255232,
      "floor": "674",
      "number": "674",
      "owner": {
        "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
        "email": "root@cpig.com",
        "name": "system_admin",
        "photo": ""
      }
    }
  ]
}
 *
 * @apiUse Header
 * @apiUse Error
 */

//  [POST]    /communities/:communityId/householdRequisitions
/**
 * @api {post} /communities/:communityId/householdRequisitions Create a new household requisition in the community
 * @apiName PostHouseholdRequisitions
 * @apiGroup HouseholdRequisitions
 *
 * @apiParam (Request body) {String} communityId 社區 ID
 * 
 * @apiParam (Request body) {Number} number      新住戶門牌號碼
 * @apiParam (Request body) {String} floor       新住戶樓層
 * 
 * @apiParamExample {json} Request-Example:
{
  "number": 66,
  "floor": "12"
}
 *
 * @apiSuccess {Boolean}  success                           API 執行成功與否
 * @apiSuccess {Object}   message                           執行結果
 * @apiSuccess {String}   message.id          住戶申請單 ID
 * @apiSuccess {String}   message.floor       新住戶樓層
 * @apiSuccess {String}   message.number      新住戶門牌號碼
 * @apiSuccess {String}   message.createTime  申請單建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.community  社區 ID
 * @apiSuccess {Object}   message.owner 住戶申請單建立人
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
    "id": "IoeQIVJyiPKfziGF",
    "community": "WIOmgnw9Og37fk73",
    "createTime": 1496992255232,
    "floor": "674",
    "number": "674",
    "owner": {
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

//  [GET]     /communities/:communityId/householdRequisitions/:householdReqId
/**
 * @api {get} /communities/:communityId/householdRequisitions/:householdReqId Read data of the household requisition in the community
 * @apiName GetHouseholdRequisitionInCommunity
 * @apiGroup HouseholdRequisitions
 *
 * @apiParam {String} communityId 社區 ID
 * @apiParam {String} householdReqId 住戶申請單 ID
 * 
 * @apiSuccess {Boolean}  success                           API 執行成功與否
 * @apiSuccess {Object}   message                           執行結果
 * @apiSuccess {String}   message.id          住戶申請單 ID
 * @apiSuccess {String}   message.floor       新住戶樓層
 * @apiSuccess {String}   message.number      新住戶門牌號碼
 * @apiSuccess {String}   message.createTime  申請單建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.community  社區 ID
 * @apiSuccess {Object}   message.owner 住戶申請單建立人
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
    "id": "IoeQIVJyiPKfziGF",
    "community": "WIOmgnw9Og37fk73",
    "createTime": 1496992255232,
    "floor": "674",
    "number": "674",
    "owner": {
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

//  [DELETE]  /communities/:communityId/householdRequisitions/:householdReqId
/**
 * @api {delete} /communities/:communityId/householdRequisitions/:householdReqId Delete the household requisition in the community
 * @apiName DeleteHouseholdRequisitionInCommunity
 * @apiGroup HouseholdRequisitions
 *
 * @apiParam {String} communityId 社區 ID
 * @apiParam {String} householdReqId 住戶申請單 ID
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

//  [POST]    /communities/:communityId/householdRequisitions/:householdReqId/verify
/**
 * @api {post} /communities/:communityId/householdRequisitions/:householdReqId/verify Verify the household requisition in the community
 * @apiName PostHouseholdRequisitionVerify
 * @apiGroup HouseholdRequisitions
 *
 * @apiParam {String} communityId 社區 ID
 * @apiParam {String} householdReqId 住戶申請單 ID
 * 
 * @apiSuccess {Boolean}  success                     API 執行成功與否
 * @apiSuccess {Object}   message                     執行結果
 * @apiSuccess {String}   message.id         住戶 ID
 * @apiSuccess {String}   message.floor   住戶樓層
 * @apiSuccess {String}   message.number  住戶門牌號碼
 * @apiSuccess {String}   message.createTime  住戶建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {Object}   message.createUser 住戶建立人
 * @apiSuccess {String}   message.createUser.id  建立人 ID
 * @apiSuccess {String}   message.createUser.email  建立人 Email
 * @apiSuccess {String}   message.createUser.name  建立人暱稱
 * @apiSuccess {String}   message.createUser.photo  建立人大頭貼
 *
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "id": "CEy3MLm11pnHq83G",
    "createTime": 1496993877818,
    "createUser": {
      "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
      "email": "root@cpig.com",
      "name": "system_admin",
      "photo": ""
    },
    "floor": "674",
    "number": "674"
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */