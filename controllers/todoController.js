/**
 * Controller for todo requests
 */

const Todo = require('../server/models').Todo;

/**
 * Create Todo Controller
 * Post Method
 */
module.exports.create = (req,res) => {
        //TO-DO: HANDLE VALIDATION
        return Todo.create({
            title:req.body.title
            })
            .then(todo => res.status(201).send(todo))
            .catch(error => res.status(400).send(error));
    };





