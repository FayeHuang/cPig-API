const express = require('express');
const router = express.Router();

const roles = require("./roles");
const communityRoles = require("./communityRoles");
const householdRoles = require("./householdRoles");
const permissions = require("./permissions");
const communityPermissions = require("./communityPermissions");
const householdPermissions = require("./householdPermissions");

router.use('/user/roles', roles);
router.use('/user/roles/community/:communityId', communityRoles);
router.use('/user/roles/community/:communityId/household/:householdId', householdRoles);

router.use('/user/permissions', permissions);
router.use('/user/permissions/community/:communityId/role/:role', communityPermissions);
router.use('/user/permissions/community/:communityId/household/:householdId/role/:role', householdPermissions)


module.exports = router;

//  [GET]  /user/permissions
/**
 * @api {get} /user/permissions Get permissions of the current user
 * @apiName GetUserPermission
 * @apiGroup UserPermissions
 *
 * @apiSuccess {Boolean}  success API 執行成功與否
 * @apiSuccess {Object}   message 執行結果
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "Communities": {
      "create": true,
      "other": {
        "delete": true,
        "read": true,
        "update": true
      },
      "own": {
        "delete": true,
        "read": true,
        "update": true
      }
    },
    ...
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */

//  [GET]   /user/permissions/community/:communityId/role/:role
/**
 * @api {get} /user/permissions/community/:communityId/role/:role Get permissions of the specific role in community
 * @apiName GetUserPermissionInCommunity
 * @apiGroup UserPermissions
 *
 * @apiParam {String} communityId 社區 ID 
 * @apiParam {String} role 角色 (ex: COMMUNITY_ADMIN)
 * 
 * @apiSuccess {Boolean}  success API 執行成功與否
 * @apiSuccess {Object}   message 執行結果
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "Communities": {
      "create": true,
      "other": {
        "delete": true,
        "read": true,
        "update": true
      },
      "own": {
        "delete": true,
        "read": true,
        "update": true
      }
    },
    ...
  }
}
 * @apiUse Header
 * @apiUse Error
 */ 

//  [GET]   /user/permissions/community/:communityId/household/:householdId/role/:role
/**
 * @api {get} /user/permissions/community/:communityId/household/:householdId/role/:role Get permissions of the specific role in household
 * @apiName GetUserPermissionInHousehold
 * @apiGroup UserPermissions
 *
 * @apiParam {String} communityId 社區 ID 
 * @apiParam {String} householdId 住戶 ID 
 * @apiParam {String} role 角色 (ex: RESIDENT)
 * 
 * @apiSuccess {Boolean}  success API 執行成功與否
 * @apiSuccess {Object}   message 執行結果
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "Communities": {
      "create": true,
      "other": {
        "delete": true,
        "read": true,
        "update": true
      },
      "own": {
        "delete": true,
        "read": true,
        "update": true
      }
    },
    ...
  }
}
 * @apiUse Header
 * @apiUse Error
 */ 

//  [GET]   /user/roles
/**
 * @api {get} /user/roles Get roles of the current user
 * @apiName GetUserRoles
 * @apiGroup UserPermissions
 *
 * @apiSuccess {Boolean}  success API 執行成功與否
 * @apiSuccess {Object}   message 執行結果
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "SYSTEM_ADMIN": true,
    "USER": true
  }
}
 * @apiUse Header
 * @apiUse Error
 */ 

//  [GET]   /user/roles/community/:communityId
/**
 * @api {get} /user/roles/community/:communityId Get roles of the current user in community
 * @apiName GetUserRolesInCommunity
 * @apiGroup UserPermissions
 * 
 * @apiParam {String} communityId 社區 ID 
 *
 * @apiSuccess {Boolean}  success API 執行成功與否
 * @apiSuccess {Object}   message 執行結果
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "COMMUNITY_ADMIN": true,
    "RESIDENT_ADMIN": true
  }
}
 * @apiUse Header
 * @apiUse Error
 */ 

//  [GET]   /user/roles/community/:communityId/household/:householdId
/**
 * @api {get} /user/roles/community/:communityId/household/:householdId Get roles of the current user in household
 * @apiName GetUserRolesInHousehold
 * @apiGroup UserPermissions
 * 
 * @apiParam {String} communityId 社區 ID 
 * @apiParam {String} householdId 住戶 ID 
 *
 * @apiSuccess {Boolean}  success API 執行成功與否
 * @apiSuccess {Object}   message 執行結果
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "RESIDENT_ADMIN": true
  }
}
 * @apiUse Header
 * @apiUse Error
 */ 