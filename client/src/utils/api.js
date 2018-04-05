/**
 * Object that stores api endpoints
 */
const api = {
  user: {
    signIn: '/api/user/login',
    signUp: '/api/user/signup',
    forgotPassword: '/api/user/forgotpassword',
    resetPassword: '/api/user/reset'
  },
  todo: {
    create: '/api/todos',
    update: '/api/todos',
    get: '/api/todos',
    getById: '/api/todos',
    delete: '/api/todos'
  },
  todoItem: {
    create: (todoId) => `/api/todos/${todoId}/item`,
    update: (todoId, itemId) => `/api/todos/${todoId}/item/${itemId}`,
    get: (todoId) => `/api/todos/${todoId}/item`,
    getById: (todoId, itemId) => `/api/todos/${todoId}/item/${itemId}`,
    delete: (todoId, itemId) => `/api/todos/${todoId}/item/${itemId}`,
  }
};

export default api;