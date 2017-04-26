const faker = require('faker');
const chai = require('chai');
const expect = chai.expect;
const admin = require('firebase-admin');
const test = require('./community');

const systemAdminUid = "HOeBzcVmwyPTL3Kdl6abfQwIbx82";
const user1Uid = "6guc1Vmi9KfMJ5SgHkMs7sm6hE32";
const user2Uid = "BcGGCNDFYCVOnS7dIqKMZlDMC212";

describe('Community Requisitions', () => {
  var requisitions = {sysAdmin:'', user1:'', user2:''};
  after(() => {
    admin.database().ref('CommunityRequisitions').child(requisitions.sysAdmin).remove();
    admin.database().ref('CommunityRequisitions').child(requisitions.user1).remove();
    admin.database().ref('CommunityRequisitions').child(requisitions.user2).remove();
  }); 
  
  /*
    URL : /requisitions/community/
  */
  
  it('[POST] /requisitions/community/', () => {
    const name = faker.random.words();
    const address = `${faker.address.country()} ${faker.address.city()} ${faker.address.streetName()}`;
    const newReqData = {name:name, address:address};
    return test.post_CommunityRequisition(systemAdminUid, null)
      .then(res => {
        expect(res.status).to.equal(400)
        return test.post_CommunityRequisition(systemAdminUid, {})
      })
      .then(res => {
        expect(res.status).to.equal(400)
        return test.post_CommunityRequisition(systemAdminUid, {strangeStr:'xxx'})
      })
      .then(res => {
        expect(res.status).to.equal(400)
        return test.post_CommunityRequisition(systemAdminUid, {name:'xxx'})
      })
      .then(res => {
        expect(res.status).to.equal(400)
        return test.post_CommunityRequisition(systemAdminUid, newReqData)
      })
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.ownProperty('success');
        expect(res.body).to.have.ownProperty('message');
        expect(res.body.success).to.be.true;
        expect(res.body.message).to.have.ownProperty('communityReqId');
        requisitions.sysAdmin = res.body.message.communityReqId;
        return test.post_CommunityRequisition(user1Uid, newReqData)
      })
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.ownProperty('success');
        expect(res.body).to.have.ownProperty('message');
        expect(res.body.success).to.be.true;
        expect(res.body.message).to.have.ownProperty('communityReqId');
        requisitions.user1 = res.body.message.communityReqId;
        return test.post_CommunityRequisition(user2Uid, newReqData)
      })
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.ownProperty('success');
        expect(res.body).to.have.ownProperty('message');
        expect(res.body.success).to.be.true;
        expect(res.body.message).to.have.ownProperty('communityReqId');
        requisitions.user2 = res.body.message.communityReqId;
      });
  }) // end 新增社區申請單
  
  it('[GET] /requisitions/community/', () => {
    return test.read_CommunityRequisitions(systemAdminUid, true)
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.ownProperty('success');
        expect(res.body).to.have.ownProperty('message');
        expect(res.body.success).to.be.true;
        expect(Object.keys(res.body.message)).to.have.lengthOf(3);
        return test.read_CommunityRequisitions(systemAdminUid, false)
      })
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.ownProperty('success');
        expect(res.body).to.have.ownProperty('message');
        expect(res.body.success).to.be.true;
        expect(Object.keys(res.body.message)).to.have.lengthOf(1);
        expect(res.body.message).to.have.ownProperty(requisitions.sysAdmin);
        return test.read_CommunityRequisitions(user1Uid, true)
      })
      .then(res => {
        expect(res.status).to.equal(403)
        return test.read_CommunityRequisitions(user2Uid, true)
      })
      .then(res => {
        expect(res.status).to.equal(403)
        return test.read_CommunityRequisitions(user1Uid, false)
      })
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.ownProperty('success');
        expect(res.body).to.have.ownProperty('message');
        expect(res.body.success).to.be.true;
        expect(Object.keys(res.body.message)).to.have.lengthOf(1);
        expect(res.body.message).to.have.ownProperty(requisitions.user1);
        return test.read_CommunityRequisitions(user2Uid, false)
      })
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.ownProperty('success');
        expect(res.body).to.have.ownProperty('message');
        expect(res.body.success).to.be.true;
        expect(Object.keys(res.body.message)).to.have.lengthOf(1);
        expect(res.body.message).to.have.ownProperty(requisitions.user2);
      })
  }) 

  it('[PUT] /requisitions/community/', () => {
    return test.put_CommunityRequisitions(systemAdminUid)
    .then(res => {
      expect(res.status).to.equal(405)
    })
  })
  
  it('[DELETE] /requisitions/community/', () => {
    return test.delete_CommunityRequisitions(systemAdminUid)
    .then(res => {
      expect(res.status).to.equal(405)
    })
  })
  
  /*
    URL : /requisitions/community/:communityReqId
  */
  
  it('[POST] /requisitions/community/:communityReqId', () => {
    return test.post_aCommunityRequisition(systemAdminUid, requisitions.sysAdmin)
    .then(res => {
      expect(res.status).to.equal(405)
    })
  })
  
  it('[GET] /requisitions/community/:communityReqId', () => {
    return test.get_aCommunityRequisition(systemAdminUid, requisitions.sysAdmin)
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.ownProperty('success');
        expect(res.body).to.have.ownProperty('message');
        expect(res.body.success).to.be.true;
        expect(Object.keys(res.body.message)).to.have.lengthOf(1);
        expect(res.body.message).to.have.ownProperty(requisitions.sysAdmin);
        return test.get_aCommunityRequisition(systemAdminUid, requisitions.user1)
      })
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.ownProperty('success');
        expect(res.body).to.have.ownProperty('message');
        expect(res.body.success).to.be.true;
        expect(Object.keys(res.body.message)).to.have.lengthOf(1);
        expect(res.body.message).to.have.ownProperty(requisitions.user1);
        return test.get_aCommunityRequisition(user1Uid, requisitions.user1)
      })
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.ownProperty('success');
        expect(res.body).to.have.ownProperty('message');
        expect(res.body.success).to.be.true;
        expect(Object.keys(res.body.message)).to.have.lengthOf(1);
        expect(res.body.message).to.have.ownProperty(requisitions.user1);
        return test.get_aCommunityRequisition(user1Uid, requisitions.user2)
      })
      .then(res => {
        expect(res.status).to.equal(403)
        return test.get_aCommunityRequisition(user2Uid, requisitions.user2)
      })
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.ownProperty('success');
        expect(res.body).to.have.ownProperty('message');
        expect(res.body.success).to.be.true;
        expect(Object.keys(res.body.message)).to.have.lengthOf(1);
        expect(res.body.message).to.have.ownProperty(requisitions.user2);
        return test.get_aCommunityRequisition(user2Uid, requisitions.sysAdmin)
      })
      .then(res => {
        expect(res.status).to.equal(403)
      })
  })
  
  it('[PUT] /requisitions/community/:communityReqId', () => {
    return test.put_aCommunityRequisition(systemAdminUid, requisitions.sysAdmin, null)
      .then(res => {
        expect(res.status).to.equal(400)
        return test.put_aCommunityRequisition(systemAdminUid, requisitions.sysAdmin, {name:'aaa'})
      })
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.ownProperty('success');
        expect(res.body).to.have.ownProperty('message');
        expect(res.body.success).to.be.true;
        expect(res.body.message).to.have.ownProperty(requisitions.sysAdmin);
        expect(res.body.message[requisitions.sysAdmin]['name']).to.equal('aaa');
        return test.put_aCommunityRequisition(systemAdminUid, requisitions.user1, {name:'aaa'})
      })
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.ownProperty('success');
        expect(res.body).to.have.ownProperty('message');
        expect(res.body.success).to.be.true;
        expect(res.body.message).to.have.ownProperty(requisitions.user1);
        expect(res.body.message[requisitions.user1]['name']).to.equal('aaa');
        return test.put_aCommunityRequisition(user1Uid, requisitions.user1, {name:'bbb'})
      })
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.ownProperty('success');
        expect(res.body).to.have.ownProperty('message');
        expect(res.body.success).to.be.true;
        expect(res.body.message).to.have.ownProperty(requisitions.user1);
        expect(res.body.message[requisitions.user1]['name']).to.equal('bbb');
        return test.put_aCommunityRequisition(user1Uid, requisitions.user2, {name:'bbb'})
      })
      .then(res => {
        expect(res.status).to.equal(403)
      })
  })
  
  it('[DELETE] /requisitions/community/:communityReqId', () => {
    return test.delete_aCommunityRequisition(systemAdminUid, requisitions.user1)
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.ownProperty('success');
        expect(res.body.success).to.be.true;
        return test.delete_aCommunityRequisition(user1Uid, requisitions.sysAdmin)
      })
      .then(res => {
        expect(res.status).to.equal(403)
        return test.delete_aCommunityRequisition(user2Uid, requisitions.user1)
      })
      .then(res => {
        expect(res.status).to.equal(404)
        return test.delete_aCommunityRequisition(user2Uid, requisitions.sysAdmin)
      })
      .then(res => {
        expect(res.status).to.equal(403)
        return test.delete_aCommunityRequisition(user2Uid, requisitions.user2)
      })
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.ownProperty('success');
        expect(res.body.success).to.be.true;
      })
  })
  
  /*
    URL : /requisitions/community/:communityReqId/verify
  */
  
  it('[GET] /requisitions/community/:communityReqId/verify', () => {
    return test.get_verifyCommunityRequisition(systemAdminUid, requisitions.sysAdmin)
      .then(res => {
        expect(res.status).to.equal(405)
      })
  })
  
  it('[PUT] /requisitions/community/:communityReqId/verify', () => {
    return test.put_verifyCommunityRequisition(systemAdminUid, requisitions.sysAdmin)
      .then(res => {
        expect(res.status).to.equal(405)
      })
  })
  
  it('[DELETE] /requisitions/community/:communityReqId/verify', () => {
    return test.delete_verifyCommunityRequisition(systemAdminUid, requisitions.sysAdmin)
      .then(res => {
        expect(res.status).to.equal(405)
      })
  })
  
  it('[POST] /requisitions/community/:communityReqId/verify', () => {
    return test.post_verifyCommunityRequisition(systemAdminUid, requisitions.sysAdmin)
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.ownProperty('success');
        expect(res.body).to.have.ownProperty('message');
        expect(res.body.success).to.be.true;
        expect(res.body.message).to.have.ownProperty('communityId');
      })
  })
});