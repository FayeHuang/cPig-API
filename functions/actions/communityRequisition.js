const admin = require('firebase-admin');
const db = admin.database();
const randomstring = require("../routes/libs/randomstring");
const community = require("./community");
const communityMember = require("./communityMember");
const user = require("./user");

const create = (name, address, ownerId) => {
  const id = randomstring.uuid();
  const createTime = new Date();
  const createTimestamp = createTime.getTime();
  return db.ref(`CommunityRequisitions/${id}`).set({
    name:name,
    address:address,
    owner:ownerId,
    createTime:createTimestamp
  }).then(() => {
    return getOne(id);
  }).then(result => {
    return result;
  })
}

const getOne = (id) => {
  return db.ref(`CommunityRequisitions/${id}`).once('value').then(snapshot => {
    var result = {};
    if (snapshot.val()) {
      var process = [];
      const ownerId = snapshot.val().owner;
      process.push( user.getOne(ownerId) );
      result = Object.assign({id:id},snapshot.val());
      return Promise.all(process).then(data => {
        result.owner = data[0];
        return result;
      });
    }
    else
      return result;
  })
}

const _mergeAll = (communityIds) => {
  const process = communityIds.map(id => getOne(id));
  return Promise.all(process).then(data => {
    return [].concat(data);
  });
}

const getAll = () => {
  return db.ref(`CommunityRequisitions`).once('value').then(snapshot => {
    return snapshot.val() ? _mergeAll( Object.keys(snapshot.val()) ):[];
  })
}

const getOwn = (uid) => {
  return db.ref(`CommunityRequisitions`).orderByChild('owner').equalTo(uid).once('value').then(snapshot => {
    return snapshot.val() ? _mergeAll( Object.keys(snapshot.val()) ):[];
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
    if (snapshot.val().owner === ownerId)
      return true;
    else
      return false;
  })
}

const verify = (id) => {
  return getOne(id).then(result => {
    const communityId = randomstring.uuid();
    const name = result.name;
    const address = result.address;
    const targetUser = result.owner.id;
    const sn = randomstring.sn();
    const createTime = new Date();
    const createTimestamp = createTime.getTime();
      
    return db.ref('RolePermissionDefine').once('value').then(snapshot => {
      const permission = {
        'COMMUNITY_ADMIN': snapshot.val()['COMMUNITY_ADMIN'],
        'GUARD': snapshot.val()['GUARD'],
        'RESIDENT': snapshot.val()['RESIDENT'],
        'RESIDENT_ADMIN': snapshot.val()['RESIDENT_ADMIN']
      };
      
      var updates = {};
      updates[`/Communities/${communityId}`] = {
        name:name, 
        address:address,
        photo:'',
        sn:sn,
        createTime:createTimestamp,
        createUser:targetUser
      };
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
