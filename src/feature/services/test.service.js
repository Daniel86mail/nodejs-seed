const db = require('../db');
const fs = require('fs');
const rp = require('request-promise');
const { promisify } = require('bluebird');

const readFile = promisify(fs.readFile, { context: fs });
const writeFile = promisify(fs.writeFile, { context: fs });

const test1fileName = './test1.txt';

const test1 = async () => {
  try {
    const data = await readFile(test1fileName);
    return JSON.parse(data.toString());
  } catch (err) {
    if (err.errno !== -4058) 
      throw err;
    const doc = await db.models.Test.findOne({ testName: 'test1' });
    if (doc) {
      await writeFile(test1fileName, doc.testData);
      return JSON.parse(doc.testData);
    }

    const response = await getDataFromWeb();
    const test = new db.models.Test({
      _id: 'test1',
      testName: 'test1',
      testData: JSON.stringify(response)
    });
    await test.save();
    await writeFile(test1fileName, JSON.stringify(response));
    return response;         
  }
};

const getDataFromWeb = async () => {
  const url = 'http://stg-authorization.playbuzz.com/entity';
  const options = {
    method: 'GET',
    uri: url,
    json: true
  };
  return await rp(options);
};

module.exports = {
  test1
};