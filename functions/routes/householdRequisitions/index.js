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
 * @apiSuccess {Object}   message                           執行結果
 * @apiSuccess {Object}   message.householdReqId            住戶申請單 ID
 * @apiSuccess {Object}   message.householdReqId.community  社區資料
 * @apiSuccess {Object}   message.householdReqId.community.communityId         社區 ID
 * @apiSuccess {String}   message.householdReqId.community.communityId.address 社區地址
 * @apiSuccess {String}   message.householdReqId.community.communityId.name    社區名稱
 * @apiSuccess {Object}   message.householdReqId.createUser 住戶申請單建立人資料
 * @apiSuccess {Object}   message.householdReqId.createUser.userId 住戶申請單建立人 ID
 * @apiSuccess {String}   message.householdReqId.createUser.userId.email 住戶申請單建立人 Email
 * @apiSuccess {String}   message.householdReqId.createUser.userId.name 住戶申請單建立人暱稱
 * @apiSuccess {String}   message.householdReqId.createUser.userId.photo 住戶申請單建立人大頭貼
 * @apiSuccess {String}   message.householdReqId.floor      新住戶樓層
 * @apiSuccess {String}   message.householdReqId.number     新住戶門牌號碼
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "RAj6cphyrHjzIqf8": {
      "community": {
        "VrlwXx2V6retICfR": {
          "address": "community 187 address",
          "name": "community 187"
        }
      },
      "createUser": {
        "HOeBzcVmwyPTL3Kdl6abfQwIbx82": {
          "email": "root@cpig.com",
          "name": "system_admin",
          "photo": ""
        }
      },
      "floor": "666",
      "number": "666"
    }
  }
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
 * @apiSuccess {Object}   message.householdReqId            住戶申請單 ID
 * @apiSuccess {Object}   message.householdReqId.community  社區資料
 * @apiSuccess {Object}   message.householdReqId.community.communityId         社區 ID
 * @apiSuccess {String}   message.householdReqId.community.communityId.address 社區地址
 * @apiSuccess {String}   message.householdReqId.community.communityId.name    社區名稱
 * @apiSuccess {Object}   message.householdReqId.createUser 住戶申請單建立人資料
 * @apiSuccess {Object}   message.householdReqId.createUser.userId 住戶申請單建立人 ID
 * @apiSuccess {String}   message.householdReqId.createUser.userId.email 住戶申請單建立人 Email
 * @apiSuccess {String}   message.householdReqId.createUser.userId.name 住戶申請單建立人暱稱
 * @apiSuccess {String}   message.householdReqId.createUser.userId.photo 住戶申請單建立人大頭貼
 * @apiSuccess {String}   message.householdReqId.floor      新住戶樓層
 * @apiSuccess {String}   message.householdReqId.number     新住戶門牌號碼
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "RAj6cphyrHjzIqf8": {
      "community": {
        "VrlwXx2V6retICfR": {
          "address": "community 187 address",
          "name": "community 187"
        }
      },
      "createUser": {
        "HOeBzcVmwyPTL3Kdl6abfQwIbx82": {
          "email": "root@cpig.com",
          "name": "system_admin",
          "photo": ""
        }
      },
      "floor": "666",
      "number": "666"
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
 * @apiSuccess {Object}   message                           執行結果
 * @apiSuccess {Object}   message.householdReqId            住戶申請單 ID
 * @apiSuccess {Object}   message.householdReqId.community  社區資料
 * @apiSuccess {Object}   message.householdReqId.community.communityId         社區 ID
 * @apiSuccess {String}   message.householdReqId.community.communityId.address 社區地址
 * @apiSuccess {String}   message.householdReqId.community.communityId.name    社區名稱
 * @apiSuccess {Object}   message.householdReqId.createUser 住戶申請單建立人資料
 * @apiSuccess {Object}   message.householdReqId.createUser.userId 住戶申請單建立人 ID
 * @apiSuccess {String}   message.householdReqId.createUser.userId.email 住戶申請單建立人 Email
 * @apiSuccess {String}   message.householdReqId.createUser.userId.name 住戶申請單建立人暱稱
 * @apiSuccess {String}   message.householdReqId.createUser.userId.photo 住戶申請單建立人大頭貼
 * @apiSuccess {String}   message.householdReqId.floor      新住戶樓層
 * @apiSuccess {String}   message.householdReqId.number     新住戶門牌號碼
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "RAj6cphyrHjzIqf8": {
      "community": {
        "VrlwXx2V6retICfR": {
          "address": "community 187 address",
          "name": "community 187"
        }
      },
      "createUser": {
        "HOeBzcVmwyPTL3Kdl6abfQwIbx82": {
          "email": "root@cpig.com",
          "name": "system_admin",
          "photo": ""
        }
      },
      "floor": "666",
      "number": "666"
    }
  }
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
 * @apiSuccess {Object}   message.householdReqId            住戶申請單 ID
 * @apiSuccess {String}   message.householdReqId.community  社區 ID
 * @apiSuccess {String}   message.householdReqId.createUser 住戶申請單建立人
 * @apiSuccess {String}   message.householdReqId.floor      新住戶樓層
 * @apiSuccess {String}   message.householdReqId.number     新住戶門牌號碼
 * 
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "RAj6cphyrHjzIqf8": {
      "community": "VrlwXx2V6retICfR",
      "createUser": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
      "floor": "12",
      "number": "66"
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
 * @apiSuccess {Object}   message.householdReqId            住戶申請單 ID
 * @apiSuccess {Object}   message.householdReqId.community  社區資料
 * @apiSuccess {Object}   message.householdReqId.community.communityId         社區 ID
 * @apiSuccess {String}   message.householdReqId.community.communityId.address 社區地址
 * @apiSuccess {String}   message.householdReqId.community.communityId.name    社區名稱
 * @apiSuccess {Object}   message.householdReqId.createUser 住戶申請單建立人資料
 * @apiSuccess {Object}   message.householdReqId.createUser.userId 住戶申請單建立人 ID
 * @apiSuccess {String}   message.householdReqId.createUser.userId.email 住戶申請單建立人 Email
 * @apiSuccess {String}   message.householdReqId.createUser.userId.name 住戶申請單建立人暱稱
 * @apiSuccess {String}   message.householdReqId.createUser.userId.photo 住戶申請單建立人大頭貼
 * @apiSuccess {String}   message.householdReqId.floor      新住戶樓層
 * @apiSuccess {String}   message.householdReqId.number     新住戶門牌號碼
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "RAj6cphyrHjzIqf8": {
      "community": {
        "VrlwXx2V6retICfR": {
          "address": "community 187 address",
          "name": "community 187"
        }
      },
      "createUser": {
        "HOeBzcVmwyPTL3Kdl6abfQwIbx82": {
          "email": "root@cpig.com",
          "name": "system_admin",
          "photo": ""
        }
      },
      "floor": "666",
      "number": "666"
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
 * @apiSuccess {Object}   message.householdId         住戶 ID
 * @apiSuccess {String}   message.householdId.floor   住戶樓層
 * @apiSuccess {String}   message.householdId.number  住戶門牌號碼
 *
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "7r4B6XI77dMSBSBH": {
      "floor": "12",
      "number": 68
    }
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */