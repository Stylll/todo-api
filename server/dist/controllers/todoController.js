'use strict';

var _models = require('../server/models');

// const Todo = require('../server/models').Todo;
// const TodoItem = require('../server/models').TodoItem;


/**
 * Create Todo Controller
 * Post Method
 */
module.exports.create = function (req, res) {
  return _models.Todo.create({
    title: req.body.title
  }).then(function (todo) {
    return res.status(201).send(todo);
  }).catch(function (error) {
    return res.status(400).send(error);
  });
};

/**
 * List all todo
 * @param {*} req
 * @param {*} res
 */
/**
 * Controller for todo requests
 */

module.exports.list = function (req, res) {
  return _models.Todo.findAll({
    include: ['todoItems']
  }).then(function (todos) {
    return res.status(200).send(todos);
  }).catch(function (error) {
    return res.status(400).send(error);
  });
};

/**
 * Find todo by todo id
 * @param {*} req
 * @param {*} res
 */
module.exports.findById = function (req, res) {
  return _models.Todo.findById(req.params.id, {
    include: ['todoItems']
  }).then(function (todo) {
    return res.status(200).send(todo);
  }).catch(function (error) {
    return res.status(400).send(error);
  });
};

/**
 * Update Todo using id
 * @param {*} req
 * @param {*} res
 */
module.exports.update = function (req, res) {
  return _models.Todo.findById(req.params.id, {
    include: ['todoItems']
  }).then(function (todo) {
    if (!todo) {
      return res.status(404).send({ message: 'Todo not found' });
    }
    return todo.update({
      title: req.body.title || todo.title
    }).then(function (todoSingle) {
      return res.status(200).send(todoSingle);
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  }).catch(function (error) {
    return res.status(400).send(error);
  });
};

/**
 * Delete Todo using id
 * @param {*} req
 * @param {*} res
 */
module.exports.delete = function (req, res) {
  return _models.Todo.findById(req.params.id, {
    include: ['todoItems']
  }).then(function (todo) {
    if (!todo) {
      return res.status(404).send({ message: 'Todo not found' });
    }
    return todo.destroy().then(function (todoSingle) {
      return res.status(204).send();
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  }).catch(function (error) {
    return res.status(400).send(error);
  });
};