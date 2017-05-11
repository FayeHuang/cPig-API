const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const permission = require("../libs/permission");
const communityMember = require("../../actions/communityMember");

/*
  URL : /communities/:communityId/role/:role/members
*/
router.route('/')
.get((req, res) => {
  if (req.query.all === 'true') {
    if (permission.isAllowed(req.user.permission, `Members:${req.role}:other:read`))
      communityMember.getAll(req.communityId, req.role).then(result => { return http.success(req, res, result) });
    else
      return http.permissionDenied(req, res);
  }
  else {
    if (permission.isAllowed(req.user.permission, `Members:${req.role}:own:read`))
      communityMember.getOwn(req.communityId, req.role, req.user.uid).then(result => { return http.success(req, res, result) });
    else
      return http.permissionDenied(req, res);
  }
})
.all((req, res) => { return http.methodNotAllowed(req, res) });

module.exports = router;
