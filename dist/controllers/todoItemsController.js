"use strict";

/**
 * Controller to handle TodoItems request
 */
var TodoItem = require('../server/models').TodoItem;

/**
 * Create todoItem
 * @param {*} req 
 * @param {*} res 
 */
module.exports.create = function (req, res) {

    //TODO: Validate req params

    return TodoItem.create({
        content: req.body.content,
        complete: req.body.complete === "true" ? true : false,
        todoId: req.params.id
    }).then(function (item) {
        return res.status(201).send(item);
    }).catch(function (error) {
        return res.status(400).send(error);
    });
};

/**
 * Updates TodoItem
 * @param {*} req 
 * @param {*} res 
 */
module.exports.update = function (req, res) {
    console.log("item update called");
    return TodoItem.find({
        where: {
            id: req.params.itemId,
            todoId: req.params.id
        }
    }).then(function (todoItem) {
        console.log("item:", todoItem);
        if (!todoItem) {
            return res.status(404).send({ message: "Todo item not found" });
        }
        return todoItem.update({
            content: req.body.content || todoItem.content,
            complete: req.body.complete === "true" ? true : false
        }).then(function (todoItem) {
            console.log("here 2");
            return res.status(200).send(todoItem);
        }).catch(function (error) {
            console.log("error:", error);
            return res.status(400).send(error);
        });
    }).catch(function (error) {
        return res.status(400).send(error);
    });
};

/**
 * Get particular item by id
 * @param {*} req 
 * @param {*} res 
 */
module.exports.get = function (req, res) {
    return TodoItem.findAll({
        where: {
            id: req.params.itemId,
            todoId: req.params.id
        }
    }).then(function (todoItem) {
        if (!todoItem) {
            return res.status(404).send({ message: "Todo Item not found" });
        }
        return res.status(200).send(todoItem);
    }).catch(function (error) {
        return res.status(400).send(error);
    });
};

/**
 * Delete a particular item
 * @param {*} req 
 * @param {*} res 
 */
module.exports.delete = function (req, res) {
    return TodoItem.findAll({
        where: {
            id: req.params.itemId,
            todoId: req.params.id
        }
    }).then(function (todoItem) {
        if (!todoItem) {
            return res.status(404).send({ message: "Todo item not found" });
        }
        return todoItem.destroy().then(function (todoItem) {
            return res.status(204).send();
        }).catch(function (error) {
            return res.status(400).send(error);
        });
    }).catch(function (error) {
        return res.status(400).send(error);
    });
};