const admin = require('firebase-admin');
const db = admin.database();
const user = require("./user");

const _addMember = (communityId, role, uid) => {
  var updates = {};
  updates[`/CommunityMembers/${communityId}/${role}/${uid}`] = true;
  updates[`/UserRoles/${uid}/communities/${communityId}/${role}`] = true;
  return db.ref().update(updates);
}

const getOne = (userId) => {
  return user.getOne(userId)
}

const _mergeAll = (userIds) => {
  const process = userIds.map(id => getOne(id));
  return Promise.all(process).then(data => {
    return [].concat(data);
  });
}

const getAll = (communityId, role) => {
  return db.ref(`CommunityMembers/${communityId}/${role}`).once('value').then(snapshot=> {
    return snapshot.val() ? _mergeAll( Object.keys(snapshot.val())):[];
  })
}

const getOwn = (communityId, role, ownerId) => {
  return db.ref(`CommunityMembers/${communityId}/${role}/${ownerId}`).once('value').then(snapshot => {
    if (snapshot.val())
      return getOne(ownerId);
    else
      return {};
  })
}

const isExist = (communityId, role, userId) => {
  return db.ref(`CommunityMembers/${communityId}/${role}/${userId}`).once('value').then(snapshot => {
    if (snapshot.val())
      return true;
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