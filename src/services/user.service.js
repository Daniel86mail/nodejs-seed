const userMongo = require('../databases/user.db');

async function get (userId) {
  return userMongo.getUser(userId);
}

async function save (user) {
  return await userMongo.saveUser({ userId: user.id, name: user.name });
}

module.exports = {
  get,
  save
};
