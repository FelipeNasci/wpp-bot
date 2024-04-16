export const email ={
  host: process.env.HOST,
  port: process.env.PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.PASSWORD_EMAIL_SENDER
  }
};