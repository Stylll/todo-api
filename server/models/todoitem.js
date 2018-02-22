'use strict';
module.exports = (sequelize, DataTypes) => {
  var TodoItem = sequelize.define('TodoItem', {
    content: {
      type: DataTypes.STRING,
      allowNulls:false,
    },
    complete: {
      type:DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {});
  TodoItem.associate = function(models) {
    // associations can be defined here
    TodoItem.belongsTo(models.Todo,{
      foreignKey:"todoId",
      onDelete:"CASCADE",
    })
  };
  return TodoItem;
};