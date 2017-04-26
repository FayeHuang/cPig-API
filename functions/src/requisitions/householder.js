const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const uuid = require("../libs/uuid");
const admin = require('firebase-admin');
const permission = require("../libs/permission");

const ref = admin.database().ref('HouseholderRequisitions');


// ===================== /householder =====================

router.route('/householder')
.post((req, res) => {
  if (!req.body.communityId || !req.body.number || !req.body.floor)
    return http.badRequest(req, res);
  
  const communityId = req.body.communityId;
  const number = req.body.number;
  const floor = req.body.floor;
  
  // 新增住戶申請單
  if (permission.isAllowed(req.user.permission, 'HouseholderRequisitions:create')) {
    admin.database().ref(`Communities/${communityId}`).once('value').then(snapshot => {
      return snapshot.val();
    }).then(community => {
      if (community) {
        const householderReqId = uuid();
        ref.child(householderReqId).set({
          number: number,
          floor: floor,
          createUser: req.user.uid,
          community: communityId
        }).then(() => {
          res.json({
            success: true, 
            message: {householderReqId:householderReqId}
          })
        })
        .catch(error => {return http.internalServerError(req, res, error)});
      }
      else 
        return http.badRequest(req, res);
      
    })
    .catch(error => {return http.internalServerError(req, res, error)});
  }
  else
    return http.permissionDenied(req, res);
})
.get((req, res) => {
  if (req.query.all === 'true') {
    // 取得所有住戶申請單
    if (permission.isAllowed(req.user.permission, 'HouseholderRequisitions:other:read')) {
      ref.once('value').then((snapshot) => {
        var result = {success:true, message:{}};
        snapshot.forEach((childSnapshot) => {
          result['message'][childSnapshot.key] = childSnapshot.val()
        })
        res.json(result);
      })
      .catch(error => {return http.internalServerError(req, res, error)});
    }
    else
      return http.permissionDenied(req, res);
  }
  else {
    // 取得使用者的住戶申請單
    if (permission.isAllowed(req.user.permission, 'HouseholderRequisitions:own:read')) {
      ref.orderByChild('createUser').equalTo(req.user.uid).once('value').then(snapshot => {
        var result = {success:true, message:{}};
        snapshot.forEach((childSnapshot) => {
          result['message'][childSnapshot.key] = childSnapshot.val();
        })
        res.json(result);
      })
      .catch(error => {return http.internalServerError(req, res, error)}); 
    }
    else
      return http.permissionDenied(req, res);
  }
})
.all((req, res) => {return http.methodNotAllowed(req, res)});


// ===================== /householder/:householderReqId =====================


router.route('/householder/:householderReqId')
.all((req, res, next) => {
  
  ref.child(req.params.householderReqId).once('value').then(snapshot => {
    if (snapshot.val())
      next();
    else
      return http.notFound(req, res);
  })
  .catch(error => {return http.internalServerError(req, res, error)});
  
})
.get((req, res) => {
  const householderReqId = req.params.householderReqId;
  
  // 取得指定住戶申請單資料 (可以讀其他人的) 
  if (permission.isAllowed(req.user.permission, 'HouseholderRequisitions:other:read')) {
    ref.child(householderReqId).once('value').then(snapshot => {
      var result = {success:true, message:{}};
      result.message[snapshot.key] = snapshot.val();
      res.json(result);
    }).catch(error => {return http.internalServerError(req, res, error)}); 
  }
  // 取得指定住戶申請單資料 (只能讀自己的)
  else if (permission.isAllowed(req.user.permission, 'HouseholderRequisitions:own:read')) {
    ref.child(householderReqId).once('value').then(snapshot => {
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
.delete((req, res) => {
  const householderReqId = req.params.householderReqId;
  
  // 刪除指定住戶申請單 (可以刪除其它人的)
  if (permission.isAllowed(req.user.permission, 'HouseholderRequisitions:other:delete')) {
    ref.child(householderReqId).remove().then(() => {
      res.json({success:true});
    })
    .catch(error => {return http.internalServerError(req, res, error)});
  }
  // 刪除指定住戶申請單 (只能刪除自己的)
  else if (permission.isAllowed(req.user.permission, 'HouseholderRequisitions:own:delete')) {
    ref.child(householderReqId).once('value').then(snapshot => {
      if (snapshot.val().createUser === req.user.uid) {
        ref.child(householderReqId).remove().then(() => {
          res.json({success:true});
        })
        .catch(error => {return http.internalServerError(req, res, error)});
      } else {
        return http.permissionDenied(req, res);
      }
    })
    .catch(error => {return http.internalServerError(req, res, error)});
  }
  else
    return http.permissionDenied(req, res);
})
.all((req, res) => {return http.methodNotAllowed(req, res)});


// ===================== /householder/:householderReqId/verify =====================

router.route('/householder/:householderReqId/verify')
.all((req, res, next) => {
  ref.child(req.params.householderReqId).once('value').then(snapshot => {
    if (snapshot.val())
      next();
    else
      return http.notFound(req, res);
  })
  .catch(error => {return http.internalServerError(req, res, error)});
})
.post((req, res) => {
  // 指定住戶申請單審核通過
  if (permission.isAllowed(req.user.permission, 'HouseholderRequisitions:verify')) {
    ref.child(req.params.householderReqId).once('value').then(snapshot => {
      const communityId = snapshot.val().community;
      const number = snapshot.val().number;
      const floor = snapshot.val().floor;
      const createUser = snapshot.val().createUser;
      
      return admin.database().ref(`CommunityPermissions/${communityId}/RESIDENT_ADMIN`).once('value').then(snapshot => {
        return {
          communityId: communityId, 
          number: number, 
          floor: floor,
          createUser: createUser, 
          householderId: uuid(),
          permission: snapshot.val()
        }
      })
    }).then(data => {
      var updates = {};
      updates[`/Householders/${data.communityId}/${data.householderId}`] = {number:data.number, floor:data.floor};
      updates[`/HouseholderMembers/${data.householderId}/RESIDENT_ADMIN/${data.createUser}`] = true;
      updates[`/UserRoles/${data.createUser}/householders/${data.householderId}/RESIDENT_ADMIN`] = true;
      updates[`/HouseholderPermissions/${data.householderId}/${data.createUser}`] = data.permission;
      return admin.database().ref().update(updates).then(() => {
        return data;
      })
    })
    .then(data => {
      ref.child(req.params.householderReqId).remove().then(() => {
        res.json({
          success:true, 
          message: {householderId:data.householderId}
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