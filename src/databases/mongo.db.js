'use strict';

const mongoose = require('mongoose');
const logPrefix = "MongoDb: ";

mongoose.Promise = global.Promise;

if (process.env.MONGO_CONNECTION_STR !== '') {
  mongoose.connect(process.env.MONGO_CONNECTION_STR, {useMongoClient: true}).catch((mongoErr) => {
    console.error(`${logPrefix}connection error ${mongoErr}`);
    process.exit(1);
    throw  mongoErr;
  });
}

const cleanup = async () => {
  try {
    mongoose.disconnect();
    console.debug(`${logPrefix}closed`);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// handle graceful exit
process.on('SIGINT', () => {
  cleanup()
    .then(() => process.exit(-1))
    .catch(() => process.exit(-1));
});