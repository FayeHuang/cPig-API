const express = require('express');
const router = express.Router();

const communities = require("./communities");
const community = require("./community");
const communitySnVerify = require("./communitySnVerify");
const userCommunities = require("./userCommunities");
const userCommunity = require("./userCommunity");
const communitiesDetail = require("./communitiesDetail");
const communityDetail = require("./communityDetail");

router.use('/user/communities', userCommunities);
router.use('/user/communities/:communityId', userCommunity);
router.use('/user/communitySn/verify', communitySnVerify);
router.use('/communities', communities);
router.use('/communities/:communityId', community);
router.use('/communitiesDetail', communitiesDetail);
router.use('/communitiesDetail/:communityId', communityDetail);

module.exports = router;

//  [GET]     /user/communities
/**
 * @api {get} /user/communities Read detail data of communities
 * @apiName GetOwnCommunitiesDetail
 * @apiGroup Communities
 *
 * @apiSuccess {Boolean}  success                     API 執行成功與否
 * @apiSuccess {Object[]}   message                     執行結果
 * @apiSuccess {String}   message.id 社區 ID
 * @apiSuccess {String}   message.name 社區名稱
 * @apiSuccess {String}   message.address 社區地址
 * @apiSuccess {String}   message.createTime 社區建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.sn 社區序號
 * @apiSuccess {String}   message.photo 社區圖片 URL
 * @apiSuccess {Object}   message.createUser  社區建立人
 * @apiSuccess {String}   message.createUser.id  建立人 ID
 * @apiSuccess {String}   message.createUser.email  建立人 Email
 * @apiSuccess {String}   message.createUser.name  建立人暱稱
 * @apiSuccess {String}   message.createUser.photo  建立人大頭貼 URL
 * @apiSuccess {String[]}   message.roles   所屬角色清單 (ex: [COMMUNITY_ADMIN])
 * @apiSuccess {Object[]}   message.households  住戶資料
 * @apiSuccess {Object}   [message.households.id]  住戶 ID
 * @apiSuccess {String}   [message.households.floor]  住戶樓層
 * @apiSuccess {String}   [message.households.number] 住戶門牌號碼
 * @apiSuccess {String}   [message.households.createTime] 住戶建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {Object}   [message.households.createUser]  住戶建立人
 * @apiSuccess {String}   [message.households.createUser.id]  建立人 ID
 * @apiSuccess {String}   [message.households.createUser.email]  建立人 Email
 * @apiSuccess {String}   [message.households.createUser.name]  建立人暱稱
 * @apiSuccess {String}   [message.households.createUser.photo]  建立人大頭貼 URL
 * @apiSuccess {String[]} [message.households.roles]  所屬角色清單 (ex: [RESIDENT_ADMIN])
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": [
    {
      "id": "WIOmgnw9Og37fk73",
      "address": "community 712 address",
      "createTime": 1496991275991,
      "createUser": {
        "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
        "email": "root@cpig.com",
        "name": "system_admin",
        "photo": ""
      },
      "name": "community 712",
      "photo": "",
      "sn": "016993",
      "roles": [
        "COMMUNITY_ADMIN",
        "RESIDENT_ADMIN"
      ],
      "households": [
        {
          "id": "hxR6nQLeCWisXYwG",
          "createTime": 1496991584424,
          "createUser": {
            "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
            "email": "root@cpig.com",
            "name": "system_admin",
            "photo": ""
          },
          "floor": "982",
          "number": "982",
          "roles": [
            "RESIDENT_ADMIN"
          ]
        }
      ]
    }
  ]
}
 *
 * @apiUse Header
 * @apiUse Error
 */
 
