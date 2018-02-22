/**
 * Route handler for incoming requests
 *
 */
const todoController = require('../controllers/todoController');

module.exports = (app) => {
    /* GET home page. */
    app.get('/', function(req, res, next) {
        res.status(200).send({ message: 'Welcome to TODO' });
    });

    /* GET home page. */
    app.get('/api', function(req, res, next) {
        res.status(200).send({ message: 'Welcome to TODO api' });
    });

    /*POST Todo */
    app.post("/api/todos",todoController.create);
}

