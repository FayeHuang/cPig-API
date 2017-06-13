const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const permission = require("../libs/permission");
const invitation = require("../../actions/invitation");

/*
  URL : /communities/:communityId/households/:householdId/role/:role/beInvitedUsers
*/
router.route('/')
.get((req, res) => {
  if (permission.isAllowed(req.user.permission, `InviteMembers:${req.role}:create`))
    invitation.getBeInvitedUsers(req.role, req.communityId, req.householdId).then(result => { return http.success(req, res, result) })
  else
    return http.permissionDenied(req, res);
})
.all((req, res) => {return http.methodNotAllowed(req, res)});

module.exports = router;