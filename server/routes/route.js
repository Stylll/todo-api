/**
 * Route handler for incoming requests
 *
 */
import ValidateTodo from '../middlewares/ValidateTodo';
import ValidateItem from '../middlewares/ValidateTodoItem';
import validateUser from '../middlewares/validateUser';
import userController from '../controllers/userController';


const todoController = require('../controllers/todoController');
const todoItemsController = require('../controllers/todoItemsController');

module.exports = (app) => {
  /* GET home page. */
  app.get('/api', (req, res) => {
    res.status(200).send({ message: 'Welcome to TODO api' });
  });

  /**
   * USER REQUESTS
   */
  app.post(
    '/api/user/signup', validateUser.validateEmail, validateUser.isEmailAvailable,
    validateUser.validateUsername, validateUser.isUsernameAvailable, validateUser.validatePassword,
    userController.signup,
  );

  app.post('/api/user/login', validateUser.validateEmail, validateUser.validatePassword, userController.login);

  app.put(
    '/api/user/forgotpassword', validateUser.validateEmail, validateUser.isEmailExisting,
    userController.forgotPassword,
  );

  app.put(
    '/api/user/reset/:token', validateUser.validateNewPassword, validateUser.validateToken,
    userController.resetPassword,
  );

  /**
   * TODO REQUESTS
   */
  /* POST Todo */
  app.post(
    '/api/todos', ValidateTodo.ValidateTodo, ValidateTodo.doesTitleExist, validateUser.authenticateUser,
    todoController.create,
  );

  /* GET Todos */
  app.get('/api/todos', validateUser.authenticateUser, todoController.list);

  /* GET Todo by ID */
  app.get(
    '/api/todos/:id', ValidateTodo.checkTodoExists, validateUser.authenticateUser,
    validateUser.confirmOwnership, todoController.findById,
  );

  /* PUT Update Todo */
  app.put(
    '/api/todos/:id', ValidateTodo.checkTodoExists, ValidateTodo.ValidateTodo, validateUser.authenticateUser,
    validateUser.confirmOwnership, todoController.update,
  );

  /* DELETE Todo */
  app.delete(
    '/api/todos/:id', ValidateTodo.checkTodoExists, validateUser.authenticateUser,
    validateUser.confirmOwnership, todoController.delete,
  );


  /**
     * TODO ITEMS REQUESTS
     */
  /* POST Create todo item */
  app.post(
    '/api/todos/:id/item', ValidateTodo.checkTodoExists,
    ValidateItem.ValidateTodoItem, validateUser.authenticateUser,
    validateUser.confirmOwnership, ValidateItem.validateItemCount, todoItemsController.create,
  );

  /* PUT Update todo item */
  app.put(
    '/api/todos/:id/item/:itemId', ValidateTodo.checkTodoExists, ValidateItem.checkItemExists,
    ValidateItem.ValidateTodoItem, validateUser.authenticateUser,
    validateUser.confirmOwnership, validateUser.confirmItemOwnership, todoItemsController.update,
  );

  /* GET get particular item */
  app.get(
    '/api/todos/:id/item/:itemId', ValidateTodo.checkTodoExists,
    ValidateItem.checkItemExists, validateUser.authenticateUser,
    validateUser.confirmOwnership, validateUser.confirmItemOwnership, todoItemsController.getSingle,
  );

  /* GET get all items under a todo */
  app.get(
    '/api/todos/:id/item', ValidateTodo.checkTodoExists, validateUser.authenticateUser,
    validateUser.confirmOwnership, todoItemsController.get,
  );

  /* DELETE TodoItem */
  app.delete(
    '/api/todos/:id/item/:itemId', ValidateTodo.checkTodoExists, ValidateItem.checkItemExists,
    validateUser.authenticateUser, validateUser.confirmOwnership, validateUser.confirmItemOwnership,
    todoItemsController.delete,
  );
};

