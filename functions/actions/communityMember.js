const admin = require('firebase-admin');
const db = admin.database();
const merge = require("deepmerge");

const user = require("./user");

const _addMember = (communityId, role, uid) => {
  var updates = {};
  updates[`/CommunityMembers/${communityId}/${role}/${uid}`] = true;
  updates[`/UserRoles/${uid}/communities/${communityId}/${role}`] = true;
  return db.ref().update(updates);
}

const getAll = (communityId, role) => {
  return db.ref(`CommunityMembers/${communityId}/${role}`).once('value').then(snapshot=> {
    var result = {};
    if (snapshot.val()) {
      var process = [];
      snapshot.forEach(childSnapshot => {
        const userId = childSnapshot.key;
        process.push(user.getOne(userId));
      })
      
      return Promise.all(process).then(data => {
        if (process.length === 1)
          result = data[0]
        else
          result = merge.all(data)
        return result
      })
    }
    else
      return result;
  })
}

const getOwn = (communityId, role, ownerId) => {
  return db.ref(`CommunityMembers/${communityId}/${role}/${ownerId}`).once('value').then(snapshot => {
    if (snapshot.val())
      return user.getOne(ownerId);
    else
      return {};
  })
}

const getOne = (userId) => {
  return user.getOne(userId)
}

const isExist = (communityId, role, userId) => {
  return db.ref(`CommunityMembers/${communityId}/${role}/${userId}`).once('value').then(snapshot => {
    if (snapshot.val())
      return snapshot.val();
    else
      return false;
  })
}

const remove = (communityId, role, userId) => {
  return db.ref(`CommunityMembers/${communityId}/${role}/${userId}`).remove().then(() => {
    return db.ref(`UserRoles/${userId}/communities/${communityId}/${role}`).remove()
  })
}

module.exports = {
  _addMember: _addMember,
  getAll: getAll,
  getOwn: getOwn,
  getOne: getOne,
  isExist: isExist,
  remove: remove
}