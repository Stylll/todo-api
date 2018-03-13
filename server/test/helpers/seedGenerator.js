import { Todos as todoSeeder, TodoItems as todoItemSeeder } from './seedData';
import { existingUser, normalUser, recoverUser, recoverUser2 } from '../helpers/seedUsers';
import { Todo, TodoItem, User } from '../../models';

export const insertBulkUsers = () => {
  const users = [existingUser, normalUser, recoverUser, recoverUser2];
  return User.bulkCreate(users);
};

/**
 * Inserts bulk Users, Todo and Todo items into the db
 */
export const insertBulkUsersTodo = () => {
  const users = [existingUser, normalUser, recoverUser, recoverUser2];
  return User.bulkCreate(users)
    .then(() => {
      return Todo.bulkCreate(todoSeeder)
        .then(() => {
          return TodoItem.bulkCreate(todoItemSeeder);
        });
    });
};
