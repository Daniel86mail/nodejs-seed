'use strict';

const mongoose = require('mongoose');
const UserModel = require("../models/example.model");

const logPrefix = "ExampleMongoDb: ";

mongoose.Promise = global.Promise;

if (process.env.MONGO_CONNECTION_STR !== '')
mongoose.connect(MONGO_CONNECTION_STR, {useMongoClient: true}).catch((mongoErr) => {
  console.error(`${logPrefix}connection error ${mongoErr}`);
  process.exit(1);
  throw  mongoErr;
});


async function getUser(userId) {
  try {
    const user = await UserModel.findOne({userId});
    if (!user) {
      console.debug(`${logPrefix}${userId} not in db`);
      return null;
    }
    console.debug(`${logPrefix}${userId} found, returning ${JSON.stringify(user)}`);
    return user;
  } catch (e) {
    console.error(`${logPrefix}Error during find by id ${userId}: ${e}`);
    throw e;
  }
}

async function deleteUser(userId) {
  try {
    await UserModel.deleteOne({userId});
  } catch (e) {
    console.error(`${logPrefix}Error during delete with id ${userId}: ${e}`);
    throw e;
  }
}

async function saveUser(user) {
  try {
    const savedUser = await UserModel.findOneAndUpdate({userId: user.userId}, user, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
      runValidators: true
    });
    console.debug(`${logPrefix}${savedUser.userId} saved, returning ${JSON.stringify(savedUser)}`);
    return savedUser;
  } catch (e) {
    console.error(`${logPrefix}Error during save ${user.userId}: ${e}`);
    throw e;
  }
}

async function findUsersByName(name) {
  try {
    const results = await UserModel.find({name: {"$regex": name, "$options": "i"}},);
    return results;
  } catch (e) {
    console.error(`${logPrefix}Error during find all matching (partial) name ${name}: ${e}`);
    throw e;
  }
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

module.exports = {
  getUser,
  deleteUser,
  saveUser,
  findUsersByName
};