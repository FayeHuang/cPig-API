const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const uuid = require("../libs/uuid");
const admin = require('firebase-admin');

const ref = admin.database().ref('CommunityRequisitions');

// ===================== /community =====================

var url = '/community';

router.route('/community')
.get((req, res) => {
  var process = null;
  // 取得所有社區申請單資料
  try {
    if (req.user.permission.CommunityRequisitions.other.read) {
      process = ref.once('value').then((snapshot) => {
        var result = {success:true, message:{}};
        snapshot.forEach((childSnapshot) => {
          result['message'][childSnapshot.key] = childSnapshot.val()
        })
        res.send(JSON.stringify(result));
      }).catch((error) => 
        http.internalServerError(req, res, error)
      );
    }
  } catch(e) {
    console.log(`[ /community ] ${e}`);
  }
  
  // 取得使用者社區申請單資料
  try {
    if (req.user.permission.CommunityRequisitions.own.read) {
      process = ref.orderByChild('createUser').equalTo(req.user.uid).once('value').then((snapshot) => {
        var result = {success:true, message:{}};
        snapshot.forEach((childSnapshot) => {
          result['message'][childSnapshot.key] = childSnapshot.val();
        })
        res.send(JSON.stringify(result));
      }).catch((error) =>
        http.internalServerError(req, res, error)
      ); 
    }
  } catch(e) {
    console.log(`[GET /community ] ${e}`);
  }
  
  if (!process)
    http.permissionDenied(req, res);
  
})
.post((req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  var process = null;
  // 新增社區申請單
  try {
    if (req.user.permission.CommunityRequisitions.create) {
      const communityReqId = uuid();
      process = ref.child(communityReqId).set({
        name: name,
        address: address,
        createUser: req.user.uid
      }).then(() => {
        res.send(JSON.stringify({
          success:true, 
          message: {communityReqId:communityReqId}
        }));
      }).catch(error => 
        http.internalServerError(req, res, error)
      );
    }
  } catch(e) {
    console.log(`[POST /community ] ${e}`);
  }
  
  if (!process)
    http.permissionDenied(req, res);
})
.all((req, res) => http.methodNotAllowed(req, res));

// ===================== /community/:communityReqId =====================

router.route('/community/:communityReqId')
.all((req, res, next) => {
  
  ref.child(req.params.communityReqId).once('value').then(snapshot => {
    if (snapshot.val())
      next();
    else
      http.notFound(req, res);
  })
  .catch(error => http.internalServerError(req, res, error));
  
})
.get((req, res) => {
  var process = null;
  // 取得指定社區申請單資料 (可以讀其他人的) 
  try {
    if (req.user.permission.CommunityRequisitions.other.read) {
      process = ref.child(req.params.communityReqId).once('value').then(snapshot => {
        var result = {success:true, message:{}};
        result.message[snapshot.key] = snapshot.val();
        res.send(JSON.stringify(result));
      }).catch(error => 
        http.internalServerError(req, res, error)
      );
    }
  } catch(e) {
    console.log(`[GET /community/:communityReqId ] ${e}`);
  }
  
  // 取得指定社區申請單資料 (只能讀自己的)
  try {
    if (req.user.permission.CommunityRequisitions.own.read) {
      process = ref.child(req.params.communityReqId).once('value').then(snapshot => {
        if (snapshot.val().createUser === req.user.uid) {
          var result = {success:true, message:{}};
          result.message[snapshot.key] = snapshot.val();
          res.send(JSON.stringify(result));
        }
        else {
          http.permissionDenied(req, res);
        }
      })
      .catch(error => http.internalServerError(req, res, error));
    }
  } catch(e) {
    console.log(`[GET /community/:communityReqId ] ${e}`);
  }
  
  if (!process)
    http.permissionDenied(req, res);
})
.put((req, res) => {
  const data = {};
  if (req.body.name)
    data.name = req.body.name;
  if (req.body.address)
    data.address = req.body.address;
  var process = null;
  
  // 修改指定社區申請單 (可以修改其它人的)
  try {
    if (req.user.permission.CommunityRequisitions.other.update) {
      process = ref.child(req.params.communityReqId).update(data).then(() => {
        res.send(JSON.stringify({
          success:true, 
          message: {communityReqId:req.params.communityReqId}
        }));
      })
      .catch(error => http.internalServerError(req, res, error));
    }
  } catch(e) {
    console.log(`[PUT /community/:communityReqId ] ${e}`);
  }
  
  // 修改指定社區申請單 (只能修改自己的)
  try {
    if (req.user.permission.CommunityRequisitions.own.update) {
      process = ref.child(req.params.communityReqId).once('value').then((snapshot) => {
        if (snapshot.val().createUser === req.user.uid) {
          ref.child(req.params.communityReqId).update(data).then(() => {
            res.send(JSON.stringify({
              success:true, 
              message: {communityReqId:req.params.communityReqId}
            }));
          })
          .catch(error => http.internalServerError(req, res, error));
        } else {
          http.permissionDenied(req, res);
        }
      })
      .catch(error => http.internalServerError(req, res, error));
    }
  } catch(e) {
    console.log(`[PUT /community/:communityReqId ] ${e}`);
  }
  
  if (!process)
    http.permissionDenied(req, res);
})
.delete((req, res) => {
  var process = null;
  
  // 刪除指定社區申請單 (可以刪除其它人的)
  try {
    if (req.user.permission.CommunityRequisitions.other.delete) {
      process = ref.child(req.params.communityReqId).remove().then(() => {
        res.send(JSON.stringify({
          success:true, 
          message: {communityReqId:req.params.communityReqId}
        }));
      })
      .catch(error => http.internalServerError(req, res, error));
    }
  } catch(e) {
    console.log(`[DELETE /community/:communityReqId ] ${e}`);
  }
  
  // 刪除指定社區申請單 (只能刪除自己的)
  try {
    if (req.user.permission.CommunityRequisitions.own.delete) {
      process = ref.child(req.params.communityReqId).once('value').then(snapshot => {
        if (snapshot.val().createUser === req.user.uid) {
          ref.child(req.params.communityReqId).remove().then(() => {
            res.send(JSON.stringify({
              success:true, 
              message: {communityReqId:req.params.communityReqId}
            }));
          })
          .catch(error => http.internalServerError(req, res, error));
        } else {
          http.permissionDenied(req, res);
        }
      })
    }
  } catch(e) {
    console.log(`[DELETE /community/:communityReqId ] ${e}`);
  }
  
  if (!process)
    http.permissionDenied(req, res);
})
.all((req, res) => http.methodNotAllowed(req, res));

// ===================== /community/:communityReqId/verify =====================

var url = '/community/:communityReqId/verify';

router.route(url)
.post((req, res) => {
  // 指定社區申請單審核通過
  res.send(`[POST] /community/${req.params.communityReqId}/verify`);
})
.all((req, res) => http.methodNotAllowed(req, res));



module.exports = router;