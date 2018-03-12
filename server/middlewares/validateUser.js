import validator from 'validator';
import { User } from '../models';

const validateUser = {
  /**
   * validate if email was provided in the request and if its in the proper format
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * returns error 400 if not valid, else calls the next function
   */
  validateEmail(req, res, next) {
    // check if email is provided
    if (!req.body.email || req.body.email === '') return res.status(400).send({ message: 'Email is required' });
    // check if email is valid
    if (!validator.isEmail(req.body.email)) return res.status(400).send({ message: 'Please enter a valid email.' });

    return next();
  },

  /**
   * checks if an email already exists in the db
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  isEmailAvailable(req, res, next) {
    User.findOne({
      where: {
        email: validator.trim(req.body.email),
      },
    }).then((user) => {
      if (user) {
        return res.status(409).send({ message: 'Email already exists. Please use another one!.' });
      }
      return next();
    }).catch(() => res.status(500).send({ message: 'An error occured, please try again later.44' }));
  },

  /**
   * Validates if email actually exists in the db
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * returns error if email does not exist, else calls the next function
   */
  isEmailExisting(req, res, next) {
    User.findOne({
      where: {
        email: validator.trim(req.body.email),
      },
    }).then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Email does not exist' });
      }
      return next();
    }).catch(() => res.status(500).send({ message: 'An error occured, please try again later.' }));
  },

  /**
   * Validates the username passed in the request
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * returns error if not valid, else calls the next function
   */
  validateUsername(req, res, next) {
    // check if username was supplied
    if (!req.body.username || req.body.username === '') {
      return res.status(400).send({ message: 'Username is required' });
    }
    return next();
  },

  /**
   * checks if username already exists in the db
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * returns error if exists, else calls the next function
   */
  isUsernameAvailable(req, res, next) {
    User.findOne({
      where: {
        username: req.body.username,
      },
    }).then((user) => {
      if (user) {
        return res.status(409).send({ message: 'Username already exists. Please use another one!.' });
      }
      return next();
    }).catch(() => res.status(500).send({ message: 'An error occured, please try again later.88' }));
  },

  /**
   * validates the password passed in the request
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * returns error if not valid, else calls the next function
   */
  validatePassword(req, res, next) {
    // check if password was entered
    if (!req.body.password || req.body.password === '') {
      return res.status(400).send({ message: 'Please enter a valid password.' });
    }
    return next();
  },

  /**
   * validates the new password passed in the request
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * returns error if not valid, else calls the next function
   */
  validateNewPassword(req, res, next) {
    // check if password was entered
    if (!req.body.password || req.body.password === '') {
      return res.status(400).send({ message: 'Please enter a new password' });
    }
    return next();
  },

  /**
   * validates password token if its associated with any user
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * returns error if not, else calls next function
   */
  validateToken(req, res, next) {
    console.log('param token: ', req.params.token);
    User.findOne({
      where: {
        resetPasswordToken: req.params.token,
      },
    }).then((user) => {
      if (!user) {
        return res.status(400).send({ message: 'Password Token is invalid or has expired' });
      }
      return next();
    }).catch(() => res.status(500).send({ message: 'An error occured, please try again later.' }));
  },
};

export default validateUser;

