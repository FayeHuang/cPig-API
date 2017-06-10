const admin = require('firebase-admin');
const db = admin.database();
const randomstring = require("../routes/libs/randomstring");

const community = require("./community");
const household = require("./household");

const create = (role, userId, communityId, householdId) => {
  const createTime = new Date();
  const createTimestamp = createTime.getTime();
  const expiredTimestamp = createTime.setMinutes(createTime.getMinutes() + 10);
  const code = randomstring.code();
  const inviteCodeId = householdId ? `${role}${userId}${householdId}` : `${role}${userId}${communityId}`;
  
  return db.ref(`InviteCodes/${inviteCodeId}`).set({
    role: role,
    community: communityId,
    code: code,
    createTime: createTimestamp,
    expiredTime: expiredTimestamp,
    household: householdId ? householdId : null,
  }).then(() => {
    return getOne(role, userId, communityId, householdId)
  })
}

const getOne = (role, userId, communityId, householdId) => {
  const inviteCodeId = householdId ? `${role}${userId}${householdId}` : `${role}${userId}${communityId}`;
  return db.ref(`InviteCodes/${inviteCodeId}`).once('value').then(snapshot => {
    var result = {};
    if (snapshot.val()) {
      var process = [];
      process.push( community.getOne(communityId) );
      if (householdId)
        process.push( household.getOne(communityId, householdId) );
      result = Object.assign({id:inviteCodeId},snapshot.val());
      
      return Promise.all(process).then(data => {
        result.community = data[0];
        if (data.length === 2)
          result.household = data[1];
        return result;
      });
    }
    else
      return result;
  })
}

const remove = (role, userId, communityId, householdId) => {
  const inviteCodeId = householdId ? `${role}${userId}${householdId}` : `${role}${userId}${communityId}`;
  return db.ref(`InviteCodes/${inviteCodeId}`).remove().then(() => {
    return true;
  })
}

const removeByHousehold = (householdId) => {
  return db.ref(`InviteCodes`).orderByChild('household').equalTo(householdId).remove().then(() => {
    return true;
  })
}

const removeByCommunity = (communityId) => {
  return db.ref(`InviteCodes`).orderByChild('community').equalTo(communityId).remove().then(() => {
    return true;
  })
}

const verify = (code) => {
  return db.ref(`InviteCodes`).orderByChild('code').equalTo(code).once('value').then(snapshot => {
    if (snapshot.val())
      return snapshot.val();
    else
      false;
  })
}


module.exports = {
  getOne: getOne,
  create: create,
  remove: remove,
  removeByHousehold: removeByHousehold,
  removeByCommunity: removeByCommunity,
  verify: verify,
}