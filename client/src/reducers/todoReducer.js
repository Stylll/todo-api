import * as types from '../actions/actionTypes';
import initialState from './initialState';

const todoReducer = (state = initialState.todo, action) => {
  switch (action.type) {
    case types.GET_TODO_SUCCESS:
      return {
        ...state,
        todos: action.todos.todos,
        pagination: action.todos.pagination
      };
    case types.GET_TODO_FAILED:
      return state;

    case types.SAVE_TODO_SUCCESS:
      return state;

    case types.SAVE_TODO_FAILED:
      return state;

    case types.DELETE_TODO_SUCCESS:
      return state;

    case types.DELETE_TODO_FAILED:
      return state;

    default: 
      return state;
  }
};

export default todoReducer;
