import { TodoItem } from '../models';

const ValidateItems = {

  /**
   * validate the body of a todo item
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  ValidateTodoItem(req, res, next) {
    if (!req.body.content) {
      return res.status(400).send({ message: 'Please enter a content' });
    }
    return next();
  },

  /**
   * checks if todo item exists using the itemId passed
   * @param {} req 
   * @param {*} res 
   * @param {*} next 
   * returns 404, else calls next function
   */
  checkItemExists(req, res, next) {
    TodoItem.findById(req.params.itemId, {})
      .then((item) => {
        if (!item) {
          return res.status(404).send({ message: 'Todo item not found' });
        }
        return next();
      });
  },

  /**
   * validates that items are not more than 5 using the todo id passed in the req
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   * return 403 error if count is up to 5, else calls the next function
   */
  validateItemCount(req, res, next) {
    TodoItem.findAll({
      where: {
        todoId: req.params.id,
      },
    })
      .then((todoItems) => {
        if (todoItems && todoItems.length >= 5) {
          return res.status(403).send({ message: 'You cannot add more than 5 items' });
        }
        return next();
      });
  },
};

export default ValidateItems;
