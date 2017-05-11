const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const permission = require("../libs/permission");
const householdRequisition = require("../../actions/householdRequisition");

/*
  URL : /communities/:communityId/householdRequisitions
*/
router.route('/')
.post((req, res) => {
  if (!req.body.number || !req.body.floor)
    return http.badRequest(req, res, `'number' and 'floor' is required`);
  
  const data = {
    number: req.body.number,
    floor: req.body.floor,
    createUser: req.user.uid,
    community: req.communityId
  };
    
  if (permission.isAllowed(req.user.permission, 'HouseholdRequisitions:create'))
    householdRequisition.create(data).then(result => { return http.success(req, res, result) });
  else
    return http.permissionDenied(req, res);
})
.get((req, res) => {
  if (req.query.all === 'true') {
    if (permission.isAllowed(req.user.permission, 'HouseholdRequisitions:other:read'))
      householdRequisition.getAllInCommunity(req.communityId).then(result => { return http.success(req, res, result) });
    else
      return http.permissionDenied(req, res);
  }
  else {
    if (permission.isAllowed(req.user.permission, 'HouseholdRequisitions:own:read'))
      householdRequisition.getOwnInCommunity(req.communityId, req.user.uid).then(result => { return http.success(req, res, result) });
    else
      return http.permissionDenied(req, res);
  }
})
.all((req, res) => {return http.methodNotAllowed(req, res)});

module.exports = router;