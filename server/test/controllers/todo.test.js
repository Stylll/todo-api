import { expect } from 'chai';
import request from 'supertest';
import app from '../../../server';
import db from '../../models';
import { insertBulkUsersTodo } from '../helpers/seedGenerator';
import { normalUserToken } from '../helpers/seedUsers';

/* eslint-disable no-undef */
describe('TODO CONTROLLER', () => {
  before((done) => {
    db.sequelize.sync({ force: true })
      .then(() => {
        insertBulkUsersTodo()
          .then(() => {
            done();
          });
      });
  });
  describe('POST: Create todo - api/todos', () => {
    it('should create new todo and return todo object', (done) => {
      request(app)
        .post('/api/todos')
        .set({
          'x-access-token': normalUserToken(),
        })
        .send({
          title: 'Take over the world',
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(201);
          expect(resp.body.title).to.equal('Take over the world');
          expect(resp.body).to.haveOwnProperty('createdAt');
          expect(resp.body).to.haveOwnProperty('updatedAt');
          expect(resp.body).to.haveOwnProperty('userId');
          expect(resp.body.userId).to.equal(2);
          done();
        });
    });
    it('should require title before creating', (done) => {
      request(app)
        .post('/api/todos')
        .send({
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(400);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Please provide a title.');
          done();
        });
    });
    it('should not create duplicate todo', (done) => {
      request(app)
        .post('/api/todos')
        .send({
          title: 'Take over the world',
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(409);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('This title already exists');
          done();
        });
    });
    it('should not create todo for unauthorized users', (done) => {
      request(app)
        .post('/api/todos')
        .set('x-access-token', '3jdjdwiwjffnewiewi192ssk')
        .send({
          title: 'This is a random Title',
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(401);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Token is invalid or has expired');
          done();
        });
    });
    it('shoult not create todo if no token is provided', (done) => {
      request(app)
        .post('/api/todos')
        .send({
          title: 'Another random title',
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(401);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Authentication failed. No token provided.');
          done();
        });
    });
  });

  describe('GET: Get Todo list - api/todos', () => {
    it('should return an array of todo created by the logged in user', (done) => {
      request(app)
        .get('/api/todos')
        .set('x-access-token', normalUserToken())
        .end((err, resp) => {
          expect(resp.status).to.equal(200);
          expect(resp.body.todos).to.be.an('array');
          expect(resp.body.todos[0]).to.have.all.deep.keys('id', 'title', 'createdAt', 'updatedAt', 'todoItems', 'userId');
          expect(resp.body.todos.length).to.be.greaterThan(1);
          expect(resp.body.todos[0].userId).to.equal(2);
          expect(resp.body.todos[0].id).to.equal(13);
          expect(resp.body.todos[resp.body.todos.length - 1].userId).to.equal(2);
          expect(resp.body.pagination).to.deep.include({
            page: 1,
            pageCount: 2,
            pageSize: 4,
            totalCount: 7,
          });
          done();
        });
    });
    it('should return a list of todo matching the title included in the query', (done) => {
      request(app)
        .get('/api/todos?search=dictumst')
        .set('x-access-token', normalUserToken())
        .end((err, resp) => {
          expect(resp.status).to.equal(200);
          expect(resp.body).to.be.an('object');
          expect(resp.body.todos).to.be.an('array');
          expect(resp.body.todos[0]).to.have.all.deep.keys('id', 'title', 'createdAt', 'updatedAt', 'todoItems', 'userId');
          expect(resp.body.todos.length).to.be.greaterThan(0);
          expect(resp.body.todos[0].title).to.equal('In hac habitasse platea dictumst.');
          expect(resp.body.pagination).to.deep.include({
            page: 1,
            pageCount: 1,
            pageSize: 1,
            totalCount: 1,
          });
          done();
        });
    });
    it('should not find any todo if no match was found with the title in the query', (done) => {
      request(app)
        .get('/api/todos?search=xssx')
        .set('x-access-token', normalUserToken())
        .end((err, resp) => {
          expect(resp.status).to.equal(404);
          expect(resp.body.message).to.equal('No todo found');
          done();
        });
    });
    it('should include the array of the child todoItems', (done) => {
      request(app)
        .get('/api/todos')
        .set('x-access-token', normalUserToken())
        .end((err, resp) => {
          expect(resp.status).to.equal(200);
          expect(resp.body.todos).to.be.an('array');
          expect(resp.body.todos[0]).to.haveOwnProperty('todoItems');
          done();
        });
    });
    it('should filter results according to the page limit and offset passed in the url', (done) => {
      request(app)
        .get('/api/todos?limit=4&offset=4')
        .set('x-access-token', normalUserToken())
        .end((err, resp) => {
          expect(resp.status).to.equal(200);
          expect(resp.body).to.be.an('object');
          expect(resp.body.todos).to.be.an('array');
          expect(resp.body.todos[0]).to.have.all.deep.keys('id', 'title', 'createdAt', 'updatedAt', 'todoItems', 'userId');
          expect(resp.body.todos.length).to.be.greaterThan(1);
          expect(resp.body.pagination).to.deep.include({
            page: 2,
            pageCount: 2,
            pageSize: 3, // 3 here instead of 4 because on the 2nd page, there are just 3 items left out of 6
            totalCount: 7,
          });
          done();
        });
    });
  });

  describe('GET: Get Todo by ID - api/todos/:id', () => {
    it('should return a todo object matching the id and created by logged user', (done) => {
      request(app)
        .get('/api/todos/12')
        .set('x-access-token', normalUserToken())
        .end((err, resp) => {
          expect(resp.status).to.equal(200);
          expect(resp.body).to.be.an('object');
          expect(resp.body).to.have.all.deep.keys('id', 'title', 'createdAt', 'updatedAt', 'todoItems', 'userId');
          expect(resp.body.id).to.equal(12);
          expect(resp.body.title).to.equal('In hac habitasse platea dictumst.');
          expect(resp.body.userId).to.equal(2);
          done();
        });
    });
    it('should return an empty object if no matching todo was found', (done) => {
      request(app)
        .get('/api/todos/45')
        .set('x-access-token', normalUserToken())
        .end((err, resp) => {
          expect(resp.status).to.equal(404);
          expect(resp.body.message).to.equal('Todo not found');
          done();
        });
    });
    it('should not return todo created by another user', (done) => {
      request(app)
        .get('/api/todos/1')
        .set('x-access-token', normalUserToken())
        .end((err, resp) => {
          expect(resp.status).to.equal(401);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Unauthorized access');
          done();
        });
    });
  });

  describe('PUT: Update Todo - api/todos/:id', () => {
    it('should require title', (done) => {
      request(app)
        .put('/api/todos/7')
        .set('x-access-token', normalUserToken())
        .send({
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(400);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Please provide a title.');
          done();
        });
    });
    it('should return updated todo if id matches and logged user is the owner', (done) => {
      request(app)
        .put('/api/todos/7')
        .set('x-access-token', normalUserToken())
        .send({
          title: 'Take over the world part 2',
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(200);
          expect(resp.body).to.haveOwnProperty('title');
          expect(resp.body.title).to.equal('Take over the world part 2');
          expect(resp.body.userId).to.equal(2);
          done();
        });
    });
    it('should not update todo if id is not matched', (done) => {
      request(app)
        .put('/api/todos/68')
        .set('x-access-token', normalUserToken())
        .send({
          title: 'Take over the world part 2',
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(404);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Todo not found');
          done();
        });
    });
    it('should not update todo created by another user', (done) => {
      request(app)
        .put('/api/todos/1')
        .set('x-access-token', normalUserToken())
        .send({
          title: 'Take over the world part 2',
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(401);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Unauthorized access');
          done();
        });
    });
  });

  describe('DELETE: Delete Todo - api/todos/:id', () => {
    it('should delete todo object that matches the id and belongs to the logged user', (done) => {
      request(app)
        .delete('/api/todos/9')
        .set('x-access-token', normalUserToken())
        .end((err, resp) => {
          expect(resp.status).to.equal(204);
          done();
        });
    });
    it('should delete todo items of the todo object that matches the id', (done) => {
      request(app)
        .get('/api/todos/9/item')
        .end((err, resp) => {
          expect(resp.status).to.equal(404);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Todo not found');
          done();
        });
    });
    it('should not delete todo objects if id is not matched', (done) => {
      request(app)
        .delete('/api/todos/68')
        .set('x-access-token', normalUserToken())
        .end((err, resp) => {
          expect(resp.status).to.equal(404);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Todo not found');
          done();
        });
    });
    it('should not delete todo object created by another user', (done) => {
      request(app)
        .delete('/api/todos/1')
        .set('x-access-token', normalUserToken())
        .end((err, resp) => {
          expect(resp.status).to.equal(401);
          expect(resp.body.message).to.equal('Unauthorized access');
          done();
        });
    });
  });
});
