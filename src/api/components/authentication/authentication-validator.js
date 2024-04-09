const joi = require('joi');

module.exports = {
  login: {
    body: {
      email: joi.string().email().required().label('Email'),
      password: joi.string().required().label('Password'),
      password_confirm: joi
        .string()
        .required()
        .valid(joi.ref('password'))
        .messages({ 'any.only': 'Passwords do not match' })
        .label('Password Confirmation'),
    },
  },
};
