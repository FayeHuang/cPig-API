const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const permission = require("../libs/permission");
const inviteCode = require("../../actions/inviteCode");


/*
  URL : /communities/:communityId/role/:role/inviteCode
*/
router.route('/')
.get((req, res) => {
  if (permission.isAllowed(req.user.permission, `MemberInviteCodes:${req.role}:own:read`))
    inviteCode.getOne(req.role, req.user.uid, req.communityId).then(result => { return http.success(req, res, result) });
  else
    return http.permissionDenied(req, res);
})
.post((req, res) => {
  if (permission.isAllowed(req.user.permission, `MemberInviteCodes:${req.role}:create`))
    inviteCode.create(req.role, req.user.uid, req.communityId).then(result => { return http.success(req, res, result) });
  else
    return http.permissionDenied(req, res);
})
.put((req, res) => {
  if (permission.isAllowed(req.user.permission, `MemberInviteCodes:${req.role}:own:update`))
    inviteCode.create(req.role, req.user.uid, req.communityId).then(result => { return http.success(req, res, result) });
  else
    return http.permissionDenied(req, res);
})
.delete((req, res) => {
  if (permission.isAllowed(req.user.permission, `MemberInviteCodes:${req.role}:own:delete`))
    inviteCode.remove(req.role, req.user.uid, req.communityId).then(() => { return http.success(req, res) });
  else
    http.permissionDenied(req, res);
})
.all((req, res) => { return http.methodNotAllowed(req, res) });

module.exports = router;