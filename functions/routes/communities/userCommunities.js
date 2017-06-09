const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const permission = require("../libs/permission");

const community = require("../../actions/community");

/*
  URL : /user/communities
*/
router.route('/')
.get((req, res) => {
  if (permission.isAllowed(req.user.permission, 'Communities:own:read'))
    community.getRoleDetailAll(req.user.uid).then(result => { return http.success(req, res, result) })
  else
    return http.permissionDenied(req, res);
})
.all((req, res) => {return http.methodNotAllowed(req, res)});


module.exports = router;