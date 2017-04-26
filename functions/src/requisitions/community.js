const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const uuid = require("../libs/uuid");
const admin = require('firebase-admin');
const permission = require("../libs/permission");

const ref = admin.database().ref('CommunityRequisitions');

// ===================== /community =====================

router.route('/community')
.get((req, res) => {
  if (req.query.all === 'true') {
    // 取得所有社區申請單資料
    if (permission.isAllowed(req.user.permission,'CommunityRequisitions:other:read')) {
      ref.once('value').then((snapshot) => {
        var result = {success:true, message:{}};
        snapshot.forEach((childSnapshot) => {
          result['message'][childSnapshot.key] = childSnapshot.val()
        })
        res.json(result);
      }).catch((error) => {return http.internalServerError(req, res, error)});
    } 
    else
      return http.permissionDenied(req, res);
  } 
  else {
    // 取得使用者社區申請單資料
    if (permission.isAllowed(req.user.permission,'CommunityRequisitions:own:read')) {
      ref.orderByChild('createUser').equalTo(req.user.uid).once('value').then(snapshot => {
        var result = {success:true, message:{}};
        snapshot.forEach((childSnapshot) => {
          result['message'][childSnapshot.key] = childSnapshot.val();
        })
        res.json(result);
      }).catch(error => {return http.internalServerError(req, res, error)});
    }
    else
      return http.permissionDenied(req, res);
  }
})
.post((req, res) => {
  if (!req.body.name || !req.body.address ) {
    return http.badRequest(req, res);
  }
  
  const name = req.body.name;
  const address = req.body.address;
  // 新增社區申請單
  if (permission.isAllowed(req.user.permission,'CommunityRequisitions:create')) {
    const communityReqId = uuid();
    ref.child(communityReqId).set({
      name: name,
      address: address,
      createUser: req.user.uid
    }).then(() => {
      res.json({
        success:true, 
        message: {communityReqId:communityReqId}
      });
    })
    .catch(error => {return http.internalServerError(req, res, error)});
  }
  else
    return http.permissionDenied(req, res);
})
.all((req, res) => {return http.methodNotAllowed(req, res)});

// ===================== /community/:communityReqId =====================

