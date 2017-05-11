const admin = require('firebase-admin');
const db = admin.database();
const merge = require("deepmerge");
const randomstring = require("../routes/libs/randomstring");

const user = require("./user");
const community = require("./community");
const household = require("./household");
const communityMember = require("./communityMember");
const householdMember = require("./householdMember");


const _mergeInfo = (data) => {
  var process = [];
  Object.keys(data).forEach(invitationId => {
    const beInvitedUser = data[invitationId].beInvitedUser;
    const inviteUser = data[invitationId].inviteUser; 
    const communityId = data[invitationId].community;
    const role = data[invitationId].role;
    const householdId = data[invitationId].hasOwnProperty('household') ? data[invitationId].household : null;
    
    process.push(
      user.getOne(beInvitedUser).then(result => {
        var data = {};
        data[invitationId] = { beInvitedUser:result, role:role }
        return data;
      })
    );
    
    process.push(
      user.getOne(inviteUser).then(result => {
        var data = {};
        data[invitationId] = { inviteUser:result }
        return data;
      })
    );
    
    process.push(
      community.getOne(communityId).then(result => {
        var data = {};
        data[invitationId] = { community:result }
        return data;
      })
    );
    
    if (householdId)
      process.push(
        household.getOne(communityId, householdId).then(result => {
          var data = {};
          data[invitationId] = { household:result }
          return data;
        })
      );
  });
  
  
  if (process.length === 0)
    return {};
  else
    return Promise.all(process).then(result => {
      return merge.all(result)
    })
}

const getAllByRole = (role, communityId, householdId) => {
  return db.ref(`Invitations`).orderByChild('role').equalTo(role).once('value').then(snapshot => {
    var data = {};
    snapshot.forEach(childSnapshot => {
      const invitationId = childSnapshot.key;
      const communityId = childSnapshot.val().community;
      if (householdId) {
        const householdId = childSnapshot.val().household;
        if (communityId === communityId && householdId === householdId)
          data[invitationId] = childSnapshot.val()
      }
      else {
        if (communityId === communityId)
          data[invitationId] = childSnapshot.val()
      }
    })
    return _mergeInfo(data);
  })
}

const getOwnByRole = (inviteUser, role, communityId, householdId) => {
  return db.ref(`Invitations`).orderByChild('inviteUser').equalTo(inviteUser).once('value').then(snapshot => {
    var data = {};
    snapshot.forEach(childSnapshot => {
      const invitationId = childSnapshot.key;
      const role = childSnapshot.val().role;
      const communityId = childSnapshot.val().community;
      if (householdId) {
        const householdId = childSnapshot.val().household;
        if (role === role && communityId === communityId && householdId === householdId)
          data[invitationId] = childSnapshot.val()
      }
      else {
        if (role === role && communityId === communityId)
          data[invitationId] = childSnapshot.val()
      }
    })
    return _mergeInfo(data);
  })
}

const getAll = () => {
  return db.ref(`Invitations`).once('value').then(snapshot => {
    if (snapshot.val())
      return _mergeInfo(snapshot.val());
    else
      return {};
  })
}

const getOwn = (beInvitedUser) => {
  return db.ref(`Invitations`).orderByChild('beInvitedUser').equalTo(beInvitedUser).once('value').then(snapshot => {
    if (snapshot.val())
      return _mergeInfo(snapshot.val());
    else
      return {};
  })
}

const getOne = (invitationId) => {
  return db.ref(`Invitations/${invitationId}`).once('value').then(snapshot => {
    if (snapshot.val()) {
      const data = {}
      data[invitationId] = snapshot.val();
      return _mergeInfo(data);
    }
    else
      return {};
  })
}

const create = (role, inviteUser, beInvitedUser, communityId, householdId) => {
  const invitationId = randomstring.uuid();
  return db.ref(`Invitations/${invitationId}`).set({
    role: role,
    inviteUser: inviteUser,
    beInvitedUser: beInvitedUser,
    community: communityId,
    household: householdId ? householdId : null
  }).then(() => {
    return getOne(invitationId)
  })
}

const remove = (invitationId) => {
  return db.ref(`Invitations/${invitationId}`).remove()
}

const removeByHousehold = (householdId) => {
  return db.ref(`Invitations`).orderByChild('household').equalTo(householdId).remove();
}

const removeByCommunity = (communityId) => {
  return db.ref(`Invitations`).orderByChild('community').equalTo(communityId).remove();
}

const isExist = (invitationId) => {
  return db.ref(`Invitations/${invitationId}`).once('value').then(snapshot => {
    if (snapshot.val())
      return snapshot.val()
    else
      return false
  })
}

const isExistInCommunity = (invitationId, role, communityId) => {
  return db.ref(`Invitations/${invitationId}`).once('value').then(snapshot => {
    if (snapshot.val() && snapshot.val().role === role && snapshot.val().community === communityId) 
      return snapshot.val()
    else
      return false
  })
}

const isExistInHousehold = (invitationId, role, householdId) => {
  return db.ref(`Invitations/${invitationId}`).once('value').then(snapshot => {
    if (snapshot.val() && snapshot.val().role === role && snapshot.val().household === householdId) 
      return snapshot.val()
    else
      return false
  })
}

const isOwner = (invitationId, ownerId) => {
  return db.ref(`Invitations/${invitationId}/beInvitedUser`).once('value').then(snapshot => {
    if (snapshot.val() && snapshot.val() === ownerId)
      return true;
    else
      return false;
  })
}

const accept = (invitationId) => {
  return db.ref(`Invitations/${invitationId}`).once('value').then(snapshot => {
    const role = snapshot.val().role;
    const communityId = snapshot.val().community;
    const beInvitedUser = snapshot.val().beInvitedUser;
    const householdId = snapshot.val().hasOwnProperty('household') ? snapshot.val().household : null;
    
    if (householdId)
      return householdMember._addMember(communityId, householdId, role, beInvitedUser)
    else
      return communityMember._addMember(communityId, role, beInvitedUser)
  }).then(() => {
    return remove(invitationId);
  })
}

module.exports = {
  getAllByRole: getAllByRole,
  getOwnByRole: getOwnByRole,
  getAll: getAll,
  getOwn: getOwn,
  getOne: getOne,
  create: create,
  remove: remove,
  removeByHousehold: removeByHousehold,
  removeByCommunity: removeByCommunity,
  isExist: isExist,
  isExistInCommunity: isExistInCommunity,
  isExistInHousehold: isExistInHousehold,
  isOwner: isOwner,
  accept: accept,
}