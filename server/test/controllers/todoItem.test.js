import { expect } from 'chai';
import request from 'supertest';
import app from '../../../server';
import { insertBulkTodo, insertBulkTodoItems, truncateTables } from '../helpers/seedGenerator';

/**
 * truncate tables and Generate seed data

truncateTables();
insertBulkTodo();
insertBulkTodoItems();

 */

/* eslint-disable no-undef */
describe('TODO ITEM CONTROLLER', () => {
  describe('POST Create Todo Item - /api/todos/:id/item', () => {
    it('should create new item using todo id', (done) => {
      request(app)
        .post('/api/todos/4/item')
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
          expect(resp.body.todoId).to.equal(4);
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
        .post('/api/todos/4/item')
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
        .post('/api/todos/4/item')
        .send({
          content: 'Alleviate poverty',
        })
        .end((err, resp) => {
          expect(resp.body).to.be.an('object');
          expect(resp.status).to.equal(201);
          expect(resp.body).to.have.all.deep.keys('id', 'content', 'complete', 'createdAt', 'updatedAt', 'todoId');
          expect(resp.body.content).to.equal('Alleviate poverty');
          expect(resp.body.complete).to.equal(false);
          expect(resp.body.todoId).to.equal(4);
          done();
        });
    });

    it('should not allow more than 5 items per Todo', (done) => {
      request(app)
        .post('/api/todos/11/item')
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

    it('should not create item for unauthorized user');
  });

  describe('PUT Update Todo Item - /api/todos/:id/item/:itemId', () => {
    it('should update todo item', (done) => {
      request(app)
        .put('/api/todos/5/item/1')
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
          expect(resp.body.todoId).to.equal(5);
          expect(resp.body.id).to.equal(1);
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

    it('should not update if todo item doesnot exist', (done) => {
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
        .put('/api/todos/5/item/1')
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
        .put('/api/todos/5/item/1')
        .send({
          content: 'A new dawn of data',
        })
        .end((err, resp) => {
          expect(resp.body).to.be.an('object');
          expect(resp.status).to.equal(200);
          expect(resp.body).to.have.all.deep.keys('id', 'content', 'complete', 'createdAt', 'updatedAt', 'todoId');
          expect(resp.body.content).to.equal('A new dawn of data');
          expect(resp.body.todoId).to.equal(5);
          expect(resp.body.id).to.equal(1);
          done();
        });
    });

    it('should not update for unauthorized user');

    it('should not update for user who is not the creator of the todo');
  });

  describe('GET Get Todo Item - /api/todos/:id/item/:itemId', () => {
    it('should return a single item', (done) => {
      request(app)
        .get('/api/todos/2/item/2')
        .end((err, resp) => {
          expect(resp.body).to.be.an('object');
          expect(resp.status).to.equal(200);
          expect(resp.body).to.have.all.deep.keys('id', 'content', 'complete', 'createdAt', 'updatedAt', 'todoId');
          expect(resp.body.content).to.equal('Switchable empowering model');
          expect(resp.body.complete).to.equal(true);
          expect(resp.body.todoId).to.equal(2);
          expect(resp.body.id).to.equal(2);
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

    it('should only return items created by the logged user');
  });

  describe('GET Get Todo Item By Todo ID - /api/todos/:id/item', () => {
    it('should return a list of items', (done) => {
      request(app)
        .get('/api/todos/4/item')
        .end((err, resp) => {
          expect(resp.status).to.equal(200);
          expect(resp.body).to.be.an('array');
          expect(resp.body[0]).to.have.all.deep.keys('id', 'content', 'complete', 'createdAt', 'updatedAt', 'todoId');
          expect(resp.body[0].todoId).to.equal(4);
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

    it('should only return items created by the logged user');
  });

  describe('DELETE Delete Todo Item - /api/todos/:id/item/:itemId', () => {
    it('should delete item from item list', (done) => {
      request(app)
        .delete('/api/todos/7/item/1')
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
        .end((err, resp) => {
          expect(resp.status).to.equal(404);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Todo item not found');
          done();
        });
    });

    it('should only delete item of the logged in user');

    it('confirm if Todo item was deleted', (done) => {
      request(app)
        .get('/api/todos/7/item/1')
        .end((err, resp) => {
          expect(resp.status).to.equal(404);
          expect(resp.body).to.haveOwnProperty('message');
          expect(resp.body.message).to.equal('Todo item not found');
          done();
        });
    });
  });
});

