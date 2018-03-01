/**
 * Controller for todo requests
 */

import { Todo } from '../models';

// const Todo = require('../server/models').Todo;
// const TodoItem = require('../server/models').TodoItem;


/**
 * Create Todo Controller
 * Post Method
 */
module.exports.create = (req, res) => Todo.create({
  title: req.body.title,
}).then(todo => res.status(201).send(todo))
  .catch(error => res.status(400).send(error));


/**
 * List all todo
 * @param {*} req
 * @param {*} res
 */
module.exports.list = (req, res) => Todo.findAll({
  include: ['todoItems'],
}).then(todos => res.status(200).send(todos))
  .catch(error => res.status(400).send(error));

/**
 * Find todo by todo id
 * @param {*} req
 * @param {*} res
 */
module.exports.findById = (req, res) => Todo.findById(req.params.id, {
  include: ['todoItems'],
}).then(todo => res.status(200).send(todo))
  .catch(error => res.status(400).send(error));

/**
 * Update Todo using id
 * @param {*} req
 * @param {*} res
 */
module.exports.update = (req, res) => Todo.findById(req.params.id, {
  include: ['todoItems'],
}).then((todo) => {
  if (!todo) {
    return res.status(404).send({ message: 'Todo not found' });
  }
  return todo.update({
    title: req.body.title || todo.title,
  })
    .then(todoSingle => res.status(200).send(todoSingle))
    .catch(error => res.status(400).send(error));
})
  .catch(error => res.status(400).send(error));

/**
 * Delete Todo using id
 * @param {*} req
 * @param {*} res
 */
module.exports.delete = (req, res) => Todo.findById(req.params.id, {
  include: ['todoItems'],
}).then((todo) => {
  if (!todo) {
    return res.status(404).send({ message: 'Todo not found' });
  }
  return todo.destroy()
    .then(todoSingle => res.status(204).send())
    .catch(error => res.status(400).send(error));
})
  .catch(error => res.status(400).send(error));

