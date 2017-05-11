const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const permission = require("../libs/permission");
const inviteCode = require("../../actions/inviteCode");
const communityMember = require("../../actions/communityMember");
const householdMember = require("../../actions/householdMember");


/*
  URL : /user/inviteCode/verify
*/
router.route('/')
.post((req, res) => {
  if (!req.body.code)
    return http.badRequest(req, res, `'code' is required`);
  
  const currentTime = new Date();
  const currentTimestamp = currentTime.getTime();
  inviteCode.verify(req.body.code).then(result => {
    if (result) {
      const id = Object.keys(result)[0];
      const expiredTime = result[id].expiredTime;
      
      if (currentTimestamp <= expiredTime) {
        const role = result[id].role;
        const communityId = result[id].community;
        const householdId = result[id].hasOwnProperty('household') ? result[id].household : null;
        if (householdId)
          householdMember._addMember(communityId, householdId, role, req.user.uid).then(() => { return http.success(req, res) });
        else
          communityMember._addMember(communityId, role, req.user.uid).then(() => { return http.success(req, res) });
      }
      else
        return http.badRequest(req, res, 'invite code expired');
    }
    else
      return http.badRequest(req, res, `wrong invite code '${req.body.code}'`);
  })
})
.all((req, res) => { return http.methodNotAllowed(req, res) });

module.exports = router;