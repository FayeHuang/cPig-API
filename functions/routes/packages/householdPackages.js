const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const permission = require("../libs/permission");

const package = require("../../actions/package");

/*
  URL : /communities/:communityId/households/:householdId/packages
*/
router.route('/')
.get((req, res) => {
  if (permission.isAllowed(req.user.permission, `Packages:own:read`))
    package.getAllInHousehold(req.householdId).then(result => { return http.success(req, res, result) })
  else
    return http.permissionDenied(req, res);
})
.post((req, res) => { 
  if (permission.isAllowed(req.user.permission, `Packages:create`)) {
    const isLetter = req.body.isLetter ? req.body.isLetter:false;
    return package.create(req.communityId, req.householdId, req.user.uid, isLetter).then(result => { return http.success(req, res, result) })
  }
  else
    return http.permissionDenied(req, res);
})
.all((req, res) => {return http.methodNotAllowed(req, res)});

module.exports = router;