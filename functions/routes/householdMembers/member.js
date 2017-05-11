const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const permission = require("../libs/permission");

const householdMember = require("../../actions/householdMember");

/*
  URL : /communities/:communityId/households/:householdId/role/:role/members/:userId
*/
router.route('/')
.get((req, res) => { 
  if (permission.isAllowed(req.user.permission, `Members:${req.role}:other:read`))
    householdMember.getOne(req.userId).then(result => { return http.success(req, res, result) })
  else if (permission.isAllowed(req.user.permission, `Members:${req.role}:own:read`)) {
    if (req.userId === req.user.id)
      householdMember.getOne(req.userId).then(result => { return http.success(req, res, result) })
    else
      return http.permissionDenied(req, res);
  }
  else
    return http.permissionDenied(req, res);
})
.delete((req, res) => { 
  if (permission.isAllowed(req.user.permission, `Members:${req.role}:other:delete`))
    householdMember.remove(req.communityId, req.householdId, req.role, req.userId).then(() => { return http.success(req, res) })
  else if (permission.isAllowed(req.user.permission, `Members:${req.role}:own:delete`)) {
    if (req.userId === req.user.uid)
        householdMember.remove(req.communityId, req.householdId, req.role, req.userId).then(() => { return http.success(req, res) })
    else
      return http.permissionDenied(req, res);
  }
  else
    return http.permissionDenied(req, res);
})
.all((req, res) => {return http.methodNotAllowed(req, res)});

module.exports = router;