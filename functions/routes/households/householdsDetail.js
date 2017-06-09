const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const permission = require("../libs/permission");

const household = require("../../actions/household");

/*
  URL : /communities/:communityId/householdsDetail
*/
router.route('/')
.get((req, res) => {
  if (req.query.all === 'true') {
    if (permission.isAllowed(req.user.permission, 'Households:other:read'))
      household.getAllMemberDetail(req.communityId).then(result => { return http.success(req, res, result) });
    else 
      return http.permissionDenied(req, res);
  }
  else {
    if (permission.isAllowed(req.user.permission, 'Households:own:read'))
      household.getOwnMemberDetail(req.communityId, req.user.uid).then(result => { return http.success(req, res, result) });
    else
      return http.permissionDenied(req, res);
  }
})
.all((req, res) => {return http.methodNotAllowed(req, res)});

module.exports = router;