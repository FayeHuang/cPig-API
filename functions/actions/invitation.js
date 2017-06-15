const admin = require('firebase-admin');
const db = admin.database();
const randomstring = require("../routes/libs/randomstring");

const user = require("./user");
const community = require("./community");
const household = require("./household");
const communityMember = require("./communityMember");
const householdMember = require("./householdMember");

const create = (role, inviteUser, beInvitedUser, communityId, householdId) => {
  const invitationId = randomstring.uuid();
  const createTime = new Date();
  const createTimestamp = createTime.getTime();
  return db.ref(`Invitations/${invitationId}`).set({
    role: role,
    inviteUser: inviteUser,
    beInvitedUser: beInvitedUser,
    createTime: createTimestamp,
    community: communityId,
    household: householdId ? householdId : null
  }).then(() => {
    return getOne(invitationId)
  })
}

const getOne = (invitationId) => {
  return db.ref(`Invitations/${invitationId}`).once('value').then(snapshot => {
    var result = {};
    if (snapshot.val()) {
      var process = [];
      const beInvitedUserId = snapshot.val().beInvitedUser;
      const inviteUserId = snapshot.val().inviteUser;
      const communityId = snapshot.val().community;
      const householdId = snapshot.val().hasOwnProperty('household') ? snapshot.val().household:null;
      process.push( user.getOne(beInvitedUserId) );
      process.push( user.getOne(inviteUserId) );
      process.push( community.getOne(communityId) );
      if (householdId)
        process.push( household.getOne(communityId, householdId) );
      result = Object.assign({id:invitationId},snapshot.val());
      
      return Promise.all(process).then(data => {
        result.beInvitedUser = data[0];
        result.inviteUser = data[1];
        result.community = data[2];
        if (data.length === 4)
          result.household = data[3];
        return result;
      });
    }
    else
      return result;
  })
}

const _mergeAll = (invitationIds) => {
  const process = invitationIds.map(id => getOne(id));
  return Promise.all(process).then(data => {
    return [].concat(data);
  });
}

const getBeInvitedUsers = (role, communityId, householdId) => {
  var process = [];
  if (householdId)
    process.push(householdMember.getAll(householdId, role));
  else
    process.push(communityMember.getAll(communityId, role));
  process.push(getAllByRole(role, communityId, householdId));
  process.push(user.getAll());
  return Promise.all(process).then(data => {
    var filterUserIds = data[0].map(user => user.id);
    filterUserIds = filterUserIds.concat(data[1].map(invitation => invitation.beInvitedUser.id));
    const users = data[2];
    return users.filter(user => filterUserIds.indexOf(user.id) < 0);
  });
}

const getAllByRole = (role, communityId, householdId) => {
  return db.ref(`Invitations`).orderByChild('role').equalTo(role).once('value').then(snapshot => {
    if (snapshot.val()) {
      var list = [];
      snapshot.forEach(childSnapshot => {
        const invitationId = childSnapshot.key;
        if (householdId) {
          if (childSnapshot.val().household === householdId && childSnapshot.val().community === communityId)
            list.push(invitationId)
        } else {
          if (childSnapshot.val().community === communityId)
            list.push(invitationId)
        }
      })
      return list.length > 0 ? _mergeAll(list):[];
    }
    else
      return [];
  })
}

const getOwnByRole = (inviteUser, role, communityId, householdId) => {
  return db.ref(`Invitations`).orderByChild('inviteUser').equalTo(inviteUser).once('value').then(snapshot => {
    if (snapshot.val()) {
      var list = [];
      snapshot.forEach(childSnapshot => {
        const invitationId = childSnapshot.key;
        const role = childSnapshot.val().role;
        const communityId = childSnapshot.val().community;
        if (householdId) {
          if (childSnapshot.val().role === role && childSnapshot.val().community === communityId && childSnapshot.val().household === householdId)
            list.push(invitationId)
        } else {
          if (childSnapshot.val().role === role && childSnapshot.val().community === communityId)
            list.push(invitationId)
        }
      })
      return list.length > 0 ? _mergeAll(list):[];
    }
    else
      return [];
  })
}

const getAll = () => {
  return db.ref(`Invitations`).once('value').then(snapshot => {
    return snapshot.val() ? _mergeAll( Object.keys(snapshot.val()) ):[];
  })
}

const getOwn = (beInvitedUser) => {
  return db.ref(`Invitations`).orderByChild('beInvitedUser').equalTo(beInvitedUser).once('value').then(snapshot => {
    return snapshot.val() ? _mergeAll( Object.keys(snapshot.val()) ):[];
  })
}

const remove = (invitationId) => {
  return db.ref(`Invitations/${invitationId}`).remove().then(() => {
    return true;
  })
}

const removeByHousehold = (householdId) => {
  return db.ref(`Invitations`).orderByChild('household').equalTo(householdId).remove().then(() => {
    return true;
  })
}

const removeByCommunity = (communityId) => {
  return db.ref(`Invitations`).orderByChild('community').equalTo(communityId).remove().then(() => {
    return true;
  })
}

const isExist = (invitationId) => {
  return db.ref(`Invitations/${invitationId}`).once('value').then(snapshot => {
    if (snapshot.val())
      return true;
    else
      return false;
  })
}

const isExistInCommunity = (invitationId, role, communityId) => {
  return db.ref(`Invitations/${invitationId}`).once('value').then(snapshot => {
    if (snapshot.val() && snapshot.val().role === role && snapshot.val().community === communityId) 
      return true;
    else
      return false;
  })
}

const isExistInHousehold = (invitationId, role, householdId) => {
  return db.ref(`Invitations/${invitationId}`).once('value').then(snapshot => {
    if (snapshot.val() && snapshot.val().role === role && snapshot.val().household === householdId) 
      return true;
    else
      return false;
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
  getBeInvitedUsers: getBeInvitedUsers,
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