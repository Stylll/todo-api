import jwt from 'jsonwebtoken';

require('dotenv').config();

export const existingUser = {
  email: 'livingfaith@yahoo.com',
  username: 'lfaith',
  password: 'living247',
};

export const normalUser = {
  email: 'jamescole@nbc.com',
  username: 'jcole',
  password: 'Iamjames93',
};

export const recoverUser = {
  email: 'stephen.aribaba@yahoo.com',
  username: 'recover',
  password: 'recoverme',
  resetPasswordToken: '2QVwcHW9OyX6SAK',
  resetPasswordExpires: Date.now() + 3600000,
};

export const recoverUser2 = {
  email: 'stephen.aribaba@gmail.com',
  username: 'recovergmail',
  password: 'recovermegmail',
  resetPasswordToken: '2QVwcHqowyX6SAK',
  resetPasswordExpires: Date.now() + 7200000,
};

export const generateToken = (id, user) => {
  const newUser = { id, username: user.username, email: user.email };
  const token = jwt.sign(
    {
      user: newUser,
    },
    process.env.SECRET,
    {
      expiresIn: Number(Date.now() + 30),
    },
  );
  return token;
};

export const existingUserToken = () => generateToken(1, existingUser);

export const normalUserToken = () => generateToken(2, normalUser);

