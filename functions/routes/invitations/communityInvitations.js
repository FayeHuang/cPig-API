const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const permission = require("../libs/permission");
const invitation = require("../../actions/invitation");
const user = require("../../actions/user");
const communityMember = require("../../actions/communityMember");


/*
  URL : /communities/:communityId/role/:role/invitations
*/
router.route('/')
.get((req, res) => {
  if (req.query.all === 'true') {
    if (permission.isAllowed(req.user.permission, `InviteMembers:${req.role}:other:read`))
      invitation.getAllByRole(req.role, req.communityId).then(result => { return http.success(req, res, result) })
    else
      return http.permissionDenied(req, res);
  }
  else {
    if (permission.isAllowed(req.user.permission, `InviteMembers:${req.role}:own:read`))
      invitation.getOwnByRole(req.user.uid, req.role, req.communityId).then(result => { return http.success(req, res, result) })
    else
      return http.permissionDenied(req, res);
  }
})
.post((req, res) => { 
  if (!req.body.user)
    return http.badRequest(req, res, `'user' is required`);
    
  if (permission.isAllowed(req.user.permission, `InviteMembers:${req.role}:create`)) {
    user.isExist(req.body.user).then(result => {
      if (result)
        return communityMember.isExist(req.communityId, req.role, req.body.user)
      else
        return http.badRequest(req, res, `user '${req.body.user}' does not exist`)
    }).then(result => {
      if (!result)
        return invitation.create(req.role, req.user.uid, req.body.user, req.communityId);
      else
        return http.badRequest(req, res, `user '${req.body.user}' is already the ${req.role} of the community '${req.communityId}'`);
    }).then(result => { 
      return http.success(req, res, result) 
    })
  }
  else
    return http.permissionDenied(req, res);
})
.all((req, res) => {return http.methodNotAllowed(req, res)});

module.exports = router;