//  [GET]     /user/communities/:communityId
/**
 * @api {get} /user/communities Read detail data of the community
 * @apiName GetOwnCommunityDetail
 * @apiGroup Communities
 * 
 * @apiParam {String} communityId 社區 ID
 *
 * @apiSuccess {Boolean}  success                     API 執行成功與否
 * @apiSuccess {Object}   message                     執行結果
 * @apiSuccess {String}   message.id 社區 ID
 * @apiSuccess {String}   message.name 社區名稱
 * @apiSuccess {String}   message.address 社區地址
 * @apiSuccess {String}   message.createTime 社區建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.sn 社區序號
 * @apiSuccess {String}   message.photo 社區圖片 URL
 * @apiSuccess {Object}   message.createUser  社區建立人
 * @apiSuccess {String}   message.createUser.id  建立人 ID
 * @apiSuccess {String}   message.createUser.email  建立人 Email
 * @apiSuccess {String}   message.createUser.name  建立人暱稱
 * @apiSuccess {String}   message.createUser.photo  建立人大頭貼 URL
 * @apiSuccess {String[]}   message.roles   所屬角色清單 (ex: [COMMUNITY_ADMIN])
 * @apiSuccess {Object[]}   message.households  住戶資料
 * @apiSuccess {Object}   [message.households.id]  住戶 ID
 * @apiSuccess {String}   [message.households.floor]  住戶樓層
 * @apiSuccess {String}   [message.households.number] 住戶門牌號碼
 * @apiSuccess {String}   [message.households.createTime] 住戶建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {Object}   [message.households.createUser]  住戶建立人
 * @apiSuccess {String}   [message.households.createUser.id]  建立人 ID
 * @apiSuccess {String}   [message.households.createUser.email]  建立人 Email
 * @apiSuccess {String}   [message.households.createUser.name]  建立人暱稱
 * @apiSuccess {String}   [message.households.createUser.photo]  建立人大頭貼 URL
 * @apiSuccess {String[]} [message.households.roles]  所屬角色清單 (ex: [RESIDENT_ADMIN])
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "id": "WIOmgnw9Og37fk73",
    "address": "community 712 address",
    "createTime": 1496991275991,
    "createUser": {
      "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
      "email": "root@cpig.com",
      "name": "system_admin",
      "photo": ""
    },
    "name": "community 712",
    "photo": "",
    "sn": "016993",
    "roles": [
      "COMMUNITY_ADMIN",
      "RESIDENT_ADMIN"
    ],
    "households": [
      {
        "id": "hxR6nQLeCWisXYwG",
        "createTime": 1496991584424,
        "createUser": {
          "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
          "email": "root@cpig.com",
          "name": "system_admin",
          "photo": ""
        },
        "floor": "982",
        "number": "982",
        "roles": [
          "RESIDENT_ADMIN"
        ]
      }
    ]
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */

//  [GET]     /communities
/**
 * @api {get} /communities Read data of communities
 * @apiName GetCommunities
 * @apiGroup Communities
 *
 * @apiParam (Query string) {Boolean} [all] if true, 取得所有社區資料. if false, 取得使用者的社區資料.
 *
 * @apiSuccess {Boolean}  success             API 執行成功與否
 * @apiSuccess {Object[]}   message             執行結果
 * @apiSuccess {String}   message.id 社區 ID
 * @apiSuccess {String}   message.name 社區名稱
 * @apiSuccess {String}   message.address 社區地址
 * @apiSuccess {String}   message.createTime 社區建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.sn 社區序號
 * @apiSuccess {String}   message.photo 社區圖片 URL
 * @apiSuccess {Object}   message.createUser  社區建立人
 * @apiSuccess {String}   message.createUser.id  建立人 ID
 * @apiSuccess {String}   message.createUser.email  建立人 Email
 * @apiSuccess {String}   message.createUser.name  建立人暱稱
 * @apiSuccess {String}   message.createUser.photo  建立人大頭貼 URL
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": [
    {
      "id": "WIOmgnw9Og37fk73",
      "address": "community 712 address",
      "createTime": 1496991275991,
      "createUser": {
        "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
        "email": "root@cpig.com",
        "name": "system_admin",
        "photo": ""
      },
      "name": "community 712",
      "photo": "",
      "sn": "016993"
    }
  ]
}
 *
 * @apiUse Header
 * @apiUse Error
 */

//  [GET]     /communities/:communityId
/**
 * @api {get} /communities/:communityId Read data of the community
 * @apiName GetCommunity
 * @apiGroup Communities
 *
 * @apiParam {String} communityId 社區 ID
 *
 * @apiSuccess {Boolean}  success             API 執行成功與否
 * @apiSuccess {Object}   message             執行結果
 * @apiSuccess {String}   message.id 社區 ID
 * @apiSuccess {String}   message.name 社區名稱
 * @apiSuccess {String}   message.address 社區地址
 * @apiSuccess {String}   message.createTime 社區建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.sn 社區序號
 * @apiSuccess {String}   message.photo 社區圖片 URL
 * @apiSuccess {Object}   message.createUser  社區建立人
 * @apiSuccess {String}   message.createUser.id  建立人 ID
 * @apiSuccess {String}   message.createUser.email  建立人 Email
 * @apiSuccess {String}   message.createUser.name  建立人暱稱
 * @apiSuccess {String}   message.createUser.photo  建立人大頭貼 URL
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "id": "WIOmgnw9Og37fk73",
    "address": "community 712 address",
    "createTime": 1496991275991,
    "createUser": {
      "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
      "email": "root@cpig.com",
      "name": "system_admin",
      "photo": ""
    },
    "name": "community 712",
    "photo": "",
    "sn": "016993"
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */

