const express = require('express');
const router = express.Router();

const members = require("./members");
const member = require("./member");
router.use('/communities/:communityId/households/:householdId/role/:role/members', members);
router.use('/communities/:communityId/households/:householdId/role/:role/members/:userId', member);

module.exports = router;


//  [GET]     /communities/:communityId/households/:householdId/role/:role/members
/**
 * @api {get} /communities/:communityId/households/:householdId/role/:role/members Read data of specific role members in the household
 * @apiName GetMembers
 * @apiGroup HouseholdMembers
 * 
 * @apiParam {String} communityId 社區 ID
 * @apiParam {String} householdId 住戶 ID
 * @apiParam {String} role 角色 (ex: RESIDENT)
 * 
 * @apiParam (Query string) {Boolean} [all] if true, 取得所有成員資料. if false, 取得自己的資料.
 *
 * @apiSuccess {Boolean}  success              API 執行成功與否
 * @apiSuccess {Object[]}   message              執行結果
 * @apiSuccess {String}   message.id       成員 ID
 * @apiSuccess {String}   message.email 成員 email
 * @apiSuccess {String}   message.name  成員名稱
 * @apiSuccess {String}   message.photo 成員大頭貼 URL
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": [
    {
      "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
      "email": "root@cpig.com",
      "name": "system_admin",
      "photo": ""
    }
  ]
}
 *
 * @apiUse Header
 * @apiUse Error
 */

//  [GET]     /communities/:communityId/households/:householdId/role/:role/members/:userId
/**
 * @api {get} /communities/:communityId/households/:householdId/role/:role/members/:userId Read data of specific role member in the household
 * @apiName GetMember
 * @apiGroup HouseholdMembers
 * 
 * @apiParam {String} communityId 社區 ID
 * @apiParam {String} householdId 住戶 ID
 * @apiParam {String} role 角色 (ex: RESIDENT)
 * @apiParam {String} userId      成員 UID
 * 
 * @apiSuccess {Boolean}  success              API 執行成功與否
 * @apiSuccess {Object}   message              執行結果
 * @apiSuccess {String}   message.id       成員 ID
 * @apiSuccess {String}   message.email 成員 email
 * @apiSuccess {String}   message.name  成員名稱
 * @apiSuccess {String}   message.photo 成員大頭貼 URL
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
    "email": "root@cpig.com",
    "name": "system_admin",
    "photo": ""
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */

//  [DELETE]  /communities/:communityId/households/:householdId/role/:role/members/:userId
/**
 * @api {delete} /communities/:communityId/households/:householdId/role/:role/members/:userId Delete specific role member in the household
 * @apiName DeleteMember
 * @apiGroup HouseholdMembers
 * 
 * @apiParam {String} communityId 社區 ID
 * @apiParam {String} householdId 住戶 ID
 * @apiParam {String} role 角色 (ex: RESIDENT)
 * @apiParam {String} userId      成員 UID
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
