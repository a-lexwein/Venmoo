const { expect } = require('chai');
const server = require('./../server/index.js').app;
const db = require('./../database/index.js');
require('dotenv').config();

const supertest = require('supertest');
const request = supertest.agent(server);

import React from 'react'
import ReactDOM from 'react-dom'
import { configure, shallow, mount, render } from 'enzyme';
import ProfilePage from '../client/src/components/ProfilePage.jsx';
import Adapter from 'enzyme-adapter-react-16';
import SignUp from '../client/src/components/SignUp.jsx';

import { response } from './../database/dummy-data.js';

configure({ adapter: new Adapter() });

describe('Server', () => {
  describe('GET /user/:id', () => {
    xit('should return an object of user info when id is a user', function(done) {
      request
        .get('/user/1')
        .expect(200)
        .expect(/annie/, done);
    });

    xit('should 404 when given an invalid user id', function(done) {
      request
        .get('/user/999999')
        .expect(404, done);

      request
        .get('/user/abc')
        .expect(404, done);
    });
  });

  describe('login', () => {
    it('should 401 when given a nonexistent username', function(done) {
      request
        .post('/profilepage')
        .send({
          username: 'jsdfja;sd;f',
          password: '123',
        })
        .expect(401, done);
    });

    it('should 401 when given an incorrect password', function(done) {
      request
        .post('/profilepage')
        .send({
          username: 'annie',
          password: 'hfdifhds',
        })
        .expect(401, done);
    });

    it('should return 200 when a valid username and password is entered', function(done) {
      request
      .post('/profilepage')
      .send({
        username: 'annie',
        password: '123',
      })
      .expect(200, done);
    });

    it('should return an object with transactions and user objects', function (done) {
      request
      .post('/profilepage')
      .send({
        username: 'annie',
        password: '123',
      })
      .then((res) => {
        let data = JSON.parse(res.text);
        expect(data.hasOwnProperty('user')).to.equal(true);
        expect(data.user.name).to.equal('annie');
        expect(data.hasOwnProperty('transactions')).to.equal(true);
        done();
      })
      .catch(err => {
        expect(err).to.equal(undefined);
        console.error(err)
        done();
      });
    })
      
  });

  describe('POST /payments and /request', () => {
    it('should 201 when posting to /payment', function(done) {
    request
      .post('/payment')
      .send({
        senderObj: {id: 2},
        username: 'annie',
        amount: '20.00',
        isPayment: true,
      })
      .expect(201, done)
    });

    it('should 201 when posting to /request', function(done) {
    request
    .post('/request')
    .send({
      senderObj: {id: 2},
      username: 'annie',
      amount: '20.00',
      isPayment: false,
    })
    .expect(201, done)
  });

  })
});


describe('Client', function() {
  describe('react router login test', () => {
    it('should render profile page on login', () => {
      const component = shallow(<ProfilePage user={response.user}/>);
      expect(component.find('div').toExist);
    });
  });

  describe("react router signup test", () => {
    it("should render signup on login", () => {
      const component = shallow(<SignUp />);
      expect(component.find("div").toExist);
    });
  });
});

// tests for DB
describe('Database', function() {
  describe('getTransactionHistory', function() {
    it('should be a function', function() {
      expect(db.getTransactionHistory).to.be.a('function');
    });
    it('should return a promise', function() {
      let queryResult = db.getTransactionHistory('annie');
      expect(queryResult instanceof Promise).to.equal(true);
    });
    it('should resolve to an object', function() {
      return db.getTransactionHistory('annie').then((res) => {
        expect(res).to.be.an('object');
      });
    });
    it('should have amount, status, type, timestamp, and description data', function() {
      return db.getTransactionHistory('annie').then((res => {
        let dataEntry = res.rows[0];
        expect(dataEntry.hasOwnProperty('amount')).to.equal(true);
        expect(dataEntry.hasOwnProperty('status')).to.equal(true);
        expect(dataEntry.hasOwnProperty('type')).to.equal(true);
        expect(dataEntry.hasOwnProperty('created_timestamp')).to.equal(true);
        expect(dataEntry.hasOwnProperty('resolved_timestamp')).to.equal(true);
        expect(dataEntry.hasOwnProperty('description')).to.equal(true);
      }))
    })
  });
  describe('updateBalances', function() {
    it('should be a function', function() {
      expect(db.updateBalances).to.be.a('function');
    });

    it('should update balance', function() {
      db.getUserBalance('connie')
      .then((balance) => {
        let test = balance.rows[0].balance;

        return test;
      })
      .then((test, done) => {
        db.createTransaction(3, 4, '33.33', true)
          .then(() => {
            db.updateBalances()
              .then(() => {
                db.getUserBalance('connie')
                  .then((data) => {
                    test = test.slice(1).replace(/,/g, '');
                    var newBalance = (parseFloat(test) - 33.33).toFixed(2);
                    var newBalanceString = '$' + newBalance;
                    expect(parseFloat(data.rows[0].balance.slice(1).replace(/,/g, '')).toFixed(2)).to.equal(newBalance);
                    expect(done);
                  })
                  .catch((error) => { throw error; });
              })
              .catch((error) => { throw error; });
          })
          .catch((error) => { throw error; });

      })
      .catch((error) => { throw error; });
      })
  });
  describe('createTransaction', function() {
    it('should be a function', function() {
      expect(db.getTransactionHistory).to.be.a('function');
    });
    it('should create transaction in table', function() {
      return db.createTransaction(3, 4, '33.33', true)
        .then(db.getTransactionHistory('connie')
        .then((data, done) => {
          expect(data.rows[data.rows.length - 1].amount).to.equal('$33.33');
          expect(done);
        })
        )
    })
  })
});
