const express = require('express');
const router = express.Router();

const households = require("./households");
const household = require("./household");
const householdsDetail = require("./householdsDetail");
const householdDetail = require("./householdDetail");
router.use('/communities/:communityId/householdsDetail', householdsDetail);
router.use('/communities/:communityId/householdsDetail/:householdId', householdDetail);
router.use('/communities/:communityId/households', households);
router.use('/communities/:communityId/households/:householdId', household);

module.exports = router;

//  [GET]     /communities/:communityId/households
/**
 * @api {get} /communities/:communityId/households Read data of households in the community
 * @apiName GetHouseholds
 * @apiGroup Households
 *
 * @apiParam {String} communityId 社區 ID
 * @apiParam (Query string) {Boolean} [all] if true, 取得社區所有住戶資料. if false, 取得使用者的住戶資料.
 *
 * @apiSuccess {Boolean}  success                     API 執行成功與否
 * @apiSuccess {Object[]}   message                     執行結果
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
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": [
    {
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
  ]
}
 *
 * @apiUse Header
 * @apiUse Error
 */

//  [GET]     /communities/:communityId/households/:householdId
/**
 * @api {get} /communities/:communityId/households/:householdId Read data of household in the community
 * @apiName GetHousehold
 * @apiGroup Households
 *
 * @apiParam {String} communityId 社區 ID
 * @apiParam {String} householdId 住戶 ID
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

//  [DELETE]  /communities/:communityId/households/:householdId
/**
 * @api {delete} /communities/:communityId/households/:householdId Delete the household
 * @apiName DeleteHouseholder
 * @apiGroup Households
 *
 * @apiParam {String} communityId 社區 ID
 * @apiParam {String} householderId 住戶 ID
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
 
//  [GET]     /communities/:communityId/householdsDetail
/**
 * @api {get} /communities/:communityId/householdsDetail Read data of households detail in the community 
 * @apiName GetHouseholdsDetail
 * @apiGroup Households
 *
 * @apiParam {String} communityId 社區 ID
 * @apiParam (Query string) {Boolean} [all] if true, 取得社區所有住戶資料. if false, 取得使用者的住戶資料.
 *
 * @apiSuccess {Boolean}  success                     API 執行成功與否
 * @apiSuccess {Object[]}   message                     執行結果
 * @apiSuccess {String}   message.id         住戶 ID
 * @apiSuccess {String}   message.floor   住戶樓層
 * @apiSuccess {String}   message.number  住戶門牌號碼
 * @apiSuccess {String}   message.createTime  住戶建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {Object}   message.createUser 住戶建立人
 * @apiSuccess {String}   message.createUser.id  建立人 ID
 * @apiSuccess {String}   message.createUser.email  建立人 Email
 * @apiSuccess {String}   message.createUser.name  建立人暱稱
 * @apiSuccess {String}   message.createUser.photo  建立人大頭貼
 * @apiSuccess {Object[]} message.RESIDENT_ADMIN  住戶管理員
 * @apiSuccess {String}   message.RESIDENT_ADMIN.id  住戶管理員 ID
 * @apiSuccess {String}   message.RESIDENT_ADMIN.email  住戶管理員 Email
 * @apiSuccess {String}   message.RESIDENT_ADMIN.name  住戶管理員暱稱
 * @apiSuccess {String}   message.RESIDENT_ADMIN.photo  住戶管理員大頭貼 URL
 * @apiSuccess {Object[]} message.RESIDENT  住戶成員
 * @apiSuccess {String}   message.RESIDENT.id  住戶成員 ID
 * @apiSuccess {String}   message.RESIDENT.email  住戶成員 Email
 * @apiSuccess {String}   message.RESIDENT.name  住戶成員暱稱
 * @apiSuccess {String}   message.RESIDENT.photo  住戶成員大頭貼 URL
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": [
    {
      "id": "CEy3MLm11pnHq83G",
      "createTime": 1496993877818,
      "createUser": {
        "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
        "email": "root@cpig.com",
        "name": "system_admin",
        "photo": ""
      },
      "floor": "674",
      "number": "674",
      "RESIDENT_ADMIN": [
        {
          "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
          "email": "root@cpig.com",
          "name": "system_admin",
          "photo": ""
        }
      ],
      "RESIDENT": []
    }
  ]
}
 *
 * @apiUse Header
 * @apiUse Error
 */
 
//  [GET]     /communities/:communityId/householdsDetail/:householdId
/**
 * @api {get} /communities/:communityId/householdsDetail/:householdId Read data of household detail in the community
 * @apiName GetHouseholdDetail
 * @apiGroup Households
 *
 * @apiParam {String} communityId 社區 ID
 * @apiParam {String} householdId 住戶 ID
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
 * @apiSuccess {Object[]} message.RESIDENT_ADMIN  住戶管理員
 * @apiSuccess {String}   message.RESIDENT_ADMIN.id  住戶管理員 ID
 * @apiSuccess {String}   message.RESIDENT_ADMIN.email  住戶管理員 Email
 * @apiSuccess {String}   message.RESIDENT_ADMIN.name  住戶管理員暱稱
 * @apiSuccess {String}   message.RESIDENT_ADMIN.photo  住戶管理員大頭貼 URL
 * @apiSuccess {Object[]} message.RESIDENT  住戶成員
 * @apiSuccess {String}   message.RESIDENT.id  住戶成員 ID
 * @apiSuccess {String}   message.RESIDENT.email  住戶成員 Email
 * @apiSuccess {String}   message.RESIDENT.name  住戶成員暱稱
 * @apiSuccess {String}   message.RESIDENT.photo  住戶成員大頭貼 URL
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
    "number": "674",
    "RESIDENT_ADMIN": [
      {
        "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
        "email": "root@cpig.com",
        "name": "system_admin",
        "photo": ""
      }
    ],
    "RESIDENT": []
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */