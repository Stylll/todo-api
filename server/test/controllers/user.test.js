import { expect } from 'chai';
import request from 'supertest';
import app from '../../../server';
import db from '../../models';
import { insertBulkUsers } from '../helpers/seedGenerator';
import { existingUser, normalUser, recoverUser } from '../helpers/seedUsers';

/* eslint-disable no-undef */
describe('USER CONTROLLER', () => {
  before((done) => {
    db.sequelize.sync({ force: true })
      .then(() => {
        insertBulkUsers()
          .then(() => {
            done();
          });
      });
  });

  describe('POST: Signup User - /api/user/signup', () => {
    it('should require email before signup', (done) => {
      request(app)
        .post('/api/user/signup')
        .send({
          email: '',
          username: 'Master chief',
          password: 'LowkeyExtra123',
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(400);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Email is required');
          done();
        });
    });
    it('should require Username before signup', (done) => {
      request(app)
        .post('/api/user/signup')
        .send({
          email: 'master@chief.com',
          password: 'LowkeyExtra123',
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(400);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Username is required');
          done();
        });
    });
    it('should require valid email before signup', (done) => {
      request(app)
        .post('/api/user/signup')
        .send({
          email: 'master',
          password: 'LowkeyExtra123',
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(400);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Please enter a valid email.');
          done();
        });
    });
    it('should require valid password before signup', (done) => {
      request(app)
        .post('/api/user/signup')
        .send({
          email: 'master@chief.com',
          username: 'Master chief',
          password: '',
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(400);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Please enter a valid password.');
          done();
        });
    });
    it('should return created user and generated token if signup is successful', (done) => {
      request(app)
        .post('/api/user/signup')
        .send({
          email: 'already@existing.com',
          username: 'alreadyexisting',
          password: 'LowkeyExtra123',
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(201);
          expect(resp.body).to.have.all.deep.keys('message', 'user', 'token');
          expect(resp.body.user.email).to.equal('already@existing.com');
          expect(resp.body.user.username).to.equal('alreadyexisting');
          expect(resp.body.token).to.not.be.a('null');
          expect(resp.body.message).to.equal('Signup successful');
          done();
        });
    });
    it('should not create user with same username', (done) => {
      request(app)
        .post('/api/user/signup')
        .send({
          email: 'master@new.com',
          username: existingUser.username,
          password: 'LowkeyExtra123',
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(409);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Username already exists. Please use another one!.');
          done();
        });
    });
    it('should not create user with same email', (done) => {
      request(app)
        .post('/api/user/signup')
        .send({
          email: existingUser.email,
          username: 'Master chief',
          password: 'LowkeyExtra123',
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(409);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Email already exists. Please use another one!.');
          done();
        });
    });
  });

  describe('POST: Login User - /api/user/login', () => {
    it('should allow existing user login and return auth token', (done) => {
      request(app)
        .post('/api/user/login')
        .send({
          email: normalUser.email,
          password: normalUser.password,
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(200);
          expect(resp.body).to.have.all.deep.keys('message', 'user', 'token');
          expect(resp.body.user.email).to.equal(normalUser.email);
          expect(resp.body.user.username).to.equal(normalUser.username);
          expect(resp.body.token).to.not.be.a('null');
          expect(resp.body.message).to.equal('Login successful');
          done();
        });
    });
    it('should require valid email before login', (done) => {
      request(app)
        .post('/api/user/login')
        .send({
          email: 'master',
          password: 'LowkeyExtra123',
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(400);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Please enter a valid email.');
          done();
        });
    });
    it('should require email before login', (done) => {
      request(app)
        .post('/api/user/login')
        .send({
          password: 'LowkeyExtra123',
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(400);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Email is required');
          done();
        });
    });
    it('should require password before login', (done) => {
      request(app)
        .post('/api/user/login')
        .send({
          email: 'master@chief.com',
          password: '',
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(400);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Please enter a valid password.');
          done();
        });
    });
    it('should not login with wrong credentials', (done) => {
      request(app)
        .post('/api/user/login')
        .send({
          email: 'master@chief.com',
          password: 'Wrong2291Pass',
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(401);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Email or Password is incorrect.');
          done();
        });
    });
  });

  describe('Forgot Password - /api/user/forgotpassword', () => {
    it('should require valid email to reset token', (done) => {
      request(app)
        .put('/api/user/forgotpassword')
        .send({
          email: 'ee',
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(400);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Please enter a valid email.');
          done();
        });
    });
    it('should require an existing email to reset token', (done) => {
      request(app)
        .put('/api/user/forgotpassword')
        .send({
          email: 'none@existing.com',
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(404);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Email does not exist');
          done();
        });
    });
    /*
    it('should generate and send reset token to email if email exists', (done) => {
      request(app)
        .put('/api/user/forgotpassword')
        .send({
          email: recoverUser.email,
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(200);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal(`An email has been sent to ${recoverUser.email} for further instructions.`);
          done();
        });
    });
    */
  });

  describe('Reset Password - /api/user/reset/token', () => {
    it('should not reset if token is not associated with a user id', (done) => {
      request(app)
        .put('/api/user/reset/390xake209a3901f0ak')
        .send({
          password: 'NewPass22',
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(400);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Password Token is invalid or has expired');
          done();
        });
    });
    it('should require new password', (done) => {
      request(app)
        .put(`/api/user/reset/${recoverUser.resetPasswordToken}`)
        .send({
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(400);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Please enter a new password');
          done();
        });
    });
    /*
    it('should reset password and send email for user with valid credentials', (done) => {
      request(app)
        .put(`/api/user/reset/${recoverUser2.resetPasswordToken}`)
        .send({
          password: 'newpassword1234',
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(200);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Password reset successful');
          done();
        });
    });

    it('should login with newly set password', (done) => {
      request(app)
        .post('/api/user/login')
        .send({
          email: recoverUser2.email,
          password: 'newpassword1234',
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(200);
          expect(resp.body).to.have.all.deep.keys('message', 'user', 'token');
          expect(resp.body.user.email).to.equal(recoverUser2.email);
          expect(resp.body.user.username).to.equal(recoverUser2.username);
          expect(resp.body.token).to.not.be.a('null');
          expect(resp.body.message).to.equal('Login successful');
          done();
        });
    });
    */
  });
});
