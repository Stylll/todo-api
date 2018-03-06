import { Todos as todoSeeder, TodoItems as todoItemSeeder } from './seedData';
import { Todo, TodoItem } from '../../models';

export const insertBulkTodo = () => {
  Todo.bulkCreate(todoSeeder);
};

export const insertBulkTodoItems = () => {
  TodoItem.bulkCreate(todoItemSeeder);
};
