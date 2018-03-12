import { expect } from 'chai';
import request from 'supertest';
import app from '../../../server';
import { insertBulkTodo, insertBulkTodoItems, truncateTables } from '../helpers/seedGenerator';

/**
 * truncate tables and Generate seed data for Todo and TodoItems
 */
truncateTables();
insertBulkTodo();
insertBulkTodoItems();

/* eslint-disable no-undef */
describe('TODO CONTROLLER', () => {
  describe('POST: Create todo - api/todos', () => {
    it('should create new todo and return todo object', (done) => {
      request(app)
        .post('/api/todos')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          title: 'Take over the world',
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(201);
          expect(resp.body.title).to.equal('Take over the world');
          expect(resp.body).to.haveOwnProperty('createdAt');
          expect(resp.body).to.haveOwnProperty('updatedAt');
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
  });

  describe('GET: Get Todo list - api/todos', () => {
    it('should return an array of todo', (done) => {
      request(app)
        .get('/api/todos')
        .end((err, resp) => {
          expect(resp.status).to.equal(200);
          expect(resp.body.todos).to.be.an('array');
          expect(resp.body.todos[0]).to.have.all.deep.keys('id', 'title', 'createdAt', 'updatedAt', 'todoItems', 'userId');
          expect(resp.body.todos.length).to.be.greaterThan(1);
          expect(resp.body.pagination).to.deep.include({
            page: 1,
            pageCount: 4,
            pageSize: 4,
            totalCount: 13,
          });
          done();
        });
    });
    it('should return a list of todo matching the title included in the query', (done) => {
      request(app)
        .get('/api/todos?search=take')
        .end((err, resp) => {
          expect(resp.status).to.equal(200);
          expect(resp.body).to.be.an('object');
          expect(resp.body.todos).to.be.an('array');
          expect(resp.body.todos[0]).to.have.all.deep.keys('id', 'title', 'createdAt', 'updatedAt', 'todoItems', 'userId');
          expect(resp.body.todos.length).to.be.greaterThan(0);
          expect(resp.body.todos[0].title).to.equal('Take over the world');
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
        .end((err, resp) => {
          expect(resp.status).to.equal(404);
          expect(resp.body.message).to.equal('No todo found');
          done();
        });
    });
    it('should include the array of the child todoItems', (done) => {
      request(app)
        .get('/api/todos')
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
        .end((err, resp) => {
          expect(resp.status).to.equal(200);
          expect(resp.body).to.be.an('object');
          expect(resp.body.todos).to.be.an('array');
          expect(resp.body.todos[0]).to.have.all.deep.keys('id', 'title', 'createdAt', 'updatedAt', 'todoItems', 'userId');
          expect(resp.body.todos.length).to.be.greaterThan(1);
          expect(resp.body.pagination).to.deep.include({
            page: 2,
            pageCount: 4,
            pageSize: 4,
            totalCount: 13,
          });
          done();
        });
    });
  });

  describe('GET: Get Todo by ID - api/todos/:id', () => {
    it('should return a todo object matching the id', (done) => {
      request(app)
        .get('/api/todos/1')
        .end((err, resp) => {
          expect(resp.status).to.equal(200);
          expect(resp.body).to.be.an('object');
          expect(resp.body).to.have.all.deep.keys('id', 'title', 'createdAt', 'updatedAt', 'todoItems', 'userId');
          expect(resp.body.id).to.equal(1);
          done();
        });
    });
    it('should return an empty object if no matching todo was found', (done) => {
      request(app)
        .get('/api/todos/45')
        .end((err, resp) => {
          expect(resp.status).to.equal(404);
          expect(resp.body.message).to.equal('Todo not found');
          done();
        });
    });
  });

  describe('PUT: Update Todo - api/todos/:id', () => {
    it('should require title', (done) => {
      request(app)
        .put('/api/todos/1')
        .send({
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(400);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Please provide a title.');
          done();
        });
    });
    it('should return updated todo if id matches', (done) => {
      request(app)
        .put('/api/todos/1')
        .send({
          title: 'Take over the world part 2',
        })
        .end((err, resp) => {
          expect(resp.status).to.equal(200);
          expect(resp.body).to.haveOwnProperty('title');
          expect(resp.body.title).to.equal('Take over the world part 2');
          done();
        });
    });
    it('should not update todo if id is not matched', (done) => {
      request(app)
        .put('/api/todos/68')
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
  });

  describe('DELETE: Delete Todo - api/todos/:id', () => {
    it('should delete todo object that matches the id', (done) => {
      request(app)
        .delete('/api/todos/1')
        .end((err, resp) => {
          expect(resp.status).to.equal(204);
          done();
        });
    });
    it('should delete todo items of the todo object that matches the id', (done) => {
      request(app)
        .get('/api/todos/1/item')
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
        .end((err, resp) => {
          expect(resp.status).to.equal(404);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Todo not found');
          done();
        });
    });
  });
});
