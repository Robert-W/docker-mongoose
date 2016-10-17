/* eslint-disable */
const expect = require('chai').expect;
const mongoose = require('mongoose');
const User = mongoose.model('User');

const mock = {
  john: {
    firstName: 'John',
    lastName: 'Doe',
    username: 'jdoe',
    password: 'JDoeP@ss',
    email: 'jdoe@gmail.com'
  },
  jane: {
    firstName: 'Jane',
    lastName: 'Doe',
    username: 'janey',
    password: 'JaneyP@ss',
    email: 'janey@gmail.com'
  }
};

let, user1, user2, user3;

// Mocha Tests
describe('User Model Unit Tests:', () => {

  before(done => {
    User.remove().exec(() => {
      user1 = new User(mock.john);
      user2 = new User(mock.john);
      user3 = new User(mock.jane);
    });
  });

  it('should start with an empty collection', done => {
    User.find().exec((err, users) => {
      expect(users).to.have.length(0);
      done();
    });
  });

  describe('Method Save', () => {

    it('should allow john to save without issues', () => {

    });

    it('should now contain a single user', () => {

    });

    it('should allow a different user to save without issues', () => {

    });

    it('should now contain two users', () => {

    });

    it('should prevent saving a user with the same username', () => {

    });

    it('should prevent saving without a firstName or lastName', () => {

    });

    it('should prevent saving without a valid password', () => {

    });

    it('should prevent saving without a valid email', () => {

    });

  });

  it('should end with two users in the collection', done => {
    User.find().exec((err, users) => {
      expect(users).to.have.length(2);
      done();
    });
  });

  after(() => {
    User.remove().exec();
  });

});
