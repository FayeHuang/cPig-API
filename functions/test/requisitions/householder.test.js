const faker = require('faker');
const chai = require('chai');
const expect = chai.expect;
const admin = require('firebase-admin');
const test = require('./householder');

const systemAdminUid = "HOeBzcVmwyPTL3Kdl6abfQwIbx82";
const user1Uid = "6guc1Vmi9KfMJ5SgHkMs7sm6hE32";
const user2Uid = "BcGGCNDFYCVOnS7dIqKMZlDMC212";

const communityId = "BHQhM0iTM9BgqdTq";

describe('Householder Requisitions', () => {
  var requisitions = {sysAdmin:'', user1:'', user2:''};
  after(() => {
    admin.database().ref('HouseholderRequisitions').child(requisitions.sysAdmin).remove();
    admin.database().ref('HouseholderRequisitions').child(requisitions.user1).remove();
    admin.database().ref('HouseholderRequisitions').child(requisitions.user2).remove();
  });
  
  /*
    URL : /requisitions/householder/
  */
  
  it('[POST] /requisitions/householder/', () => {
    const number = faker.random.number();
    const floor = faker.random.number();
    const newReqData = {number:number, floor:floor, communityId:communityId};
    return test.post_HouseholderRequisition(systemAdminUid, null)
      .then(res => {
        expect(res.status).to.equal(400)
        return test.post_HouseholderRequisition(systemAdminUid, {})
      })
      .then(res => {
        expect(res.status).to.equal(400)
        return test.post_HouseholderRequisition(systemAdminUid, {number:number, floor:floor, communityId:'xxx'})
      })
      .then(res => {
        expect(res.status).to.equal(400)
        return test.post_HouseholderRequisition(systemAdminUid, {floor:'xxx'})
      })
      .then(res => {
        expect(res.status).to.equal(400)
        return test.post_HouseholderRequisition(systemAdminUid, newReqData)
      })
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.ownProperty('success');
        expect(res.body).to.have.ownProperty('message');
        expect(res.body.success).to.be.true;
        expect(res.body.message).to.have.ownProperty('householderReqId');
        requisitions.sysAdmin = res.body.message.householderReqId;
        return test.post_HouseholderRequisition(user1Uid, newReqData)
      })
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.ownProperty('success');
        expect(res.body).to.have.ownProperty('message');
        expect(res.body.success).to.be.true;
        expect(res.body.message).to.have.ownProperty('householderReqId');
        requisitions.user1 = res.body.message.householderReqId;
        return test.post_HouseholderRequisition(user2Uid, newReqData)
      })
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.ownProperty('success');
        expect(res.body).to.have.ownProperty('message');
        expect(res.body.success).to.be.true;
        expect(res.body.message).to.have.ownProperty('householderReqId');
        requisitions.user2 = res.body.message.householderReqId;
      });
  }) // end 新增社區申請單
  
  it('[GET] /requisitions/householder/', () => {
    return test.read_HouseholderRequisitions(systemAdminUid, true)
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.ownProperty('success');
        expect(res.body).to.have.ownProperty('message');
        expect(res.body.success).to.be.true;
        expect(Object.keys(res.body.message)).to.have.lengthOf(3);
        return test.read_HouseholderRequisitions(systemAdminUid, false)
      })
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.ownProperty('success');
        expect(res.body).to.have.ownProperty('message');
        expect(res.body.success).to.be.true;
        expect(Object.keys(res.body.message)).to.have.lengthOf(1);
        expect(res.body.message).to.have.ownProperty(requisitions.sysAdmin);
        return test.read_HouseholderRequisitions(user1Uid, true)
      })
      .then(res => {
        expect(res.status).to.equal(403)
        return test.read_HouseholderRequisitions(user2Uid, true)
      })
      .then(res => {
        expect(res.status).to.equal(403)
        return test.read_HouseholderRequisitions(user1Uid, false)
      })
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.ownProperty('success');
        expect(res.body).to.have.ownProperty('message');
        expect(res.body.success).to.be.true;
        expect(Object.keys(res.body.message)).to.have.lengthOf(1);
        expect(res.body.message).to.have.ownProperty(requisitions.user1);
        return test.read_HouseholderRequisitions(user2Uid, false)
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

  it('[PUT] /requisitions/householder/', () => {
    return test.put_HouseholderRequisitions(systemAdminUid)
    .then(res => {
      expect(res.status).to.equal(405)
    })
  })
  
  it('[DELETE] /requisitions/householder/', () => {
    return test.delete_HouseholderRequisitions(systemAdminUid)
    .then(res => {
      expect(res.status).to.equal(405)
    })
  })
  
  /*
    URL : /requisitions/householder/:householderReqId
  */
  
  it('[POST] /requisitions/householder/:householderReqId', () => {
    return test.post_aHouseholderRequisition(systemAdminUid, requisitions.sysAdmin)
    .then(res => {
      expect(res.status).to.equal(405)
    })
  })
  
  it('[GET] /requisitions/householder/:householderReqId', () => {
    return test.get_aHouseholderRequisition(systemAdminUid, requisitions.sysAdmin)
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.ownProperty('success');
        expect(res.body).to.have.ownProperty('message');
        expect(res.body.success).to.be.true;
        expect(Object.keys(res.body.message)).to.have.lengthOf(1);
        expect(res.body.message).to.have.ownProperty(requisitions.sysAdmin);
        return test.get_aHouseholderRequisition(systemAdminUid, requisitions.user1)
      })
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.ownProperty('success');
        expect(res.body).to.have.ownProperty('message');
        expect(res.body.success).to.be.true;
        expect(Object.keys(res.body.message)).to.have.lengthOf(1);
        expect(res.body.message).to.have.ownProperty(requisitions.user1);
        return test.get_aHouseholderRequisition(user1Uid, requisitions.user1)
      })
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.ownProperty('success');
        expect(res.body).to.have.ownProperty('message');
        expect(res.body.success).to.be.true;
        expect(Object.keys(res.body.message)).to.have.lengthOf(1);
        expect(res.body.message).to.have.ownProperty(requisitions.user1);
        return test.get_aHouseholderRequisition(user1Uid, requisitions.user2)
      })
      .then(res => {
        expect(res.status).to.equal(403)
        return test.get_aHouseholderRequisition(user2Uid, requisitions.user2)
      })
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.ownProperty('success');
        expect(res.body).to.have.ownProperty('message');
        expect(res.body.success).to.be.true;
        expect(Object.keys(res.body.message)).to.have.lengthOf(1);
        expect(res.body.message).to.have.ownProperty(requisitions.user2);
        return test.get_aHouseholderRequisition(user2Uid, requisitions.sysAdmin)
      })
      .then(res => {
        expect(res.status).to.equal(403)
      })
  })
  
  it('[PUT] /requisitions/householder/:householderReqId', () => {
    return test.put_aHouseholderRequisition(systemAdminUid, requisitions.sysAdmin, null)
      .then(res => {
        expect(res.status).to.equal(405)
      })
  })
  
  it('[DELETE] /requisitions/householder/:householderReqId', () => {
    return test.delete_aHouseholderRequisition(systemAdminUid, requisitions.user1)
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.ownProperty('success');
        expect(res.body.success).to.be.true;
        return test.delete_aHouseholderRequisition(user1Uid, requisitions.sysAdmin)
      })
      .then(res => {
        expect(res.status).to.equal(403)
        return test.delete_aHouseholderRequisition(user2Uid, requisitions.user1)
      })
      .then(res => {
        expect(res.status).to.equal(404)
        return test.delete_aHouseholderRequisition(user2Uid, requisitions.sysAdmin)
      })
      .then(res => {
        expect(res.status).to.equal(403)
        return test.delete_aHouseholderRequisition(user2Uid, requisitions.user2)
      })
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.ownProperty('success');
        expect(res.body.success).to.be.true;
      })
  })
  
  /*
    URL : /requisitions/householder/:householderReqId/verify
  */
  
  it('[GET] /requisitions/householder/:householderReqId/verify', () => {
    return test.get_verifyHouseholderRequisition(systemAdminUid, requisitions.sysAdmin)
      .then(res => {
        expect(res.status).to.equal(405)
      })
  })
  
  it('[PUT] /requisitions/householder/:householderReqId/verify', () => {
    return test.put_verifyHouseholderRequisition(systemAdminUid, requisitions.sysAdmin)
      .then(res => {
        expect(res.status).to.equal(405)
      })
  })
  
  it('[DELETE] /requisitions/householder/:householderReqId/verify', () => {
    return test.delete_verifyHouseholderRequisition(systemAdminUid, requisitions.sysAdmin)
      .then(res => {
        expect(res.status).to.equal(405)
      })
  })
  
  it('[POST] /requisitions/householder/:householderReqId/verify', () => {
    return test.post_verifyHouseholderRequisition(systemAdminUid, requisitions.sysAdmin)
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.ownProperty('success');
        expect(res.body).to.have.ownProperty('message');
        expect(res.body.success).to.be.true;
        expect(res.body.message).to.have.ownProperty('householderId');
      })
  })
});