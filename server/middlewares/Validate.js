import { Todo } from '../models';

/**
 * Todo request validator
 */
const Validate = {
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
 * @return {object} {exists: true, message: 'content'} stating if objects exists and status message
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
};

export default Validate;
