const express = require('express');
const router = express.Router();
const merge = require('deepmerge');
const http = require("../libs/http");

const communityMember = require("../../actions/communityMember");
const community = require("../../actions/community");

/*
  URL : /user/permissions/community/:communityId/household/:householdId/role/:role
*/
router.route('/')
.get((req, res) => {
  communityMember.isExist(req.communityId, req.role, req.user.uid).then(result => {
    if (result)
      community.getRolePermission(req.communityId, req.role).then(result => { 
        const permission = merge.all([req.user.permission, result])
        return http.success(req, res, permission) 
      })
    else
     return http.permissionDenied(req, res);
  })
})
.all((req, res) => {return http.methodNotAllowed(req, res)});

module.exports = router;