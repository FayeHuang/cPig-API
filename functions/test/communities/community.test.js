const faker = require('faker');
const chai = require('chai');
const expect = chai.expect;
const admin = require('firebase-admin');
const test = require('./community');

const systemAdminUid = "HOeBzcVmwyPTL3Kdl6abfQwIbx82";
const user1Uid = "6guc1Vmi9KfMJ5SgHkMs7sm6hE32";
const user2Uid = "BcGGCNDFYCVOnS7dIqKMZlDMC212";

const communityId1 = "BHQhM0iTM9BgqdTq";
const communityId2 = "5SN7YymvwdqAW9rP";

describe('Communities', () => {
  
  /*
    URL : /communities/
  */
  
  it('[POST] /communities/', () => {
    return test.post_Communities(systemAdminUid, null)
      .then(res => {
        expect(res.status).to.equal(405)
      })
  })
  
  it('[GET] /communities/', () => {
    return test.read_Communities(systemAdminUid, true)
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.ownProperty('success');
        expect(res.body).to.have.ownProperty('message');
        expect(res.body.success).to.be.true;
        expect(Object.keys(res.body.message).length).to.be.at.least(1);
        return test.read_Communities(systemAdminUid, false)
      })
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.ownProperty('success');
        expect(res.body).to.have.ownProperty('message');
        expect(res.body.success).to.be.true;
        expect(Object.keys(res.body.message).length).to.be.at.least(1);
        return test.read_Communities(user1Uid, true)
      })
      .then(res => {
        expect(res.status).to.equal(403)
        return test.read_Communities(user2Uid, true)
      })
      .then(res => {
        expect(res.status).to.equal(403)
        return test.read_Communities(user1Uid, false)
      })
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.ownProperty('success');
        expect(res.body).to.have.ownProperty('message');
        expect(res.body.success).to.be.true;
        expect(Object.keys(res.body.message).length).to.equal(0);
        return test.read_Communities(user2Uid, false)
      })
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.ownProperty('success');
        expect(res.body).to.have.ownProperty('message');
        expect(res.body.success).to.be.true;
        expect(Object.keys(res.body.message).length).to.equal(0);
      })
  }) 

  it('[PUT] /communities/', () => {
    return test.put_Communities(systemAdminUid)
    .then(res => {
      expect(res.status).to.equal(405)
    })
  })
  
  it('[DELETE] /communities/', () => {
    return test.delete_Communities(systemAdminUid)
    .then(res => {
      expect(res.status).to.equal(405)
    })
  })
  
  /*
    URL : /communities/:communityId/
  */
  
  it('[POST] /communities/:communityId/', () => {
    return test.post_aCommunity(systemAdminUid, communityId1)
    .then(res => {
      expect(res.status).to.equal(405)
    })
  })
  
  it('[GET] /communities/:communityId/', () => {
    return test.get_aCommunity(systemAdminUid, communityId1)
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.ownProperty('success');
        expect(res.body).to.have.ownProperty('message');
        expect(res.body.success).to.be.true;
        expect(Object.keys(res.body.message)).to.have.lengthOf(1);
        expect(res.body.message).to.have.ownProperty(communityId1);
        return test.get_aCommunity(systemAdminUid, communityId2)
      })
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.ownProperty('success');
        expect(res.body).to.have.ownProperty('message');
        expect(res.body.success).to.be.true;
        expect(Object.keys(res.body.message)).to.have.lengthOf(1);
        expect(res.body.message).to.have.ownProperty(communityId2);
        return test.get_aCommunity(user1Uid, communityId1)
      })
      .then(res => {
        expect(res.status).to.equal(403)
        return test.get_aCommunity(user2Uid, communityId1)
      })
      .then(res => {
        expect(res.status).to.equal(403)
        return test.get_aCommunity(user2Uid, 'wrongCommunityId')
      })
      .then(res => {
        expect(res.status).to.equal(404)
      })
  })
  
  it('[PUT] /communities/:communityId/', () => {
    return test.put_aCommunity(systemAdminUid, communityId1, null)
      .then(res => {
        expect(res.status).to.equal(400)
        return test.put_aCommunity(systemAdminUid, communityId1, {name:'aaa'})
      })
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.ownProperty('success');
        expect(res.body).to.have.ownProperty('message');
        expect(res.body.success).to.be.true;
        expect(res.body.message).to.have.ownProperty(communityId1);
        expect(res.body.message[communityId1]['name']).to.equal('aaa');
        return test.put_aCommunity(systemAdminUid, communityId2, {name:'bbb'})
      })
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.ownProperty('success');
        expect(res.body).to.have.ownProperty('message');
        expect(res.body.success).to.be.true;
        expect(res.body.message).to.have.ownProperty(communityId2);
        expect(res.body.message[communityId2]['name']).to.equal('bbb');
        return test.put_aCommunity(user1Uid, communityId2, {name:'ccc'})
      })
      .then(res => {
        expect(res.status).to.equal(403)
        return test.put_aCommunity(user2Uid, communityId2, {name:'ddd'})
      })
      .then(res => {
        expect(res.status).to.equal(403)
      })
  })
  
  it('[DELETE] /communities/:communityId/', () => {
    return test.delete_aCommunity(systemAdminUid, communityId1)
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.ownProperty('success');
        expect(res.body.success).to.be.true;
        return test.delete_aCommunity(systemAdminUid, communityId1)
      })
      .then(res => {
        expect(res.status).to.equal(404)
        return test.delete_aCommunity(user1Uid, communityId2)
      })
      .then(res => {
        expect(res.status).to.equal(403)
        return test.delete_aCommunity(user2Uid, communityId2)
      })
      .then(res => {
        expect(res.status).to.equal(403)
      })
  })
});