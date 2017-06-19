const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const permission = require("../libs/permission");

const package = require("../../actions/package");
const household = require("../../actions/household");

/*
  URL : /communities/:communityId/households/:householdId/packages/:packageId
*/
router.route('/')
.put((req, res) => {
  if (!req.body.isInformed )
    return http.badRequest(req, res, "'isInformed' is required");
    
  const data = {isInformed:req.body.isInformed};
  if (permission.isAllowed(req.user.permission, 'Packages:other:update'))
    package.modify(req.packageId, data).then(result => { return http.success(req, res, result) });
  else
    return http.permissionDenied(req, res);
})
.delete((req, res) => {
  if (permission.isAllowed(req.user.permission, 'Packages:other:delete'))
    package.remove(req.packageId).then(() => { return http.success(req, res) });
  else if (permission.isAllowed(req.user.permission, 'Packages:own:delete')) {
    household.isOwner(req.communityId, req.household.id, req.user.uid).then(result => {
      if (result)
        package.remove(req.packageId).then(() => { return http.success(req, res) });
      else
        return http.permissionDenied(req, res);
    })
  }
  else
    return http.permissionDenied(req, res);
})
.all((req, res) => {return http.methodNotAllowed(req, res)});

module.exports = router;