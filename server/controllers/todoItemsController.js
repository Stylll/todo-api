/**
 * Controller to handle TodoItems request
 */
import { TodoItem } from '../models';

/**
 * Create todoItem
 * @param {*} req
 * @param {*} res
 */
module.exports.create = (req, res) => {

  return TodoItem.create({
    content: req.body.content,
    complete: req.body.complete === 'true' ? true : false,
    todoId: req.params.id,
  }).then(item => res.status(201).send(item))
    .catch(error => res.status(400).send(error));
};

/**
 * Updates TodoItem
 * @param {*} req
 * @param {*} res
 */
module.exports.update = (req, res) => {
  return TodoItem.find({
    where: {
      id: req.params.itemId,
      todoId: req.params.id,
    },
  })
    .then((todoItem) => {
      console.log('item:', todoItem);
      if (!todoItem) {
        return res.status(404).send({ message: 'Todo item not found' });
      }
      return todoItem.update({
        content: req.body.content || todoItem.content,
        complete: req.body.complete === 'true' ? true : false,
      })
        .then((todoItem) => {
          console.log('here 2');
          return res.status(200).send(todoItem);
        })
        .catch((error) => {
          console.log('error:', error);
          return res.status(400).send(error);
        });
    })
    .catch(error => res.status(400).send(error));
};

/**
 * Get particular item by id
 * @param {*} req
 * @param {*} res
 */
module.exports.get = (req, res) => {
  return TodoItem.findAll({
    where: {
      id: req.params.itemId,
      todoId: req.params.id,
    },
  })
    .then((todoItem) => {
      if (!todoItem) {
        return res.status(404).send({ message: 'Todo Item not found' });
      }
      return res.status(200).send(todoItem);
    })
    .catch(error => res.status(400).send(error));
};

/**
 * Delete a particular item
 * @param {*} req
 * @param {*} res
 */
module.exports.delete = (req, res) => {
  return TodoItem.findAll({
    where: {
      id: req.params.itemId,
      todoId: req.params.id,
    },
  })
    .then((todoItem) => {
      if (!todoItem) {
        return res.status(404).send({ message: 'Todo item not found' });
      }
      return todoItem.destroy()
        .then(todoItem => res.status(204).send())
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
};
