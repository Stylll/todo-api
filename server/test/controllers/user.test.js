import { expect } from 'chai';
import request from 'supertest';
import app from '../../../server';
import { insertBulkTodo, insertBulkTodoItems, truncateTables } from '../helpers/seedGenerator';

/* eslint-disable no-undef */
describe('USER CONTROLLER', () => {
  describe('POST: Signup User - /api/user/signup', () => {
    it('should require email before signup', (done) => {
      request(app)
        .post('/api/user/signup')
        .send({
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
    it('should return generated token if signup is successful', (done) => {
      request(app)
        .post('/api/user/signup')
        .send({
          email: 'already@existing.com',
          username: 'alreadyexisting',
          password: 'LowkeyExtra123',
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(201);
          expect(resp.body).to.have.all.deep.keys('id', 'email', 'username', 'token');
          expect(resp.body.email).to.equal('already@existing.com');
          expect(resp.body.username).to.equal('alreadyexisting');
          expect(resp.body.token).to.not.be.a('null');
          done();
        });
    });
    it('should not create user with same username', (done) => {
      request(app)
        .post('/api/user/signup')
        .send({
          email: 'master@new.com',
          username: 'alreadyexisting',
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
          email: 'already@existing.com',
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
    it('should allow existing user login and return token', (done) => {
      request(app)
        .post('/api/user/login')
        .send({
          email: 'already@existing.com',
          password: 'LowkeyExtra123',
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(200);
          expect(resp.body).to.have.all.deep.keys('id', 'email', 'username', 'token');
          expect(resp.body.email).to.equal('already@existing.com');
          expect(resp.body.username).to.equal('alreadyexisting');
          expect(resp.body.token).to.not.be.a('null');
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
          expect(resp.body.message).to.equal('Email or Password is incorrect. Try again.');
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
    it('should generate and send reset token to email if email exists', (done) => {
      request(app)
        .put('/api/user/forgotpassword')
        .send({
          email: 'andrew@higgins.com',
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(200);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('An email has been sent to andrew@higgins.com for further instructions');
          done();
        });
    });
    it('should not send reset token if network error occurs');
  });

  describe('Reset Password - /api/user/reset:token', () => {
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
      const token = '390xake209a3901f0ak';
      request(app)
        .put(`/api/user/reset/${token}`)
        .send({
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(400);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Please enter a new password');
          done();
        });
    });
    it('should not reset password if network error occurs');
    it('should reset password for user with valid credentials', (done) => {
      const token = '390xake209a3901f0ak';
      request(app)
        .put(`/api/user/reset/${token}`)
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
  });
});
