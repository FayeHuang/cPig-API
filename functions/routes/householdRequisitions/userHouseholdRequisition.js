const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const permission = require("../libs/permission");
const householdRequisition = require("../../actions/householdRequisition");

/*
  URL : /user/householdRequisitions/:householdReqId
*/
router.route('/')
.get((req, res) => {
  if (permission.isAllowed(req.user.permission, 'HouseholdRequisitions:other:read'))
    householdRequisition.getOne(req.householdReqId).then(result => { return http.success(req, res, result) });
  else if (permission.isAllowed(req.user.permission, 'HouseholdRequisitions:own:read')) {
    householdRequisition.isOwner(req.householdReqId, req.user.uid).then(result => {
      if (result)
        householdRequisition.getOne(req.householdReqId).then(result => { return http.success(req, res, result) });
      else
        return http.permissionDenied(req, res);
    })
  }
  else
    return http.permissionDenied(req, res);
})
.delete((req, res) => {
  if (permission.isAllowed(req.user.permission, 'HouseholdRequisitions:other:delete'))
    householdRequisition.remove(req.householdReqId).then(() => { return http.success(req, res) });
  else if (permission.isAllowed(req.user.permission, 'HouseholdRequisitions:own:delete')) {
    householdRequisition.isOwner(req.householdReqId, req.user.uid).then(result => {
      if (result)
        householdRequisition.remove(req.householdReqId).then(() => { return http.success(req, res) });
      else
        return http.permissionDenied(req, res);
    })
  }
  else
    return http.permissionDenied(req, res);
})
.all((req, res) => { return http.methodNotAllowed(req, res) });


module.exports = router;