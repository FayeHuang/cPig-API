const admin = require('firebase-admin');
const merge = require("deepmerge");

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
        console.log(data);
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
