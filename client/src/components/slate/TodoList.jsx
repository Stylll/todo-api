import React from 'react';
import PropTypes from 'prop-types';
import TodoListRow from './TodoListRow';

const TodoList = ({todos, handleDelete}) => {
  return (
    <div className="container">
      <ul className="collection">
        {todos.map(todo => <TodoListRow key={todo.id} todo={todo} handleDelete={handleDelete} />)}
      </ul>
    </div>
  );
};

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default TodoList;