import * as types from '../actions/actionTypes';
import initialState from './initialState';

const todoItemReducer = (state = initialState.todoItems, action) => {
  switch (action.type) {
    case types.GET_TODOITEMS_SUCCESS:
      return action.items;
    
    case types.GET_TODOITEMS_FAILED:
      return state;

    case types.SAVE_TODOITEMS_SUCCESS:
      return state;

    case types.SAVE_TODOITEMS_FAILED:
      return state;

    case types.DELETE_TODOITEMS_SUCCESS:
      return state;

    case types.DELETE_TODOITEMS_FAILED:
      return state;

    default:
      return state;
  }
};

export default todoItemReducer;