const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const admin = require('firebase-admin');
const verify = require("../libs/verify")

const permission = require("../libs/permission");
const merge = require("deepmerge");


/*
  URL : /communities/:communityId/householders/:householderId/residents
*/
router.route('/:communityId/householders/:householderId/residents')
.all((req, res, next) => {
  verify.communityExist(req, res, next);
})
.all((req, res, next) => {
  permission.community(req, res, next);
})
.all((req, res, next) => {
  admin().database().ref(`Householders/${req.communityId}/${req.params.householderId}`).once('value').then(snapshot => {
    if (snapshot.val())
      next();
    else
      return http.notFound(req, res);
  }).catch(error => {return http.internalServerError(req, res, error)});
})
.get((req, res) => { 
  if (req.query.all === 'true') {
    if (permission.isAllowed(req.user.permission, 'Members:RESIDENT:other:read')) {
      admin.database().ref(`HouseholderMembers/${req.params.householderId}/RESIDENT`).once('value')
      .then(snapshot => {
        var process = [];
        snapshot.forEach(childSnapshot => {
          const userId = childSnapshot.key;
          process.push(
            admin.database().ref(`Users/${userId}`).once('value').then(snapshot => {
              var result = {};
              result[userId] = snapshot.val();
              return result;
            }).catch(error => {return http.internalServerError(req, res, error)})
          );
        })
        
        var result = {success:true, message:{}};
        if (process.length > 0) {
          Promise.all(process).then(data => {
            if (process.length === 1)
              result.message = data[0]
            else
              result.message = merge.all(data)
            return res.json(result);
          }).catch(error => {return http.internalServerError(req, res, error)});
        }
        else
          return res.json(result);
      })
      .catch(error => {return http.internalServerError(req, res, error)});
    }
    else
      return http.permissionDenied(req, res);
  }
  else {
    if (permission.isAllowed(req.user.permission, 'Members:RESIDENT:own:read')) {
      admin.database().ref(`HouseholderMembers/${req.params.householderId}/RESIDENT`).orderByKey().equalTo(req.user.uid).once('value')
      .then(snapshot => {
        var result = {success:true, message:{}};
        if (snapshot.val()) {
          admin.database().ref(`Users/${req.user.uid}`).once('value').then(snapshot => {
            result.message[req.user.uid] = snapshot.val();
            return res.json(result);
          }).catch(error => {return http.internalServerError(req, res, error)})
        }
        else
          return res.json(result);
      })
      .catch(error => {return http.internalServerError(req, res, error)});
    }
    else
      return http.permissionDenied(req, res);
  }
})
.all((req, res) => {return http.methodNotAllowed(req, res)});

/*
  URL : /communities/:communityId/householders/:householderId/residents/:userId
*/
router.route('/:communityId/householders/:householderId/residents/:userId')
.all((req, res, next) => {
  verify.communityExist(req, res, next);
})
.all((req, res, next) => {
  permission.community(req, res, next);
})
.all((req, res, next) => {
  admin().database().ref(`Householders/${req.communityId}/${req.params.householderId}`).once('value').then(snapshot => {
    if (snapshot.val())
      next();
    else
      return http.notFound(req, res);
  }).catch(error => {return http.internalServerError(req, res, error)});
})
.all((req, res, next) => {
  admin.database().ref(`HouseholderMembers/${req.params.householderId}/RESIDENT/${req.params.userId}`).once('value')
  .then(snapshot => {
    if (snapshot.val())
      next();
    else
      http.notFound(req, res);
  }).catch(error => {return http.internalServerError(req, res, error)});
})
.delete((req, res) => {
  const communityId = req.params.communityId;
  const householderId = req.params.householderId;
  const userId = req.params.userId;
  if (permission.isAllowed(req.user.permission, 'Members:RESIDENT:other:delete')) {
    var process = [];
    process.push( admin.database().ref(`HouseholderMembers/${householderId}/RESIDENT/${userId}`).remove() );
    process.push( admin.database().ref(`HouseholderPermissions/${householderId}/${userId}`).remove() );
    process.push( admin.database().ref(`ResidentInviteCodes/${householderId}/${userId}`).remove() );
    process.push( admin.database().ref(`ResidentAdminInviteCodes/${householderId}/${userId}`).remove() );
    process.push( admin.database().ref(`InvitedResidents/${householderId}`).orderByChild('inviteUser').equalTo(userId).remove() );
    process.push( admin.database().ref(`InvitedResidentAdmins/${householderId}`).orderByChild('inviteUser').equalTo(userId).remove() );
    process.push( admin.database().ref(`CommunityMembers/${communityId}/RESIDENT/${userId}`).remove() );
    process.push( admin.database().ref(`UserRoles/${userId}/communities/${communityId}/RESIDENT`).remove() );
    process.push( admin.database().ref(`UserRoles/${userId}/householders/${communityId}/${householderId}/RESIDENT`).remove() );
    
    Promise.all(process).then(data => {
      return res.json({success:true})
    })
  }
  else if (permission.isAllowed(req.user.permission, 'Members:RESIDENT:own:delete')) {
    admin.database().ref(`UserRoles/${req.user.uid}/householders/${communityId}/${householderId}/RESIDENT`).once('value')
    .then(snapshot => {
      if (snapshot.val()) {
        var process = [];
        process.push( admin.database().ref(`HouseholderMembers/${householderId}/RESIDENT/${userId}`).remove() );
        process.push( admin.database().ref(`HouseholderPermissions/${householderId}/${userId}`).remove() );
        process.push( admin.database().ref(`ResidentInviteCodes/${householderId}/${userId}`).remove() );
        process.push( admin.database().ref(`ResidentAdminInviteCodes/${householderId}/${userId}`).remove() );
        process.push( admin.database().ref(`InvitedResidents/${householderId}`).orderByChild('inviteUser').equalTo(userId).remove() );
        process.push( admin.database().ref(`InvitedResidentAdmins/${householderId}`).orderByChild('inviteUser').equalTo(userId).remove() );
        process.push( admin.database().ref(`CommunityMembers/${communityId}/RESIDENT/${userId}`).remove() );
        process.push( admin.database().ref(`UserRoles/${userId}/communities/${communityId}/RESIDENT`).remove() );
        process.push( admin.database().ref(`UserRoles/${userId}/householders/${communityId}/${householderId}/RESIDENT`).remove() );
        
        Promise.all(process).then(data => {
          return res.json({success:true})
        })
      }
      else
        return http.permissionDenied(req, res);
    }).catch(error => {return http.internalServerError(req, res, error)});
  }
  else
    return http.permissionDenied(req, res);
})
.all((req, res) => {return http.methodNotAllowed(req, res)});

module.exports = router;