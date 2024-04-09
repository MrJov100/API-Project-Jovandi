const joi = require('joi');

module.exports = {
  login: {
    body: {
      email: joi.string().email().required().label('Email'),
      password: joi.string().required().label('Password'),
      password_confirm: joi
        .string()
        .valid(joi.ref('Password Confirm'))
        .required(), // Ensure password_confirm matches password
    },
  },
};
