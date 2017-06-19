const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const permission = require("../libs/permission");

const package = require("../../actions/package");
const packageReceiveCode = require("../../actions/packageReceiveCode");

/*
  URL : /communities/:communityId/packageReceiveCodeVerify
*/
router.route('/')
.post((req, res) => {
  if (!req.body.code)
    return http.badRequest(req, res, `'code' is required`);
  
  if (permission.isAllowed(req.user.permission, 'PackageReceiveCodes:verify')) {
    packageReceiveCode.verify(req.body.code).then(result => {
      if (result) {
        const currentTime = new Date();
        const currentTimestamp = currentTime.getTime();
        const expiredTimestamp = result.expiredTime;
        if (currentTimestamp <= expiredTimestamp) {
          var data = {};
          data.isReceived = true;
          data.receiveTime = currentTimestamp;
          data.receiveUser = result.user.id;
          package.modify(result.package.id, data).then(result => { return http.success(req, res, result) });
        }
        else
          return http.badRequest(req, res, 'package receive code expired');
      }
      else
        return http.badRequest(req, res, `wrong package receive code '${req.body.code}'`);
    })
  }
  else
    return http.permissionDenied(req, res);
})
.all((req, res) => { return http.methodNotAllowed(req, res) });

module.exports = router;