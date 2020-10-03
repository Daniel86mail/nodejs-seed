const userService = require('../services/user.service');

function validateGuid(guid) {
  let guidRegex = '^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}$';
  return guid.match(guidRegex);
}

async function get(req, res) {
  try {
    res.send(await userService.get(req.params.id));
  } catch (err) {
    res.send(500, err);
  }
}

async function save(req, res) {
  try {
    res.send(await userService.save(req.body) /* todo probably needs cleaning */);
  } catch (err) {
    console.error('Failed to save: ', err);s
    res.send(500, err);
  }
}

async function getUsersList(req, res) {
  try {
    res.send(await userService.getUsersNames());
  } catch (err) {
    res.send(500, err);
  }
}

module.exports = {
  get,
  save,
  getUsersList
};
