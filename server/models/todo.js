
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: {
      type: DataTypes.STRING,
      allowNulls: false,
    },
  }, {});
  Todo.associate = (models) => {
    // associations can be defined here
    Todo.hasMany(models.TodoItem, {
      foreignKey: 'todoId',
      as: 'todoItems',
    });
    Todo.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return Todo;
};
