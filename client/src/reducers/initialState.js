export default {
  auth: {
    isAuthenticated: false,
    currentUser: {},
    isResetMailSent: false,
    isPasswordReset: false
  },
  todo: {
    singleTodo: {},
    todos: [],
    pagination: {}
  },
  todoItems: [],
  ajaxCallsInProgress: 0
};