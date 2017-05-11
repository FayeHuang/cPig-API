const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const permission = require("../libs/permission");
const invitation = require("../../actions/invitation");

/*
  URL : /user/invitations/:invitationId/accept
*/
router.route('/')
.post((req, res) => {
  if (permission.isAllowed(req.user.permission, 'Invitations:own:accept')) {
    invitation.isOwner(req.invitationId, req.user.uid).then(result => {
      if (result)
        invitation.accept(req.invitationId).then(() => { return http.success(req, res) });
      else
        return http.permissionDenied(req, res);
    })
  }
  else
    return http.permissionDenied(req, res);
})
.all((req, res) => { return http.methodNotAllowed(req, res) });

module.exports = router;