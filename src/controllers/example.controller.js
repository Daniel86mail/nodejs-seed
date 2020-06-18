const exampleService = require('../services/example.service');

function validateGuid(guid) {
  let guidRegex = '^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}$';
  return guid.match(guidRegex);
}

async function get(req, res) {
  try {
    res.send(await exampleService.get());
  } catch (err) {
    res.send(500, err);
  }
}

async function save(req, res) {
  try {
    res.send(await exampleService.save(req.body) /* todo probably needs cleaning */);
  } catch (err) {
    res.send(500, err);
  }
}

module.exports = {
  get,
  save
};
