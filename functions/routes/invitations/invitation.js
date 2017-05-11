const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const permission = require("../libs/permission");
const invitation = require("../../actions/invitation");

/*
  URL : /user/invitations/:invitationId
*/
router.route('/')
.get((req, res) => {
  if (permission.isAllowed(req.user.permission, 'Invitations:other:read'))
    invitation.getOne(req.invitationId).then(result => { return http.success(req, res, result) });
  else if (permission.isAllowed(req.user.permission, 'Invitations:own:read')) {
    invitation.isOwner(req.invitationId, req.user.uid).then(result => {
      if (result)
        invitation.getOne(req.invitationId).then(result => { return http.success(req, res, result) });
      else
        http.permissionDenied(req, res);
    })
  }
  else
    return http.permissionDenied(req, res);
})
.delete((req, res) => {
  if (permission.isAllowed(req.user.permission, 'Invitations:other:delete')) {
    invitation.remove(req.invitationId).then(() => { return http.success(req, res) })
  }
  else if (permission.isAllowed(req.user.permission, 'Invitations:own:delete')) {
    invitation.isOwner(req.invitationId, req.user.uid).then(result => {
      if (result)
        invitation.remove(req.invitationId).then(() => { return http.success(req, res) })
      else
        http.permissionDenied(req, res);
    })
  }
  else
    return http.permissionDenied(req, res);
})
.all((req, res) => {return http.methodNotAllowed(req, res)});


module.exports = router;