'use strict';
const { stub, assert } = require('sinon');
const { expect } = require('chai');
const mock = require('mock-require');

class ExpectedError extends Error{}
class UnexpectedError extends Error{}

const fixture = {
  req: {},
  res: {},
  fakeService: {
    test1: () => {}
  }
};
mock('../../../src/feature/services/test.service', fixture.fakeService);
const controller = require('../../../src/feature/controllers/test.controller');

describe('test controller', () => {

  beforeEach(() => {
    const { req, res, fakeService } = fixture;
    fakeService.test1 = () => {};
    Object.assign(req, {
      method: 'GET',
      url: '/test1'
    });
    Object.assign(res, {
      status: stub().returns(res),
      json: stub().returns(res),
      send: stub().returns(res)
    });
  
  });

  describe('when service retuns data', () => {
    it('will return 200 and data', async () => {
      const { req, res, fakeService } = fixture;
      stub(fakeService, 'test1').returns(Promise.resolve('data'));
      await controller.test1(req, res);

      assert.calledWith(res.status, 200);
      assert.calledWith(res.json, 'data');
    });
  });

  describe('when service throws an error', () => {
    it('will return 200 and data', async () => {
      const { req, res, fakeService } = fixture;
      stub(fakeService, 'test1').throws(new ExpectedError());
      try {
        await controller.test1(req, res);
        throw new UnexpectedError();
      } catch (err) {
        expect(err).to.be.instanceOf(ExpectedError);
      }
    });
  });

  describe('when service throws expected error', () => {
    it('will return 400 and error message', async () => {
      const { req, res, fakeService } = fixture;
      stub(fakeService, 'test1').throws(new ExpectedError('expected'));
      await controller.test1(req, res);

      assert.calledWith(res.status, 400);
      assert.calledWith(res.send, 'expected');
    });
  });
  
});
