const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const permission = require("../libs/permission");

const community = require("../../actions/community");

/*
  URL : /user/communities/:communityId
*/
router.route('/')
.get((req, res) => {
  if (permission.isAllowed(req.user.permission, 'Communities:own:read')) {
    community.isOwner(req.communityId, req.user.uid).then(result => {
      if (result) 
        community.getRoleDetail(req.user.uid, req.communityId).then(result => { return http.success(req, res, result) })
      else
        return http.permissionDenied(req, res);
    })
  }
  else
    return http.permissionDenied(req, res);
})
.all((req, res) => {return http.methodNotAllowed(req, res)});

module.exports = router;