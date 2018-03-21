import nodemailer from 'nodemailer';

require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  secure: false,
  auth: {
    user: process.env.EMAIL_ACCOUNT,
    pass: process.env.EMAIL_ACCOUNT_PASSWORD,
  },
});

const mailOptions = (to, subject, html) => ({
  from: '"Slate App" <noreply@slate.com>',
  to,
  subject,
  html,
});

const forgotPasswordMail = (url, resetToken) => (
  `<div>
  <p>You are receiving this because you have
  requested the reset of the password for your account.
    <br>
  Please click on the link below or paste it into your
  browser to complete the process.
    <br>
  Please note that the link is valid for 1 hour only.
    <br>
  <a href='http://${url}/reset/${resetToken}'>http://${url}/reset/${resetToken}</a>
    <br>
  If you did not request this, please ignore this
  email and your password will remain unchanged.
  </p>
  </div>`
);

const passwordResetMail = (url, username) => (
  `<div>
  <p>Hello ${username},
    <br>
  Your password has been successfully changed.
    <br>
  Click <a href='http://${url}/login'>here</a> 
  to login
  </p>
  </div>`
);

export { transporter, mailOptions, forgotPasswordMail, passwordResetMail };