router.route('/community/:communityReqId')
.all((req, res, next) => {
  
  ref.child(req.params.communityReqId).once('value').then(snapshot => {
    if (snapshot.val())
      next();
    else
      return http.notFound(req, res);
  })
  .catch(error => {return http.internalServerError(req, res, error)});
  
})
.get((req, res) => {
  const communityReqId = req.params.communityReqId;
  // 取得指定社區申請單資料 (可以讀其他人的)
  if (permission.isAllowed(req.user.permission, 'CommunityRequisitions:other:read')) {
    ref.child(communityReqId).once('value').then(snapshot => {
      var result = {success:true, message:{}};
      result.message[snapshot.key] = snapshot.val();
      res.json(result);
    })
    .catch(error => {return http.internalServerError(req, res, error)});
  }
  // 取得指定社區申請單資料 (只能讀自己的)
  else if (permission.isAllowed(req.user.permission, 'CommunityRequisitions:own:read')) {
    ref.child(communityReqId).once('value').then(snapshot => {
      if (snapshot.val().createUser === req.user.uid) {
        var result = {success:true, message:{}};
        result.message[snapshot.key] = snapshot.val();
        res.json(result);
      }
      else
        return http.permissionDenied(req, res);
    })
    .catch(error => {return http.internalServerError(req, res, error)});
  }
  else
    return http.permissionDenied(req, res);
})
.put((req, res) => {
  if (!req.body.name && !req.body.address)
    return http.badRequest(req, res);
    
  const data = {};
  if (req.body.name)
    data.name = req.body.name;
  if (req.body.address)
    data.address = req.body.address;
  
  const communityReqId = req.params.communityReqId;
  // 修改指定社區申請單 (可以修改其它人的)
  if (permission.isAllowed(req.user.permission, 'CommunityRequisitions:other:update')) {
    ref.child(communityReqId).update(data).then(() => {
      ref.child(communityReqId).once('value').then(snapshot => {
        var result = {success:true, message:{}};
        result.message[snapshot.key] = snapshot.val();
        res.json(result);
      })
    })
    .catch(error => {return http.internalServerError(req, res, error)});
  }
  // 修改指定社區申請單 (只能修改自己的)
  else if (permission.isAllowed(req.user.permission, 'CommunityRequisitions:own:update')) {
    ref.child(communityReqId).once('value').then((snapshot) => {
      if (snapshot.val().createUser === req.user.uid) {
        ref.child(communityReqId).update(data).then(() => {
          ref.child(communityReqId).once('value').then(snapshot => {
            var result = {success:true, message:{}};
            result.message[snapshot.key] = snapshot.val();
            res.json(result);
          });
        })
        .catch(error => {return http.internalServerError(req, res, error)});
      } 
      else
        return http.permissionDenied(req, res);
    })
    .catch(error => {return http.internalServerError(req, res, error)});
  }
  else
    return http.permissionDenied(req, res);
})
.delete((req, res) => {
  const communityReqId = req.params.communityReqId;
  // 刪除指定社區申請單 (可以刪除其它人的)
  if (permission.isAllowed(req.user.permission, 'CommunityRequisitions:other:delete')) {
    ref.child(communityReqId).remove().then(() => {
      res.json({success:true});
    })
    .catch(error => {return http.internalServerError(req, res, error)});
  }
  // 刪除指定社區申請單 (只能刪除自己的)
  else if (permission.isAllowed(req.user.permission, 'CommunityRequisitions:own:delete')) {
    ref.child(communityReqId).once('value').then(snapshot => {
      if (snapshot.val().createUser === req.user.uid) {
        ref.child(communityReqId).remove().then(() => {
          res.json({success:true});
        })
        .catch(error => {return http.internalServerError(req, res, error)});
      } 
      else
        return http.permissionDenied(req, res);
    })
  }
  else
    return http.permissionDenied(req, res);
})
.all((req, res) => {return http.methodNotAllowed(req, res)});

// ===================== /community/:communityReqId/verify =====================

router.route('/community/:communityReqId/verify')
.all((req, res, next) => {
  
  ref.child(req.params.communityReqId).once('value').then(snapshot => {
    if (snapshot.val())
      next();
    else
      return http.notFound(req, res);
  })
  .catch(error => {return http.internalServerError(req, res, error)});
  
})
.post((req, res) => {
  const communityReqId = req.params.communityReqId;
  // 指定社區申請單審核通過
  if (permission.isAllowed(req.user.permission, 'CommunityRequisitions:verify')) {
    ref.child(communityReqId).once('value').then(snapshot => {
      const name = snapshot.val().name;
      const address = snapshot.val().address;
      const createUser = snapshot.val().createUser;
      
      return admin.database().ref('RolePermissionDefine').once('value').then(snapshot => {
        var permission = snapshot.val();
        delete permission['SYSTEM_ADMIN'];
        delete permission['USER'];
        return {
          name: name, 
          address: address, 
          createUser: createUser, 
          communityId: uuid(),
          permission: permission
        }
      })
    }).then(data => {
      var updates = {};
      updates[`/Communities/${data.communityId}`] = {name:data.name, address:data.address};
      updates[`/CommunityMembers/${data.communityId}/COMMUNITY_ADMIN/${data.createUser}`] = true;
      updates[`/UserRoles/${data.createUser}/communities/${data.communityId}/COMMUNITY_ADMIN`] = true;
      updates[`/CommunityPermissions/${data.communityId}`] = data.permission;
      return admin.database().ref().update(updates).then(() => {
        return data;
      })
    }).then(data => {
      ref.child(req.params.communityReqId).remove().then(() => {
        res.json({
          success:true, 
          message: {communityId:data.communityId}
        });
      })
    })
    .catch(error => {return http.internalServerError(req, res, error)});
  }
  else
    return http.permissionDenied(req, res);
})
.all((req, res) => {return http.methodNotAllowed(req, res)});


module.exports = router;