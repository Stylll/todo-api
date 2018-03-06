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
module.exports.list = (req, res) => {
  const search = req.query.search || '';
  let limit = 4;
  let offset = 0;
  if (req.query.limit && Number.isInteger(Number(req.query.limit))) {
    limit = Number(req.query.limit);
  }
  if (req.query.offset && Number.isInteger(Number(req.query.offset))) {
    offset = Number(req.query.offset);
  }
  return Todo.findAndCountAll({
    include: ['todoItems'],
    distinct: true,
    where: {
      title: {
        $ilike: `%${search}%`,
      },
    },
    offset,
    limit,
    order: [
      ['id', 'desc'],
    ],
  }).then((result) => {
    if (result.count > 0) {
      return res.status(200).send({
        todos: result.rows,
        pagination: {
          page: Math.floor(offset / limit) + 1,
          pageCount: Math.ceil(result.count / limit),
          pageSize: result.rows.length,
          totalCount: result.count,
        },
      });
    }
    return res.status(404).send({ message: 'No todo found' });
  })
    .catch(error => res.status(400).send(error));
};

/**
 * Find todo by todo id
 * @param {*} req
 * @param {*} res
 */
module.exports.findById = (req, res) => Todo.findById(req.params.id, {
  include: ['todoItems'],
}).then((todo) => {
  if (todo) {
    return res.status(200).send(todo);
  }
  return res.status(404).send({ message: 'Todo not found' });
})
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
    .then(() => res.status(204).send())
    .catch(error => res.status(400).send(error));
})
  .catch(error => res.status(400).send(error));

