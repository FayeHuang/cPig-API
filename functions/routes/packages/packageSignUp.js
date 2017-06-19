const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const permission = require("../libs/permission");

const package = require("../../actions/package");

/*
  URL : /communities/:communityId/households/:householdId/packages/:packageId/signUp
*/
router.route('/')
.post((req, res) => {
  if (!req.body.signImage )
    return http.badRequest(req, res, "'signImage' is required");
    
  if (permission.isAllowed(req.user.permission, 'Packages:other:update')) {
    var data = {};
    const receiveTime = new Date();
    const receiveTimestamp = receiveTime.getTime();
    data.isReceived = true;
    data.receiveTime = receiveTimestamp;
    data.signImage = req.body.signImage;
    package.modify(req.packageId, data).then(result => { return http.success(req, res, result) });
  }
  else
    return http.permissionDenied(req, res);
})
.all((req, res) => {return http.methodNotAllowed(req, res)});

module.exports = router;