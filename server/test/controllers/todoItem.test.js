import { expect } from 'chai';
import request from 'supertest';
import app from '../../../server';
import db from '../../models';
import { insertBulkUsersTodo } from '../helpers/seedGenerator';
import { normalUserToken } from '../helpers/seedUsers';

/* eslint-disable no-undef */
describe('TODO ITEM CONTROLLER', () => {
  before((done) => {
    db.sequelize.sync({ force: true })
      .then(() => {
        insertBulkUsersTodo()
          .then(() => {
            done();
          });
      });
  });
  describe('POST Create Todo Item - /api/todos/:id/item', () => {
    it('should create new item using todo id and logged user', (done) => {
      request(app)
        .post('/api/todos/10/item')
        .set('x-access-token', normalUserToken())
        .send({
          content: 'Calculate Monthly Tax',
          complete: 'true',
        })
        .end((err, resp) => {
          expect(resp.body).to.be.an('object');
          expect(resp.status).to.equal(201);
          expect(resp.body).to.have.all.deep.keys('id', 'content', 'complete', 'createdAt', 'updatedAt', 'todoId');
          expect(resp.body.content).to.equal('Calculate Monthly Tax');
          expect(resp.body.complete).to.equal(true);
          expect(resp.body.todoId).to.equal(10);
          done();
        });
    });

    it('should not create new item under todo that does not belong to logged user', (done) => {
      request(app)
        .post('/api/todos/1/item')
        .set('x-access-token', normalUserToken())
        .send({
          content: 'Calculate Monthly Tax',
          complete: 'true',
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(401);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Unauthorized access');
          done();
        });
    });

    it('should not create item if todo does not exist', (done) => {
      request(app)
        .post('/api/todos/99/item')
        .send({
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(404);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Todo not found');
          done();
        });
    });

    it('should not create item if content is not provided', (done) => {
      request(app)
        .post('/api/todos/9/item')
        .send({
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(400);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Please enter a content');
          done();
        });
    });

    it('should create item if completed boolean is not provided', (done) => {
      request(app)
        .post('/api/todos/9/item')
        .set('x-access-token', normalUserToken())
        .send({
          content: 'Alleviate poverty',
        })
        .end((err, resp) => {
          expect(resp.body).to.be.an('object');
          expect(resp.status).to.equal(201);
          expect(resp.body).to.have.all.deep.keys('id', 'content', 'complete', 'createdAt', 'updatedAt', 'todoId');
          expect(resp.body.content).to.equal('Alleviate poverty');
          expect(resp.body.complete).to.equal(false);
          expect(resp.body.todoId).to.equal(9);
          done();
        });
    });

    it('should not allow more than 5 items per Todo', (done) => {
      request(app)
        .post('/api/todos/11/item')
        .set('x-access-token', normalUserToken())
        .send({
          content: 'Template content',
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(403);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('You cannot add more than 5 items');
          done();
        });
    });

    it('should not create item for user with invalid token', (done) => {
      request(app)
        .post('/api/todos/1/item')
        .set('x-access-token', 'wueui129xkxi1wio')
        .send({
          content: 'Calculate Monthly Tax',
          complete: 'true',
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(401);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Token is invalid or has expired');
          done();
        });
    });

    it('should not create item for user when token is not passed', (done) => {
      request(app)
        .post('/api/todos/1/item')
        .send({
          content: 'Calculate Monthly Tax',
          complete: 'true',
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(401);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Authentication failed. No token provided.');
          done();
        });
    });
  });

  describe('PUT Update Todo Item - /api/todos/:id/item/:itemId', () => {
    it('should update todo item for valid user token', (done) => {
      request(app)
        .put('/api/todos/11/item/11')
        .set('x-access-token', normalUserToken())
        .send({
          content: 'An Updated data',
          complete: 'true',
        })
        .end((err, resp) => {
          expect(resp.body).to.be.an('object');
          expect(resp.status).to.equal(200);
          expect(resp.body).to.have.all.deep.keys('id', 'content', 'complete', 'createdAt', 'updatedAt', 'todoId');
          expect(resp.body.content).to.equal('An Updated data');
          expect(resp.body.complete).to.equal(true);
          expect(resp.body.todoId).to.equal(11);
          expect(resp.body.id).to.equal(11);
          done();
        });
    });

    it('should not update if todo does not exist', (done) => {
      request(app)
        .put('/api/todos/99/item/1')
        .send({
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(404);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Todo not found');
          done();
        });
    });

    it('should not update if todo item does not exist', (done) => {
      request(app)
        .put('/api/todos/5/item/99')
        .send({
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(404);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Todo item not found');
          done();
        });
    });

    it('should not update if content is not provided', (done) => {
      request(app)
        .put('/api/todos/11/item/1')
        .send({
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(400);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Please enter a content');
          done();
        });
    });

    it('should update if completed boolean is not provided', (done) => {
      request(app)
        .put('/api/todos/11/item/11')
        .set('x-access-token', normalUserToken())
        .send({
          content: 'A new dawn of data',
        })
        .end((err, resp) => {
          expect(resp.body).to.be.an('object');
          expect(resp.status).to.equal(200);
          expect(resp.body).to.have.all.deep.keys('id', 'content', 'complete', 'createdAt', 'updatedAt', 'todoId');
          expect(resp.body.content).to.equal('A new dawn of data');
          expect(resp.body.todoId).to.equal(11);
          expect(resp.body.id).to.equal(11);
          done();
        });
    });

    it('should not update for user with invalid token', (done) => {
      request(app)
        .put('/api/todos/11/item/1')
        .set('x-access-token', 'wwid1210aqdds')
        .send({
          content: 'A new dawn of data',
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(401);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Token is invalid or has expired');
          done();
        });
    });

    it('should not update for user when token is not provided', (done) => {
      request(app)
        .put('/api/todos/11/item/1')
        .send({
          content: 'A new dawn of data',
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(401);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Authentication failed. No token provided.');
          done();
        });
    });

    it('should not update for user who is not the creator of the todo', (done) => {
      request(app)
        .put('/api/todos/2/item/1')
        .set('x-access-token', normalUserToken())
        .send({
          content: 'A new dawn of data',
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(401);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Unauthorized access');
          done();
        });
    });
  });

  describe('GET Get Todo Item - /api/todos/:id/item/:itemId', () => {
    it('should return a single item for authorized user', (done) => {
      request(app)
        .get('/api/todos/10/item/26')
        .set('x-access-token', normalUserToken())
        .end((err, resp) => {
          expect(resp.body).to.be.an('object');
          expect(resp.status).to.equal(200);
          expect(resp.body).to.have.all.deep.keys('id', 'content', 'complete', 'createdAt', 'updatedAt', 'todoId');
          expect(resp.body.content).to.equal('Down-sized systemic contingency');
          expect(resp.body.complete).to.equal(true);
          expect(resp.body.todoId).to.equal(10);
          expect(resp.body.id).to.equal(26);
          done();
        });
    });

    it('should not return anything when todo id does not exist', (done) => {
      request(app)
        .get('/api/todos/99/item/1')
        .send({
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(404);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Todo not found');
          done();
        });
    });

    it('should not return anything when todo item id does not exist', (done) => {
      request(app)
        .get('/api/todos/5/item/99')
        .end((err, resp) => {
          expect(resp.status).to.equal(404);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Todo item not found');
          done();
        });
    });

    it('should return error for user with invalid token', (done) => {
      request(app)
        .get('/api/todos/11/item/1')
        .set('x-access-token', 'wwid1210aqdds')
        .end((err, resp) => {
          expect(resp.status).to.equal(401);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Token is invalid or has expired');
          done();
        });
    });

    it('should return error for user when token is not provided', (done) => {
      request(app)
        .get('/api/todos/11/item/1')
        .end((err, resp) => {
          expect(resp.status).to.equal(401);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Authentication failed. No token provided.');
          done();
        });
    });

    it('should return error for user who is not the creator of the todo', (done) => {
      request(app)
        .get('/api/todos/2/item/1')
        .set('x-access-token', normalUserToken())
        .end((err, resp) => {
          expect(resp.status).to.equal(401);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Unauthorized access');
          done();
        });
    });

    it('should return error for user who is not the creator of the todo item', (done) => {
      request(app)
        .get('/api/todos/8/item/1')
        .set('x-access-token', normalUserToken())
        .end((err, resp) => {
          expect(resp.status).to.equal(401);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Unauthorized access');
          done();
        });
    });
  });

  describe('GET Get Todo Item By Todo ID - /api/todos/:id/item', () => {
    it('should return a list of items for authorized user', (done) => {
      request(app)
        .get('/api/todos/11/item')
        .set('x-access-token', normalUserToken())
        .end((err, resp) => {
          expect(resp.status).to.equal(200);
          expect(resp.body).to.be.an('array');
          expect(resp.body[0]).to.have.all.deep.keys('id', 'content', 'complete', 'createdAt', 'updatedAt', 'todoId');
          expect(resp.body[0].todoId).to.equal(11);
          done();
        });
    });

    it('should not return anything when todo id does not exist', (done) => {
      request(app)
        .get('/api/todos/99/item')
        .end((err, resp) => {
          expect(resp.status).to.equal(404);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Todo not found');
          done();
        });
    });

    it('should return error for user with invalid token', (done) => {
      request(app)
        .get('/api/todos/11/item')
        .set('x-access-token', 'wwid1210aqdds')
        .end((err, resp) => {
          expect(resp.status).to.equal(401);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Token is invalid or has expired');
          done();
        });
    });

    it('should return error for user when token is not provided', (done) => {
      request(app)
        .get('/api/todos/11/item')
        .end((err, resp) => {
          expect(resp.status).to.equal(401);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Authentication failed. No token provided.');
          done();
        });
    });

    it('should return error for user who is not the creator of the todo', (done) => {
      request(app)
        .get('/api/todos/2/item')
        .set('x-access-token', normalUserToken())
        .end((err, resp) => {
          expect(resp.status).to.equal(401);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Unauthorized access');
          done();
        });
    });
  });

  describe('DELETE Delete Todo Item - /api/todos/:id/item/:itemId', () => {
    it('should delete item from item list for authorized user', (done) => {
      request(app)
        .delete('/api/todos/10/item/10')
        .set('x-access-token', normalUserToken())
        .end((err, resp) => {
          expect(resp.status).to.equal(204);
          done();
        });
    });

    it('should not delete item if todo id is not found', (done) => {
      request(app)
        .delete('/api/todos/99/item/1')
        .end((err, resp) => {
          expect(resp.status).to.equal(404);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Todo not found');
          done();
        });
    });

    it('should not delete item if item id is not found', (done) => {
      request(app)
        .delete('/api/todos/8/item/100')
        .set('x-access-token', normalUserToken())
        .end((err, resp) => {
          expect(resp.status).to.equal(404);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Todo item not found');
          done();
        });
    });

    it('confirms if Todo item is deleted', (done) => {
      request(app)
        .get('/api/todos/10/item/10')
        .end((err, resp) => {
          expect(resp.status).to.equal(404);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Todo item not found');
          done();
        });
    });

    it('should return error for user with invalid token', (done) => {
      request(app)
        .delete('/api/todos/11/item/1')
        .set('x-access-token', 'wwid1210aqdds')
        .end((err, resp) => {
          expect(resp.status).to.equal(401);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Token is invalid or has expired');
          done();
        });
    });

    it('should return error for user when token is not provided', (done) => {
      request(app)
        .delete('/api/todos/11/item/1')
        .end((err, resp) => {
          expect(resp.status).to.equal(401);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Authentication failed. No token provided.');
          done();
        });
    });

    it('should return error for user who is not the creator of the todo', (done) => {
      request(app)
        .delete('/api/todos/11/item/1')
        .set('x-access-token', normalUserToken())
        .end((err, resp) => {
          expect(resp.status).to.equal(401);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Unauthorized access');
          done();
        });
    });

    it('should return error for user who is not the creator of the todo item', (done) => {
      request(app)
        .delete('/api/todos/10/item/1')
        .set('x-access-token', normalUserToken())
        .end((err, resp) => {
          expect(resp.status).to.equal(401);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Unauthorized access');
          done();
        });
    });
  });
});