//  [PUT]     /communities/:communityId
/**
 * @api {put} /communities/:communityId Modify data of the community
 * @apiName ModifyCommunity
 * @apiGroup Communities
 *
 * @apiParam {String} communityId 社區 ID
 * @apiParam (Request body) {String} [name]    社區名稱
 * @apiParam (Request body) {String} [address] 社區位址
 * 
 * @apiParamExample {json} Request-Example:
{
  "name": "community 123"
}
 *
 * @apiSuccess {Boolean}  success             API 執行成功與否
 * @apiSuccess {Object}   message             執行結果
 * @apiSuccess {String}   message.id 社區 ID
 * @apiSuccess {String}   message.name 社區名稱
 * @apiSuccess {String}   message.address 社區地址
 * @apiSuccess {String}   message.createTime 社區建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.sn 社區序號
 * @apiSuccess {String}   message.photo 社區圖片 URL
 * @apiSuccess {Object}   message.createUser  社區建立人
 * @apiSuccess {String}   message.createUser.id  建立人 ID
 * @apiSuccess {String}   message.createUser.email  建立人 Email
 * @apiSuccess {String}   message.createUser.name  建立人暱稱
 * @apiSuccess {String}   message.createUser.photo  建立人大頭貼 URL
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "id": "WIOmgnw9Og37fk73",
    "address": "community 712 address",
    "createTime": 1496991275991,
    "createUser": {
      "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
      "email": "root@cpig.com",
      "name": "system_admin",
      "photo": ""
    },
    "name": "community 123",
    "photo": "",
    "sn": "016993"
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */

//  [DELETE]  /communities/:communityId
/**
 * @api {delete} /communities/:communityId Delete the community
 * @apiName DeleteCommunity
 * @apiGroup Communities
 *
 * @apiParam {String} communityId 社區 ID
 * 
 * @apiSuccess {Boolean}  success                     API 執行成功與否
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true
}
 *
 * @apiUse Header
 * @apiUse Error
 */

//  [POST]    /user/communitySn/verify
/**
 * @api {post} /user/communitySn/verify Verify serial number of the community
 * @apiName VerifyCommunitySN
 * @apiGroup Communities
 *
 * @apiParam (Request body) {String} sn 社區 serial number
 * @apiParamExample {json} Request-Example:
{
  "sn": "123456"
}
 *
 * @apiSuccess {Boolean}  success             API 執行成功與否
 * @apiSuccess {Object}   message             執行結果
 * @apiSuccess {String}   message.id 社區 ID
 * @apiSuccess {String}   message.name 社區名稱
 * @apiSuccess {String}   message.address 社區地址
 * @apiSuccess {String}   message.createTime 社區建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.sn 社區序號
 * @apiSuccess {String}   message.photo 社區圖片 URL
 * @apiSuccess {Object}   message.createUser  社區建立人
 * @apiSuccess {String}   message.createUser.id  建立人 ID
 * @apiSuccess {String}   message.createUser.email  建立人 Email
 * @apiSuccess {String}   message.createUser.name  建立人暱稱
 * @apiSuccess {String}   message.createUser.photo  建立人大頭貼 URL
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "id": "WIOmgnw9Og37fk73",
    "address": "community 712 address",
    "createTime": 1496991275991,
    "createUser": {
      "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
      "email": "root@cpig.com",
      "name": "system_admin",
      "photo": ""
    },
    "name": "community 123",
    "photo": "",
    "sn": "016993"
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */
 
