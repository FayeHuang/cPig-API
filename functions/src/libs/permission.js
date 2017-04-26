const admin = require('firebase-admin');
const merge = require("deepmerge");

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
    console.log(`[userPermission.system] failed. ${error}`);
  })
}
