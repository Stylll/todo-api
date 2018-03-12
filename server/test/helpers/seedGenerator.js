import { Todos as todoSeeder, TodoItems as todoItemSeeder } from './seedData';
import { existingUser, normalUser, recoverUser, recoverUser2 } from '../helpers/seedUsers';
import { Todo, TodoItem, User } from '../../models';

export const insertBulkTodo = () => {
  Todo.bulkCreate(todoSeeder);
};

export const insertBulkTodoItems = () => {
  TodoItem.bulkCreate(todoItemSeeder);
};

export const truncateTables = () => {
  // TodoItem.truncate({ cascade: true });
};

export const insertBulkUsers = () => {
  const users = [existingUser, normalUser, recoverUser, recoverUser2];
  User.bulkCreate(users);
};
