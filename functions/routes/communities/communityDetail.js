const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const permission = require("../libs/permission");

const community = require("../../actions/community");

/*
  URL : /communitiesDetail/:communityId
*/
router.route('/')
.get((req, res) => {
  if (permission.isAllowed(req.user.permission, 'Communities:other:read'))
    community.getMemberDetail(req.communityId).then(result => { return http.success(req, res, result) });
  else if (permission.isAllowed(req.user.permission, 'Communities:own:read')) {
    community.isOwner(req.communityId, req.user.uid).then(result => {
      if (result) 
        community.getMemberDetail(req.communityId).then(result => { return http.success(req, res, result) });
      else
        return http.permissionDenied(req, res);
    })
  }
  else
    return http.permissionDenied(req, res);
})

module.exports = router;