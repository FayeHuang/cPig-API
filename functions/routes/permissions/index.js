const express = require('express');
const router = express.Router();
const http = require("../libs/http");
const admin = require('firebase-admin');
const verify = require("../libs/verify");
const merge = require('deepmerge');

/*
  URL : /permissions/
*/
router.route('/')
/**
 * @api {get} /permissions Read permissions of the current user
 * @apiName GetUserPermission
 * @apiGroup UserPermissions
 *
 * @apiSuccess {Boolean}  success                             API 執行成功與否
 * @apiSuccess {Object}   message                             執行結果
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 {
  "success": true,
  "message": {
    "Announcements": {
      "create": true,
      "other": {
        "delete": true,
        "read": true,
        "update": true
      },
      "own": {
        "delete": true,
        "read": true,
        "update": true
      }
    },
    "Communities": {
      "create": true,
      "other": {
        "delete": true,
        "read": true,
        "update": true
      },
      "own": {
        "delete": true,
        "read": true,
        "update": true
      }
    },
    "CommunityPermissions": {
      "COMMUNITY_ADMIN": {
        "create": true,
        "other": {
          "delete": true,
          "read": true,
          "update": true
        },
        "own": {
          "delete": true,
          "read": true,
          "update": true
        }
      },
      "GUARD": {
        "create": true,
        "other": {
          "delete": true,
          "read": true,
          "update": true
        },
        "own": {
          "delete": true,
          "read": true,
          "update": true
        }
      },
      "RESIDENT": {
        "create": true,
        "other": {
          "delete": true,
          "read": true,
          "update": true
        },
        "own": {
          "delete": true,
          "read": true,
          "update": true
        }
      },
      "RESIDENT_ADMIN": {
        "create": true,
        "other": {
          "delete": true,
          "read": true,
          "update": true
        },
        "own": {
          "delete": true,
          "read": true,
          "update": true
        }
      }
    },
    "CommunityRequisitions": {
      "create": true,
      "other": {
        "delete": true,
        "read": true,
        "update": true
      },
      "own": {
        "delete": true,
        "read": true,
        "update": true
      },
      "verify": true
    },
    "CommunitySNs": {
      "create": true,
      "other": {
        "delete": true,
        "read": true,
        "update": true
      },
      "own": {
        "delete": true,
        "read": true,
        "update": true
      }
    },
    "HouseholderPermissions": {
      "create": true,
      "other": {
        "delete": true,
        "read": true,
        "update": true
      },
      "own": {
        "delete": true,
        "read": true,
        "update": true
      }
    },
    "HouseholderRequisitions": {
      "create": true,
      "other": {
        "delete": true,
        "read": true,
        "update": true
      },
      "own": {
        "delete": true,
        "read": true,
        "update": true
      },
      "verify": true
    },
    "Householders": {
      "create": true,
      "other": {
        "delete": true,
        "read": true,
        "update": true
      },
      "own": {
        "delete": true,
        "read": true,
        "update": true
      }
    },
    "InviteMembers": {
      "COMMUNITY_ADMIN": {
        "accept": true,
        "create": true,
        "other": {
          "delete": true,
          "read": true,
          "update": true
        },
        "own": {
          "delete": true,
          "read": true,
          "update": true
        }
      },
      "GUARD": {
        "accept": true,
        "create": true,
        "other": {
          "delete": true,
          "read": true,
          "update": true
        },
        "own": {
          "delete": true,
          "read": true,
          "update": true
        }
      },
      "RESIDENT": {
        "accept": true,
        "create": true,
        "other": {
          "delete": true,
          "read": true,
          "update": true
        },
        "own": {
          "delete": true,
          "read": true,
          "update": true
        }
      },
      "RESIDENT_ADMIN": {
        "accept": true,
        "create": true,
        "other": {
          "delete": true,
          "read": true,
          "update": true
        },
        "own": {
          "delete": true,
          "read": true,
          "update": true
        }
      }
    },
    "MemberInviteCodes": {
      "COMMUNITY_ADMIN": {
        "create": true,
        "other": {
          "delete": true,
          "read": true,
          "update": true
        },
        "own": {
          "delete": true,
          "read": true,
          "update": true
        },
        "verify": true
      },
      "GUARD": {
        "create": true,
        "other": {
          "delete": true,
          "read": true,
          "update": true
        },
        "own": {
          "delete": true,
          "read": true,
          "update": true
        },
        "verify": true
      },
      "RESIDENT": {
        "create": true,
        "other": {
          "delete": true,
          "read": true,
          "update": true
        },
        "own": {
          "delete": true,
          "read": true,
          "update": true
        },
        "verify": true
      },
      "RESIDENT_ADMIN": {
        "create": true,
        "other": {
          "delete": true,
          "read": true,
          "update": true
        },
        "own": {
          "delete": true,
          "read": true,
          "update": true
        },
        "verify": true
      }
    },
    "Members": {
      "COMMUNITY_ADMIN": {
        "create": true,
        "other": {
          "delete": true,
          "read": true,
          "update": true
        },
        "own": {
          "delete": true,
          "read": true,
          "update": true
        }
      },
      "GUARD": {
        "create": true,
        "other": {
          "delete": true,
          "read": true,
          "update": true
        },
        "own": {
          "delete": true,
          "read": true,
          "update": true
        }
      },
      "RESIDENT": {
        "create": true,
        "other": {
          "delete": true,
          "read": true,
          "update": true
        },
        "own": {
          "delete": true,
          "read": true,
          "update": true
        }
      },
      "RESIDENT_ADMIN": {
        "create": true,
        "other": {
          "delete": true,
          "read": true,
          "update": true
        },
        "own": {
          "delete": true,
          "read": true,
          "update": true
        }
      }
    },
    "PackageReceiveCodes": {
      "create": true,
      "other": {
        "delete": true,
        "read": true,
        "update": true
      },
      "own": {
        "delete": true,
        "read": true,
        "update": true
      },
      "verify": true
    },
    "Packages": {
      "create": true,
      "other": {
        "delete": true,
        "read": true,
        "update": true
      },
      "own": {
        "delete": true,
        "read": true,
        "update": true
      }
    },
    "SystemAdmins": {
      "create": true,
      "other": {
        "delete": true,
        "read": true,
        "update": true
      },
      "own": {
        "delete": true,
        "read": true,
        "update": true
      }
    },
    "Users": {
      "create": true,
      "other": {
        "delete": true,
        "read": true,
        "update": true
      },
      "own": {
        "delete": true,
        "read": true,
        "update": true
      }
    }
  }
}
 *
 * @apiUse Header
 * @apiUse Error
 */
