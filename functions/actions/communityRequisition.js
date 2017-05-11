const admin = require('firebase-admin');
const db = admin.database();

const randomstring = require("../routes/libs/randomstring");
const community = require("./community");
const communityMember = require("./communityMember");

const getAll = () => {
  return db.ref(`CommunityRequisitions`).once('value').then(snapshot => {
    var result = {};
    if (snapshot.val())  
      result = snapshot.val();
    return result;
  })
}

const getOwn = (uid) => {
  return db.ref(`CommunityRequisitions`).orderByChild('createUser').equalTo(uid).once('value').then(snapshot => {
    var result = {};
    if (snapshot.val())
      result = snapshot.val();
    return result;
  })
}

const getOne = (id) => {
  return db.ref(`CommunityRequisitions/${id}`).once('value').then(snapshot => {
    var result = {};
    if (snapshot.val())
      result[id] = snapshot.val();
    return result;
  })
}

const create = (data) => {
  const id = randomstring.uuid();
  return db.ref(`CommunityRequisitions/${id}`).set(data).then(() => {
    return getOne(id);
  }).then(result => {
    return result;
  })
}

const modify = (id, data) => {
  return db.ref(`CommunityRequisitions/${id}`).update(data).then(() => {
    return getOne(id);
  }).then(result => {
    return result;
  })
}

const remove = (id) => {
  return db.ref(`CommunityRequisitions/${id}`).remove().then(() => {
    return true;
  })
}

const isExist = (id) => {
  return db.ref(`CommunityRequisitions/${id}`).once('value').then(snapshot => {
    if (snapshot.val())
      return true;
    else
      return false;
  })
}

const isOwner = (id, ownerId) => {
  return db.ref(`CommunityRequisitions/${id}`).once('value').then(snapshot => {
    if (snapshot.val().createUser === ownerId)
      return true;
    else
      return false;
  })
}

const verify = (id) => {
  return getOne(id).then(result => {
    const communityId = randomstring.uuid();
    const name = result[id].name;
    const address = result[id].address;
    const targetUser = result[id].createUser;
    return db.ref('RolePermissionDefine').once('value').then(snapshot => {
      const permission = {
        'COMMUNITY_ADMIN': snapshot.val()['COMMUNITY_ADMIN'],
        'GUARD': snapshot.val()['GUARD'],
        'RESIDENT': snapshot.val()['RESIDENT'],
        'RESIDENT_ADMIN': snapshot.val()['RESIDENT_ADMIN']
      };
      
      var updates = {};
      updates[`/Communities/${communityId}`] = {name:name, address:address};
      updates[`/CommunitySNs/${communityId}/sn`] = randomstring.sn();
      updates[`/CommunityPermissions/${communityId}`] = permission;
      return db.ref().update(updates);
    }).then(() => {
      // 將 community requisition 的建立人設定為新社區的社區管理員
      return communityMember._addMember(communityId, 'COMMUNITY_ADMIN', targetUser)
    }).then(() => {
      // 刪除社區申請單
      return remove(id)
    }).then(result => {
      // 查詢新社區資料
      return community.getOne(communityId)
    }).then(result => {
      return result;
    })
  })
}

module.exports = {
  getAll: getAll,
  getOwn: getOwn,
  getOne: getOne,
  create: create,
  modify: modify,
  remove: remove,
  isExist: isExist,
  isOwner: isOwner,
  verify: verify
}
