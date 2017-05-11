const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const permission = require("../libs/permission");

const communityMember = require("../../actions/communityMember");

/*
  URL : /communities/:communityId/role/:role/members/:userId
*/
router.route('/')
.get((req, res) => { 
  if (permission.isAllowed(req.user.permission, `Members:${req.role}:other:read`))
    communityMember.getOne(req.userId).then(result => { return http.success(req, res, result) })
  else if (permission.isAllowed(req.user.permission, `Members:${req.role}:own:read`)) {
    if (req.userId === req.user.id)
      communityMember.getOne(req.userId).then(result => { return http.success(req, res, result) })
    else
      return http.permissionDenied(req, res);
  }
  else
    return http.permissionDenied(req, res);
})
.delete((req, res) => { 
  if (permission.isAllowed(req.user.permission, `Members:${req.role}:other:delete`))
    communityMember.remove(req.communityId, req.role, req.userId).then(result => { return http.success(req, res) })
  else if (permission.isAllowed(req.user.permission, `Members:${req.role}:own:delete`)) {
    if (req.userId === req.user.uid)
        communityMember.remove(req.communityId, req.role, req.userId).then(result => { return http.success(req, res) })
    else
      return http.permissionDenied(req, res);
  }
  else
    return http.permissionDenied(req, res);
})
.all((req, res) => {return http.methodNotAllowed(req, res)});

module.exports = router;