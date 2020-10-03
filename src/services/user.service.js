const userMongo = require('../databases/user.db');

async function get(userId) {
  return await userMongo.getUser(userId);
}

async function save(user) {
  return await userMongo.saveUser({ userId: user.id, name: user.name });
}

async function getUsersNames() {
  const users = await userMongo.getUsers();
  return users ? users.map(u => u.name) : [];
}

module.exports = {
  get,
  save,
  getUsersNames
};
