/**
 * Route handler for incoming requests
 *
 */
const todoController = require('../controllers/todoController');
const todoItemsController = require('../controllers/todoItemsController');

module.exports = (app) => {
  /* GET home page. */
  app.get('/api', (req, res) => {
    res.status(200).send({ message: 'Welcome to TODO api' });
  });

  /**
     * TODO REQUESTS
     */
  /* POST Todo */
  app.post('/api/todos', todoController.create);

  /* GET Todos */
  app.get('/api/todos', todoController.list);

  /* GET Todo by ID */
  app.get('/api/todos/:id', todoController.findById);

  /* PUT Update Todo */
  app.put('/api/todos/:id', todoController.update);

  /* DELETE Todo */
  app.delete('/api/todos/:id', todoController.delete);


  /**
     * TODO ITEMS REQUESTS
     */
  /* POST Create todo item */
  app.post('/api/todos/:id/item', todoItemsController.create);

  /* PUT Update todo item */
  app.put('/api/todos/:id/item/:itemId', todoItemsController.update);

  /* GET get particular item */
  app.get('/api/todos/:id/item/:itemId', todoItemsController.get);

  /* DELETE TodoItem */
  app.delete('/api/todos/:id/item/:itemId', todoItemsController.delete);
};

