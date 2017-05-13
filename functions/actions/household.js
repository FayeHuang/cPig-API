const admin = require('firebase-admin');
const db = admin.database();
const merge = require("deepmerge");


const getAll = (communityId) => {
  return db.ref(`Households/${communityId}`).once('value').then(snapshot => {
    if (snapshot.val())
      return snapshot.val();
    else
      return {};
  })
}

const getOwn = (communityId, uid) => {
  return db.ref(`UserRoles/${uid}/households/${communityId}`).once('value').then(snapshot => {
    var result = {};
    if (snapshot.val()) {
      var process = [];
      snapshot.forEach(childSnapshot => {
        const householdId = childSnapshot.key;
        process.push( getOne(communityId, householdId) );
      })
      
      return Promise.all(process).then(data => {
        if (data.length === 1)
          result = data[0];
        else
          result = merge.all(data);
        return result;
      });
    }
    else
      return result;
  })
}

const getOne = (communityId, id) => {
  return db.ref(`Households/${communityId}/${id}`).once('value').then(snapshot => {
    var result = {};
    if (snapshot.val())
      result[id] = snapshot.val();
    return result;
  })
}

const isExistInCommunity = (communityId, id) => {
  return db.ref(`Households/${communityId}/${id}`).once('value').then(snapshot => {
    if (snapshot.val())
      return snapshot.val()
    else
      return false;
  })
}

const isOwner = (communityId, id, ownerId) => {
  return db.ref(`UserRoles/${ownerId}/households/${communityId}/${id}`).once('value').then(snapshot => {
    if (snapshot.val())
      return snapshot.val();
    else
      return false;
  })
}

module.exports = {
  getAll: getAll,
  getOwn: getOwn,
  getOne: getOne,
  isExistInCommunity: isExistInCommunity,
  isOwner: isOwner,
}