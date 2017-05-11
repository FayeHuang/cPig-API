const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const permission = require("../libs/permission");
const householdRequisition = require("../../actions/householdRequisition");

/*
  URL : /communities/:communityId/householdRequisitions/:householdReqId/verify
*/
router.route('/')
.post((req, res) => {
  if (permission.isAllowed(req.user.permission, 'HouseholdRequisitions:verify'))
    householdRequisition.verify(req.householdReqId).then(result => { return http.success(req, res, result) });
  else
    return http.permissionDenied(req, res);
})
.all((req, res) => {return http.methodNotAllowed(req, res)});

module.exports = router;