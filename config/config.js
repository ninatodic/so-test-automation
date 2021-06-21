const { BASE_URL, SO_EMAIL, SO_PASSWORD } = process.env;
// const baseUrl = process.env.BASE_URL

const config = {
  baseUrl: BASE_URL,
  email: SO_EMAIL,
  password: SO_PASSWORD,
};

module.exports = config;
