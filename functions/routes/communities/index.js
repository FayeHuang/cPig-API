const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const admin = require('firebase-admin');
const permission = require("../libs/permission");
const merge = require("deepmerge");
const verify = require("../libs/verify");

/*
  URL : /communities/?all=true/false
*/

router.route('/')
.get((req, res) => {
  if (req.query.all === 'true') {
    if (permission.isAllowed(req.user.permission, 'Communities:other:read')) {
      admin.database().ref('Communities').once('value').then(snapshot => {
        var result = {success:true, message:{}};
        snapshot.forEach((childSnapshot) => {
          result['message'][childSnapshot.key] = childSnapshot.val()
        })
        res.json(result);
      }).catch(error => {return http.internalServerError(req, res, error)});
    }
    else
      return http.permissionDenied(req, res);
  }
  else {
    if (permission.isAllowed(req.user.permission, 'Communities:own:read')) {
      admin.database().ref(`UserRoles/${req.user.uid}/communities`).once('value').then(snapshot => {
        var result = {success:true, message:{}};
        var process = [];
        snapshot.forEach((childSnapshot) => {
          const communityId = childSnapshot.key;
          process.push(
            admin.database().ref(`Communities/${communityId}`).once('value').then(snapshot => {
              var result = {};
              result[communityId] = snapshot.val();
              return result;
            })
          )
        })
        
        if (process.length > 0) {
          Promise.all(process).then(data => {
            if (data.length === 1)
              result.message = data[0];
            else
              result.message = merge.all(data);
            res.json(result);
          });
        }
        else
          res.json(result);
      }).catch(error => {return http.internalServerError(req, res, error)});
    }
    else
      return http.permissionDenied(req, res);
  }
})
.all((req, res) => {return http.methodNotAllowed(req, res)});


/*
  URL : /communities/:communityId/
*/

router.route('/:communityId')
.all((req, res, next) => {
  verify.communityExist(req, res, next);
})
.all((req, res, next) => {
  permission.community(req, res, next);
})
.get((req, res) => {
  if (permission.isAllowed(req.user.permission, 'Communities:other:read')) {
    admin.database().ref(`Communities/${req.communityId}`).once('value').then(snapshot => {
      var result = {success:true, message:{}};
      result.message[req.communityId] = snapshot.val();
      res.json(result);
    }).catch(error => {return http.internalServerError(req, res, error)});
  }
  else if (permission.isAllowed(req.user.permission, 'Communities:own:read')) {
    admin.database().ref(`UserRoles/${req.user.uid}/communities/${req.communityId}`).once('value').then(snapshot => {
      if (snapshot.val()) {
        admin.database().ref(`Communities/${req.communityId}`).once('value').then(snapshot => {
          var result = {success:true, message:{}};
          result.message[req.communityId] = snapshot.val();
          res.json(result);
        }).catch(error => {return http.internalServerError(req, res, error)});
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
  
  if (permission.isAllowed(req.user.permission, 'Communities:other:update')) {
    admin.database().ref(`Communities/${req.communityId}`).update(data).then(() => {
      admin.database().ref(`Communities/${req.communityId}`).once('value').then(snapshot => {
        var result = {success:true, message:{}};
        result.message[snapshot.key] = snapshot.val();
        res.json(result);
      })
    })
    .catch(error => {return http.internalServerError(req, res, error)});
  }
  else if (permission.isAllowed(req.user.permission, 'Communities:own:update')) {
    admin.database().ref(`Communities/${req.communityId}`).then((snapshot) => {
      if (snapshot.val().createUser === req.user.uid) {
        admin.database().ref(`Communities/${req.communityId}`).update(data).then(() => {
          admin.database().ref(`Communities/${req.communityId}`).once('value').then(snapshot => {
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
  // TODO: 把社區相關的資料都清空, ex: CommunityMembers, Householders, UserRoles ...
  
  if (permission.isAllowed(req.user.permission, 'Communities:other:delete')) {
    admin.database().ref(`Communities/${req.communityId}`).remove().then(() => {
      res.json({success:true});
    }).catch(error => {return http.internalServerError(req, res, error)});
  }
  else if (permission.isAllowed(req.user.permission, 'Communities:own:delete')) {
    admin.database().ref(`Communities/${req.communityId}`).once('value').then(snapshot => {
      if (snapshot.val().createUser === req.user.uid) {
        admin.database().ref(`Communities/${req.communityId}`).remove().then(() => {
          res.json({success:true});
        }).catch(error => {return http.internalServerError(req, res, error)});
      } 
      else
        return http.permissionDenied(req, res);
    }).catch(error => {return http.internalServerError(req, res, error)});
  }
  else
    return http.permissionDenied(req, res);
})
.all((req, res) => {return http.methodNotAllowed(req, res)});

const admins = require('./admins');
const guards = require('./guards');
router.use(admins);
router.use(guards);

module.exports = router;