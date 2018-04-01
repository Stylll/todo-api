import React from 'react';
import PropTypes from 'prop-types';
import TodoListRow from './TodoListRow';

const TodoList = ({todos}) => {
  return (
    <div className="container">
      <ul className="collection">
        {todos.map(todo => <TodoListRow key={todo.id} todo={todo} />)}
      </ul>
    </div>
  );
};

TodoList.propTypes = {
  todos: PropTypes.array.isRequired
};

export default TodoList;