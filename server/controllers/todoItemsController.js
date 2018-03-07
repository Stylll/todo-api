/**
 * Controller to handle TodoItems request
 */
import { TodoItem } from '../models';

/**
 * Create todoItem
 * @param {*} req
 * @param {*} res
 */
module.exports.create = (req, res) => TodoItem.create({
  content: req.body.content,
  complete: req.body.complete === 'true' ? true : false,
  todoId: req.params.id,
}).then(item => res.status(201).send(item))
  .catch(error => res.status(400).send(error));

/**
 * Updates TodoItem
 * @param {*} req
 * @param {*} res
 */
module.exports.update = (req, res) => TodoItem.find({
  where: {
    id: req.params.itemId,
    todoId: req.params.id,
  },
})
  .then((todoItem) => {
    if (!todoItem) {
      return res.status(404).send({ message: 'Todo item not found' });
    }
    return todoItem.update({
      content: req.body.content || todoItem.content,
      complete: req.body.complete === 'true' ? true : false,
    })
      .then(todoReturned => res.status(200).send(todoReturned))
      .catch(error => res.status(400).send(error));
  })
  .catch(error => res.status(400).send(error));

/**
 * Get particular item by id
 * @param {*} req
 * @param {*} res
 * returns a TodoItem object
 */
module.exports.getSingle = (req, res) => TodoItem.findById(req.params.itemId)
  .then((todoItem) => {
    if (!todoItem) {
      return res.status(404).send({ message: 'Todo Item not found' });
    }
    return res.status(200).send(todoItem);
  })
  .catch(error => res.status(400).send(error));

/**
   *
   * @param {*} req
   * @param {*} res
   * return an array of Todo Items
   */
module.exports.get = (req, res) => {
  return TodoItem.findAll({
    where: {
      todoId: req.params.id,
    },
  }).then((items) => {
    if (items) {
      return res.status(200).send(items);
    }
    return res.status(404).send({ message: 'Todo items not found' });
  }).catch((error) => {
    console.log('error:', error);
    return res.status(500).send(error);
  });
};

/**
 * Delete a particular item
 * @param {*} req
 * @param {*} res
 */
module.exports.delete = (req, res) => {
  return TodoItem.findById(req.params.itemId)
    .then((todoItem) => {
      if (!todoItem) {
        return res.status(404).send({ message: 'Todo item not found' });
      }
      return todoItem.destroy()
        .then(() => res.status(204).send({ message: 'delete successful' }))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
};

