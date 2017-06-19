const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const permission = require("../libs/permission");

const packageReceiveCode = require("../../actions/packageReceiveCode");

/*
  URL : /communities/:communityId/households/:householdId/packages/:packageId/receiveCode
*/
router.route('/')
.get((req, res) => {
  if (permission.isAllowed(req.user.permission, `PackageReceiveCodes:own:read`))
    packageReceiveCode.getOne(req.user.uid, req.packageId).then(result => { return http.success(req, res, result) });
  else
    return http.permissionDenied(req, res);
})
.post((req, res) => {
  if (permission.isAllowed(req.user.permission, `PackageReceiveCodes:create`))
    packageReceiveCode.create(req.user.uid, req.packageId).then(result => { return http.success(req, res, result) });
  else
    return http.permissionDenied(req, res);
})
.put((req, res) => {
  if (permission.isAllowed(req.user.permission, `PackageReceiveCodes:own:update`))
    packageReceiveCode.create(req.user.uid, req.packageId).then(result => { return http.success(req, res, result) });
  else
    return http.permissionDenied(req, res);
})
.delete((req, res) => {
  if (permission.isAllowed(req.user.permission, `PackageReceiveCodes:own:delete`))
    packageReceiveCode.remove(req.user.uid, req.packageId).then(() => { return http.success(req, res) });
  else
    http.permissionDenied(req, res);
})
.all((req, res) => { return http.methodNotAllowed(req, res) });

module.exports = router;
