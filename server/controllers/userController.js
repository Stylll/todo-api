import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import randomstring from 'randomstring';
import { User } from '../models';
import { transporter, mailOptions, forgotPasswordMail, passwordResetMail } from '../utils/nodemailer';


require('dotenv').config();

const userController = {
  /**
   * creates account for user and generates token
   * @param {*} req
   * @param {*} res
   * @return {object} returns user object if created or error if not
   */
  signup(req, res) {
    return User.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    }).then((user) => {
      if (user) {
        const newUser = { id: user.id, username: user.username, email: user.email };
        const token = jwt.sign(
          {
            user: newUser,
          },
          process.env.SECRET,
          {
            expiresIn: Number(Date.now() + 30),
          },
        );
        return res.status(201).send({
          message: 'Signup successful',
          user: newUser,
          token,
        });
      }
      return res.status(501).send({ message: 'An error occured. Please try again later.' });
    }).catch(() => res.status(503).send({ message: 'An error occured. Please try again later.' }));
  },

  /**
   * Authenticates and logs user in
   * @param {*} req
   * @param {*} res
   * @return {object} returns user object & token if successful, else error message
   */
  login(req, res) {
    return User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const newUser = { id: user.id, username: user.username, email: user.email };
          const token = jwt.sign(
            {
              user: newUser,
            },
            process.env.SECRET,
            {
              expiresIn: Number(Date.now() + 30),
            },
          );
          return res.status(200).send({
            message: 'Login successful',
            user: newUser,
            token,
          });
        }
        return res.status(401).send({ message: 'Email or Password is incorrect.' });
      }
      return res.status(401).send({ message: 'Email or Password is incorrect.' });
    }).catch(() => res.status(500).send({ message: 'Internal Server Error' }));
  },

  /**
   * Generates reset password token and sends to user
   * @param {*} req
   * @param {*} res
   * @returns {object} returns success message after email is sent to user
   */
  forgotPassword(req, res) {
    const resetToken = randomstring.generate(30);
    return User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      return user.update({
        resetPasswordToken: resetToken,
        resetPasswordExpires: Date.now() + 3600000,
      }).then(() => {
        const to = user.email;
        const subject = 'Todo App Password Reset';
        transporter.sendMail(
          mailOptions(to, subject, forgotPasswordMail(req.headers.host, resetToken)),
        ).then(() => {
          res.status(200).send({ message: `An email has been sent to ${user.email} for further instructions.` });
        }).catch(() => res.status(500).send({ message: 'Internal Server Error' }));
      }).catch(() => res.status(500).send({ message: 'Internal Server Error' }));
    });
  },

  /**
   * updates user password with new password if token matched
   * @param {*} req
   * @param {*} res
   * @returns {object} returns success message if password is reset successfully
   */
  resetPassword(req, res) {
    User.findOne({
      where: {
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() },
      },
    }).then((user) => {
      if (user) {
        return user.update({
          password: req.body.password,
          resetPasswordToken: null,
          resetPasswordExpires: null,
        }).then(() => {
          const to = user.email;
          const subject = 'Todo App: Password Reset Successful';
          transporter.sendMail(
            mailOptions(to, subject, passwordResetMail(req.headers.host, user.username)),
          ).then(() => {
            res.status(200).send({ message: 'Password reset successful' });
          }).catch(() => res.status(500).send({ message: 'Internal Server Error' }));
        }).catch(() => res.status(500).send({ message: 'Internal Server Error' }));
      }
      return res.status(400).send({ message: 'Password Token is invalid or has expired' });
    });
  },
};

export default userController;
