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
  }
};

export default api;