.get((req, res) => {
  res.json({success:true, message:req.user.permission});
})
.all((req, res) => {return http.methodNotAllowed(req, res)});


/*
  URL : /permissions/community/:communityId
*/
router.route('/community/:communityId')
.all((req, res, next) => {
  verify.communityExist(req, res, next);
})
/**
 * @api {get} /permissions/community/:communityId Read permissions of the current user in community
 * @apiName GetUserPermissionInCommunity
 * @apiGroup UserPermissions
 *
 * @apiParam {String} communityId 社區 ID 
 * 
 * @apiSuccess {Boolean}  success                             API 執行成功與否
 * @apiSuccess {Object}   message                             執行結果
 * @apiSuccess {Object}   message.role                        角色的權限
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 {
  "success": true,
  "message": {
    "COMMUNITY_ADMIN": {
      "Announcements": {
        "create": true,
        "other": {
          "delete": true,
          "read": true,
          "update": true
        },
        "own": {
          "delete": true,
          "read": true,
          "update": true
        }
      },
      "Communities": {
        "create": true,
        "other": {
          "delete": true,
          "read": true,
          "update": true
        },
        "own": {
          "delete": true,
          "read": true,
          "update": true
        }
      }
      ...
    }
  }
}
 * @apiUse Header
 * @apiUse Error
 */ 
.get((req, res) => {
  admin.database().ref(`UserRoles/${req.user.uid}/communities/${req.communityId}`).once('value')
  .then(snapshot => {
    if (!snapshot.val())
      return http.permissionDenied(req, res);
      
    var process = [];
    snapshot.forEach(childSnapshot => {
      const role = childSnapshot.key;
      
      process.push(
        admin.database().ref(`CommunityPermissions/${req.communityId}/${role}`).once('value')
        .then(snapshot => {
          var result = {};
          result[role] = merge.all( [req.user.permission, snapshot.val()] );
          return result;
        })
        .catch(error => {return http.internalServerError(req, res, error)})
      )
    })
    
    var result = {success:true, message:{}};
    if (process.length > 0) {
      Promise.all(process).then(data => {
        if (process.length === 1)
          result.message = data[0]
        else
          result.message = merge.all(data);
        return res.json(result);
      })
      .catch(error => {return http.internalServerError(req, res, error)})
    }
    else
      return res.json(result);
  })
  .catch(error => {return http.internalServerError(req, res, error)});
})
.all((req, res) => {return http.methodNotAllowed(req, res)});

/*
  URL : /permissions/householder/:householderId
*/

module.exports = router;