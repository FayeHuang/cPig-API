const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const permission = require("../libs/permission");
const invitation = require("../../actions/invitation");


/*
  URL : /communities/:communityId/role/:role/invitations/:invitationId
*/
router.route('/')
.get((req, res) => {
  if (permission.isAllowed(req.user.permission, `InviteMembers:${req.role}:other:read`))
    invitation.getOne(req.invitationId).then(result => { return http.success(req, res, result) });
  else if (permission.isAllowed(req.user.permission, `InviteMembers:${req.role}:own:read`)) {
    invitation.getOne(req.invitationId).then(result => { 
      if (result[req.invitationId].inviteUser === req.user.uid)
        return http.success(req, res, result) 
      else
        return http.permissionDenied(req, res);
    });
  }
  else
    return http.permissionDenied(req, res);
})
.delete((req, res) => {
  if (permission.isAllowed(req.user.permission, `InviteMembers:${req.role}:other:delete`))
    invitation.remove(req.invitationId).then(result => { return http.success(req, res) });
  else if (permission.isAllowed(req.user.permission, `InviteMembers:${req.role}:own:delete`)) {
    invitation.getOne(req.invitationId).then(result => { 
      if (result[req.invitationId].inviteUser === req.user.uid)
        invitation.remove(req.invitationId).then(result => { return http.success(req, res) }); 
      else
        return http.permissionDenied(req, res);
    });
  }
  else
    return http.permissionDenied(req, res);
})
.all((req, res) => {return http.methodNotAllowed(req, res)});

module.exports = router;