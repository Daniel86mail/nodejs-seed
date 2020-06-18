const testService = require('../services/test.service');

const test1 = async (req, res) => {
  try {
    const data = await testService.test1();
    res.status(200).json(data);
  } catch (err) {
    if (err.message !== 'expected') throw err;
    res.status(400).send(err.message);
  }
};

module.exports = {
  test1
};