const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const permission = require("../libs/permission");

const household = require("../../actions/household");

/*
  URL : /communities/:communityId/householdsDetail/:householdId
*/
router.route('/')
.get((req, res) => {
  if (permission.isAllowed(req.user.permission, 'Households:other:read'))
    household.getMemberDetail(req.communityId, req.householdId).then(result => { return http.success(req, res, result) });
  else if (permission.isAllowed(req.user.permission, 'Households:own:read')) {
    household.isOwner(req.communityId, req.householdId, req.user.uid).then(result => {
      if (result)
        household.getMemberDetail(req.communityId, req.householdId).then(result => { return http.success(req, res, result) });
      else
        return http.permissionDenied(req, res);
    })
  }
  else
    return http.permissionDenied(req, res);
})
.all((req, res) => {return http.methodNotAllowed(req, res)});


module.exports = router;