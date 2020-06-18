module.exports = (mongoose) => {
  const Test = mongoose.model('Test', mongoose.Schema({
    '_id': String,
    'testName': String,
    'testData': String
  }));

  return {
    Test
  };
};
