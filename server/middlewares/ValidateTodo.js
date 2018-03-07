import { Todo } from '../models';

/**
 * Todo request validator
 */
const ValidateTodo = {
  /**
 * Checks if proper values to create Todo are supplied
 * @param {object} input
 * @returns {object} returns error if not valid and calls next if valid
 */
  ValidateTodo(req, res, next) {
    if (!req.body.title) {
      return res.status(400).send({ message: 'Please provide a title.' });
    }
    return next();
  },

  /**
 * Checks if todo title already exists in the db
 * @param {req} request
 * @param {res} response
 * @param {next} next function
 * @return {object} { message: 'content'} stating 'This title already exists'
 */
  doesTitleExist(req, res, next) {
    Todo.findOne({
      where: {
        title: req.body.title,
      },
    }).then((todo) => {
      if (todo) {
        return res.status(409).send({ message: 'This title already exists' });
      }
      return next();
    });
  },

  /**
   * checks if Todo exists using the id param
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   * returns 404 if not, else calls the next function
   */
  checkTodoExists(req, res, next) {
    Todo.findById(req.params.id)
      .then((todo) => {
        if (!todo) {
          return res.status(404).send({ message: 'Todo not found' });
        }
        return next();
      });
  },
};

export default ValidateTodo;
