const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const permission = require("../libs/permission");
const invitation = require("../../actions/invitation");

/*
  URL : /user/invitations
*/
router.route('/')
.get((req, res) => {
  if (req.query.all === 'true') {
    if (permission.isAllowed(req.user.permission, 'Invitations:other:read'))
      invitation.getAll().then(result => { return http.success(req, res, result) });
    else
      return http.permissionDenied(req, res);
  }
  else {
    if (permission.isAllowed(req.user.permission, 'Invitations:own:read'))
      invitation.getOwn(req.user.uid).then(result => { return http.success(req, res, result) });
    else
      return http.permissionDenied(req, res);
  }
})
.all((req, res) => {return http.methodNotAllowed(req, res)});

module.exports = router;