//  [GET]     /communitiesDetail
/**
 * @api {get} /communitiesDetail Read data of communities detail
 * @apiName GetCommunitiesDetail
 * @apiGroup Communities
 *
 * @apiParam (Query string) {Boolean} [all] if true, 取得所有社區資料. if false, 取得使用者的社區資料.
 *
 * @apiSuccess {Boolean}  success             API 執行成功與否
 * @apiSuccess {Object[]}   message             執行結果
 * @apiSuccess {String}   message.id 社區 ID
 * @apiSuccess {String}   message.name 社區名稱
 * @apiSuccess {String}   message.address 社區地址
 * @apiSuccess {String}   message.createTime 社區建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.sn 社區序號
 * @apiSuccess {String}   message.photo 社區圖片 URL
 * @apiSuccess {Object}   message.createUser  社區建立人
 * @apiSuccess {String}   message.createUser.id  建立人 ID
 * @apiSuccess {String}   message.createUser.email  建立人 Email
 * @apiSuccess {String}   message.createUser.name  建立人暱稱
 * @apiSuccess {String}   message.createUser.photo  建立人大頭貼 URL
 * @apiSuccess {Object[]} message.COMMUNITY_ADMIN  社區管理員
 * @apiSuccess {String}   message.COMMUNITY_ADMIN.id  社區管理員 ID
 * @apiSuccess {String}   message.COMMUNITY_ADMIN.email  社區管理員 Email
 * @apiSuccess {String}   message.COMMUNITY_ADMIN.name  社區管理員暱稱
 * @apiSuccess {String}   message.COMMUNITY_ADMIN.photo  社區管理員大頭貼 URL
 * @apiSuccess {Object[]} message.GUARD  物業保全
 * @apiSuccess {String}   message.GUARD.id  物業保全 ID
 * @apiSuccess {String}   message.GUARD.email  物業保全 Email
 * @apiSuccess {String}   message.GUARD.name  物業保全暱稱
 * @apiSuccess {String}   message.GUARD.photo  物業保全大頭貼 URL
 * 
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": [
    {
      "id": "WIOmgnw9Og37fk73",
      "address": "community 712 address",
      "createTime": 1496991275991,
      "createUser": {
        "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
        "email": "root@cpig.com",
        "name": "system_admin",
        "photo": ""
      },
      "name": "community 712",
      "photo": "",
      "sn": "016993",
      "COMMUNITY_ADMIN": [
        {
          "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
          "email": "root@cpig.com",
          "name": "system_admin",
          "photo": ""
        }
      ],
      "GUARD": []
    }
  ]
}
 *
 * @apiUse Header
 * @apiUse Error
 */
 
//  [GET]     /communitiesDetail/:communityId
/**
 * @api {get} /communitiesDetail/:communityId Read data of the community detail
 * @apiName GetCommunityDetail
 * @apiGroup Communities
 *
 * @apiParam {String} communityId 社區 ID
 *
 * @apiSuccess {Boolean}  success             API 執行成功與否
 * @apiSuccess {Object}   message             執行結果
 * @apiSuccess {String}   message.id 社區 ID
 * @apiSuccess {String}   message.name 社區名稱
 * @apiSuccess {String}   message.address 社區地址
 * @apiSuccess {String}   message.createTime 社區建立時間 (time since the Unix epoch, in milliseconds)
 * @apiSuccess {String}   message.sn 社區序號
 * @apiSuccess {String}   message.photo 社區圖片 URL
 * @apiSuccess {Object}   message.createUser  社區建立人
 * @apiSuccess {String}   message.createUser.id  建立人 ID
 * @apiSuccess {String}   message.createUser.email  建立人 Email
 * @apiSuccess {String}   message.createUser.name  建立人暱稱
 * @apiSuccess {String}   message.createUser.photo  建立人大頭貼 URL
 * @apiSuccess {Object[]} message.COMMUNITY_ADMIN  社區管理員
 * @apiSuccess {String}   message.COMMUNITY_ADMIN.id  社區管理員 ID
 * @apiSuccess {String}   message.COMMUNITY_ADMIN.email  社區管理員 Email
 * @apiSuccess {String}   message.COMMUNITY_ADMIN.name  社區管理員暱稱
 * @apiSuccess {String}   message.COMMUNITY_ADMIN.photo  社區管理員大頭貼 URL
 * @apiSuccess {Object[]} message.GUARD  物業保全
 * @apiSuccess {String}   message.GUARD.id  物業保全 ID
 * @apiSuccess {String}   message.GUARD.email  物業保全 Email
 * @apiSuccess {String}   message.GUARD.name  物業保全暱稱
 * @apiSuccess {String}   message.GUARD.photo  物業保全大頭貼 URL
 * 
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
{
  "success": true,
  "message": {
    "id": "WIOmgnw9Og37fk73",
    "address": "community 712 address",
    "createTime": 1496991275991,
    "createUser": {
      "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
      "email": "root@cpig.com",
      "name": "system_admin",
      "photo": ""
    },
    "name": "community 712",
    "photo": "",
    "sn": "016993",
    "COMMUNITY_ADMIN": [
      {
        "id": "HOeBzcVmwyPTL3Kdl6abfQwIbx82",
        "email": "root@cpig.com",
        "name": "system_admin",
        "photo": ""
      }
    ],
    "GUARD": []
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */
 