'use strict';
const { stub, assert } = require('sinon');
const { expect } = require('chai');
const mock = require('mock-require');

const fixture = {
    userDb: {
        getUser: () => {},
        saveUser: () => {},
        getUsers: () => {}
    }
};

mock('../../src/databases/user.db', fixture.userDb)

const SUT = require('../../src/services/user.service');

describe('user service', () => {
  describe('getUsersNaames', () => {
    it('should return array of users names', async () => {
        const getUsersStub = stub(fixture.userDb, 'getUsers').returns(['UserA', 'UserB']);
        const res = await SUT.getUsersNames();
        assert.calledOnce(fixture.userDb.getUsers);
        expect(res).to.be.an('array');
        expect(res.length).to.be.equal(2);
    });
  });
});