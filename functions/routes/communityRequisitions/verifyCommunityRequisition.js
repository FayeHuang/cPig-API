const express = require('express');
const router = express.Router();
const http = require("../libs/http");

const permission = require("../libs/permission");
const communityRequisition = require("../../actions/communityRequisition");

/*
  URL : /user/communityRequisitions/:communityReqId/verify
*/
router.route('/')
.post((req, res) => {
  if (permission.isAllowed(req.user.permission, 'CommunityRequisitions:verify')) {
    communityRequisition.verify(req.communityReqId).then(result => {
      return http.success(req, res, result);
    })
  }
  else
    return http.permissionDenied(req, res);
})
.all((req, res) => {return http.methodNotAllowed(req, res)});

module.exports = router;