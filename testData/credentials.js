const config = require('../config/config');

const credentials = {
  noUserNameCredentials: {
    password: '123456',
  },
  noPasswordCredentials: {
    email: 'examplemail@gmail.com',
  },
  incorectEmailCredentials: {
    email: 'examplemail',
    password: '123456',
  },
  unexistingUserCredentials: {
    email: 'examplemail@gmail.com',
    password: 123456,
  },
  incorrectPasswordCredentials: {
    email: config.email,
    password: 123456,
  },
  correctCredentials: {
    email: config.email,
    password: config.password,
  },
};

module.exports = { credentials };
