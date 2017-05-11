const admin = require('firebase-admin');
const merge = require('deepmerge');
const http = require('./http');


const permissionInHousehold = (communityId, householdId, userId) => {
  return admin.database().ref(`UserRoles/${userId}/households/${communityId}/${householdId}`).once('value').then(snapshot => {
    if (snapshot.val()) {
      return admin.database().ref(`HouseholdPermissions/${householdId}/${userId}`).once('value').then(snapshot => {
        if (snapshot.val())
          return snapshot.val();
        else
          return {};
      })
    }
    else
      return {};
  })
}

const permissionInCommunity = (communityId, userId) => {
  return admin.database().ref(`UserRoles/${userId}/communities/${communityId}`).once('value').then(snapshot => {
    if (snapshot.val()) {
      var process = [];
      snapshot.forEach(childSnapshot => {
        const role = childSnapshot.key;
        process.push(
          admin.database().ref(`CommunityPermissions/${communityId}/${role}`).once('value').then(snapshot => {
            return snapshot.val();
          })
        )
      })
      
      if (process.length > 0) {
        return Promise.all(process).then(result => {
          if (result.length === 1)
            return result[0];
          else
            return merge.all(result);
        })
      }
      else
        return {};
    }
    else
      return {};
  })
}

exports.isAllowed = (permission, action) => {
  const actions = action.split(':');
  var temp = permission;
  for (var i = 0; i < actions.length; i++) { 
    var key = actions[i];
    if (temp.hasOwnProperty(key))
      temp = temp[key]
    else
      return false
  }
  return temp;
}

exports.community = (req, res, next) => {
  if (req.communityId) {
    if (req.householdId)
      permissionInHousehold(req.communityId, req.householdId, req.user.uid).then(result => {
        req.user.permission = merge.all([req.user.permission, result])
        next();
      })
    else
      permissionInCommunity(req.communityId, req.user.uid).then(result => {
        req.user.permission = merge.all([req.user.permission, result]);
        next();
      })
  }
  else
    next();
    
}


// exports.community = (req, res, next) => {
//   admin.database().ref(`UserRoles/${req.user.uid}/communities/${req.communityId}`).once('value')
//   .then(snapshot => {
//     if (!snapshot.val())
//       next();
//     else {
//       var process = [];
//       snapshot.forEach(childSnapshot => {
//         const role = childSnapshot.key;
//         process.push(
//           admin.database().ref(`CommunityPermissions/${req.communityId}/${role}`).once('value')
//           .then(snapshot => {
//             return snapshot.val();
//           })
//           .catch(error => {return http.internalServerError(req, res, error)})
//         )
//       })
      
//       if (process.length > 0) {
//         Promise.all(process).then(result => {
//           result.push(req.user.permission);
//           req.user.permission = merge.all(result);
//           next();
//         }).catch(error => {return http.internalServerError(req, res, error)});
//       }
//       else
//         next();
//     }
//   })
//   .catch(error => {return http.internalServerError(req, res, error)});
// }


exports.system = (uid) => {
  const userRolesRef = admin.database().ref(`UserRoles/${uid}/system`);
  const rolePermissionDefineRef = admin.database().ref(`RolePermissionDefine`);
 
  return userRolesRef.once('value')
  .then((snapshot) => {
    var process = [];
    snapshot.forEach((childSnapshot) => {
      // USER=true or SYSTEM_ADMIN=true
      if (childSnapshot.val()) {
        // USER or SYSTEM_ADMIN
        const role = childSnapshot.key;
        process.push(
          rolePermissionDefineRef.child(role).once('value')
          .then((snapshot) => {
            return snapshot.val();
          })
        )
      }
    })
    
    if (process.length > 0) {
      var data = {};
      return Promise.all(process).then((result) => {
        if (result.length === 1)
          data = result[0];
        else
          data = merge.all(result);
        return data;
      });
      
    } else {
      return {};
    }
    
  })
  .catch((error) => {
    console.log(`[permission.system] failed. ${error}`);
  })
}
