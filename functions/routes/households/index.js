const express = require('express');
const router = express.Router();


const households = require("./households");
const household = require("./household");
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
 * @apiSuccess {Object}   message                     執行結果
 * @apiSuccess {Object}   message.householderId         住戶 ID
 * @apiSuccess {String}   message.householderId.floor   住戶樓層
 * @apiSuccess {String}   message.householderId.number  住戶門牌號碼
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "kwHMh4xvFIdlrZ25": {
      "floor": "12",
      "number": 66
    }
  }
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
 * @apiParam (Query string) {Boolean} [all] if true, 取得社區所有住戶資料. if false, 取得使用者的住戶資料.
 *
 * @apiSuccess {Boolean}  success                     API 執行成功與否
 * @apiSuccess {Object}   message                     執行結果
 * @apiSuccess {Object}   message.householderId         住戶 ID
 * @apiSuccess {String}   message.householderId.floor   住戶樓層
 * @apiSuccess {String}   message.householderId.number  住戶門牌號碼
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "kwHMh4xvFIdlrZ25": {
      "floor": "12",
      "number": 66
    }
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