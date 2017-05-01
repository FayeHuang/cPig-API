const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const admin = require('firebase-admin');
const permission = require("../libs/permission");
const merge = require("deepmerge");

router.route('/')
/**
 * @api {get} /invitations Read data of invitations
 * @apiName GetInvitations
 * @apiGroup UserInvitations
 *
 * @apiSuccess {Boolean}  success                             API 執行成功與否
 * @apiSuccess {Object}   message                             執行結果
 * @apiSuccess {String}   message.invitationId                邀請單 ID
 * @apiSuccess {String}   message.invitationId.role           邀請加入的角色. ex:COMMUNITY_ADMIN
 * @apiSuccess {Object}   message.invitationId.inviteUser     邀請人資料
 * @apiSuccess {String}   message.invitationId.inviteUser.userId       邀請人 ID
 * @apiSuccess {String}   message.invitationId.inviteUser.userId.email 邀請人 email
 * @apiSuccess {String}   message.invitationId.inviteUser.userId.name  邀請人名稱
 * @apiSuccess {String}   message.invitationId.inviteUser.userId.photo 邀請人大頭貼 URL
 * @apiSuccess {Object}   message.invitationId.community               邀請加入的社區資料
 * @apiSuccess {String}   message.invitationId.community.communityId   社區 ID 
 * @apiSuccess {String}   message.invitationId.community.communityId.name 社區名稱
 * @apiSuccess {String}   message.invitationId.community.communityId.address 社區地址
 * @apiSuccess {Object}   [message.invitationId.householder]               邀請加入的住戶資料
 * @apiSuccess {String}   [message.invitationId.householder.householderId]   住戶 ID 
 * @apiSuccess {String}   [message.invitationId.householder.householderId.number] 住戶門牌號碼
 * @apiSuccess {String}   [message.invitationId.householder.householderId.floor]  住戶樓層
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "BbNTidIz0n277sW6": {
      "inviteUser": {
        "HOeBzcVmwyPTL3Kdl6abfQwIbx82": {
          "email": "root@cpig.com",
          "isPublic": true,
          "name": "system_admin",
          "photo": ""
        }
      },
      "role": "GUARD",
      "community": {
        "WtICybIMORvkOg4I": {
          "address": "address 2222",
          "name": "community 2"
        }
      }
    }
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */
.get((req, res) => {
  if (permission.isAllowed(req.user.permission, 'Invitations:own:read')) {
    admin.database().ref(`Invitations/${req.user.uid}`).once('value').then(snapshot => {
      var process = [];
      snapshot.forEach(childSnapshot => {
        const invitationId = childSnapshot.key;
        const role = childSnapshot.val().role;
        const inviteUser = childSnapshot.val().inviteUser;
        
        process.push(
          admin.database().ref(`Users/${inviteUser}`).once('value').then(snapshot => {
            var data = {};
            data[invitationId] = { inviteUser:{}, role:role };
            data[invitationId]['inviteUser'][inviteUser] = snapshot.val();
            return data;
          })
        )
        
        if (role === 'COMMUNITY_ADMIN' || role === 'GUARD') {
          const communityId = childSnapshot.val().community;
          process.push(
            admin.database().ref(`Communities/${communityId}`).once('value').then(snapshot => {
              var data = {}
              data[invitationId] = { community:{} };
              data[invitationId]['community'][communityId] = snapshot.val();
              return data;
            })
          )
        }
        else if (role === 'RESIDENT' || role === 'RESIDENT_ADMIN') {
          
        }
      })
      
      var result = {success:true, message:{}};
      if (process.length > 0) {
        Promise.all(process).then(data => {
          if (process.length === 1)
            result.message = data[0];
          else
            result.message = merge.all(data)
          return res.json(result);
        })
      }
      else
        return res.json(result);
    }).catch(error => {return http.internalServerError(req, res, error)});
  }
  else
    return http.permissionDenied(req, res);
})
.all((req, res) => {return http.methodNotAllowed(req, res)});

router.route('/:invitationId')
.get((req, res) => {
  
})
.delete((req, res) => {
  
})
.all((req, res) => {return http.methodNotAllowed(req, res)});

router.route('/:invitationId/accept')
.post((req, res) => {
  
})
.all((req, res) => {return http.methodNotAllowed(req, res)});

module.exports = router;