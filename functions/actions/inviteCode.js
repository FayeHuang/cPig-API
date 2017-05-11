const admin = require('firebase-admin');
const db = admin.database();
const merge = require("deepmerge");
const randomstring = require("../routes/libs/randomstring");

const community = require("./community");
const household = require("./household");

const _mergeInfo = (data) => {
  var process = [];
  Object.keys(data).forEach(inviteCodeId => {
    const role = data[inviteCodeId].role;
    const code = data[inviteCodeId].code;
    const createTime = data[inviteCodeId].createTime;
    const expiredTime = data[inviteCodeId].expiredTime;
    const communityId = data[inviteCodeId].community;
    const householdId = data[inviteCodeId].hasOwnProperty('household') ? data[inviteCodeId].household : null;
    
    process.push(
      community.getOne(communityId).then(result => {
        return { community:result, role:role, code:code, createTime:createTime, expiredTime:expiredTime };
      })
    )
    
    if (householdId)
      process.push(
        household.getOne(communityId, householdId).then(result => {
          return { household:result };
        })
      )
  });
  
  if (process.length === 0)
    return {};
  else {
    return Promise.all(process).then(result => {
      if (result.length === 1)
        return result[0]
      else
        return merge.all(result)
    })
  }
}

const getOne = (role, userId, communityId, householdId) => {
  const inviteCodeId = householdId ? `${role}${userId}${householdId}` : `${role}${userId}${communityId}`;
  return db.ref(`InviteCodes/${inviteCodeId}`).once('value').then(snapshot => {
    if (snapshot.val()) {
      var data = {};
      data[inviteCodeId] = snapshot.val();
      return _mergeInfo(data);
    }
    else
      return {};
  })
}

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

const remove = (role, userId, communityId, householdId) => {
  const inviteCodeId = householdId ? `${role}${userId}${householdId}` : `${role}${userId}${communityId}`;
  return db.ref(`InviteCodes/${inviteCodeId}`).remove();
}

const removeByHousehold = (householdId) => {
  return db.ref(`InviteCodes`).orderByChild('household').equalTo(householdId).remove();
}

const removeByCommunity = (communityId) => {
  return db.ref(`InviteCodes`).orderByChild('community').equalTo(communityId).remove();
}

const verify = (code) => {
  return db.ref(`InviteCodes`).orderByChild('code').equalTo(code).once('value').then(snapshot => {
    if (snapshot.val())
      return snapshot.val()
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