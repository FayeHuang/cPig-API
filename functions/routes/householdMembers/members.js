const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const permission = require("../libs/permission");
const householdMember = require("../../actions/householdMember");

/*
  URL : /communities/:communityId/households/:householdId/role/:role/members
*/
router.route('/')
.get((req, res) => {
  if (req.query.all === 'true') {
    if (permission.isAllowed(req.user.permission, `Members:${req.role}:other:read`))
      householdMember.getAll(req.householdId, req.role).then(result => { return http.success(req, res, result) });
    else
      return http.permissionDenied(req, res);
  }
  else {
    if (permission.isAllowed(req.user.permission, `Members:${req.role}:own:read`))
      householdMember.getOwn(req.householdId, req.role, req.user.uid).then(result => { return http.success(req, res, result) });
    else
      return http.permissionDenied(req, res);
  }
})
.all((req, res) => { return http.methodNotAllowed(req, res) });

module.exports = router;
