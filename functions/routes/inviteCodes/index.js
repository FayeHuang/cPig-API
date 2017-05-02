const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const admin = require('firebase-admin');
// const verify = require("../libs/verify")

// const randomstring = require("../libs/randomstring");
const permission = require("../libs/permission");
// const merge = require("deepmerge");

/*
  URL : /inviteCodeVerify
*/
router.route('/inviteCodeVerify')
/**
 * @api {post} /inviteCodeVerify Verify invite code
 * @apiName VerifyInviteCode
 * @apiGroup InviteCode
 *
 * @apiParam (Body parameters) {String} code invite code 
 * @apiParamExample {json} Request-Example:
{
  "code": "ppLCPS"
}
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
.post((req, res) => {
  admin.database().ref(`InviteCodes`).orderByChild('code').equalTo(req.body.code).once('value').then(snapshot => {
    const currentTime = new Date();
    const currentTimestamp = currentTime.getTime();
    if (snapshot.val()) {
      const id = Object.keys(snapshot.val())[0];
      const expiredTime = snapshot.val()[id]['expiredTime'];
      if (currentTimestamp <= expiredTime) {
        const role = snapshot.val()[id]['role']
        if (role === 'COMMUNITY_ADMIN' || role === 'GUARD') {
          if (permission.isAllowed(req.user.permission, `MemberInviteCodes:${role}:verify`)) {
            const communityId = snapshot.val()[id]['community'];
            var updates = {};
            updates[`/CommunityMembers/${communityId}/${role}/${req.user.uid}`] = true;
            updates[`/UserRoles/${req.user.uid}/communities/${communityId}/${role}`] = true;
            return admin.database().ref().update(updates).then(() => {
              return res.json({success:true});
            }).catch(error => {return http.internalServerError(req, res, error)});
          }
          else
            return http.permissionDenied(req, res);
        }
        else if (role === 'RESIDENT' || role === 'RESIDENT_ADMIN') {
          // TODO
        }
      }
      else
        return http.badRequest(req, res, 'invite code expired');
    }
    else
      return http.badRequest(req, res, 'wrong invite code');
  }).catch(error => {return http.internalServerError(req, res, error)});
})
.all((req, res) => {return http.methodNotAllowed(req, res)});

module.exports = router;