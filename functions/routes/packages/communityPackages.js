const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const permission = require("../libs/permission");

const package = require("../../actions/package");

/*
  URL : /communities/:communityId/packages
*/
router.route('/')
.get((req, res) => {
  if (permission.isAllowed(req.user.permission, `Packages:other:read`))
    package.getAllInCommunity(req.communityId).then(result => { return http.success(req, res, result) })
  else
    return http.permissionDenied(req, res);
})
.all((req, res) => {return http.methodNotAllowed(req, res)});

module.exports = router;