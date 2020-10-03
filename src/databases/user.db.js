'use strict';

const UserModel = require("./models/user.model");

const logPrefix = "UsersDb: ";

async function getUser(userId) {
  try {
    const user = await UserModel.findOne({userId}).lean();
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
    }).lean();
    console.debug(`${logPrefix}${savedUser.userId} saved, returning ${JSON.stringify(savedUser)}`);
    return savedUser;
  } catch (e) {
    console.error(`${logPrefix}Error during save ${user.userId}: ${e}`);
    throw e;
  }
}

async function findUsersByName(name) {
  try {
    const results = await UserModel.find({name: {"$regex": name, "$options": "i"}}).lean();
    return results;
  } catch (e) {
    console.error(`${logPrefix}Error during find all matching (partial) name ${name}: ${e}`);
    throw e;
  }
}

async function getUsers() {
  try {
    return await UserModel.find().lean();
  } catch (e) {
    console.error(`${logPrefix}Error during find all matching (partial) name ${name}: ${e}`);
    throw e;
  }
}

module.exports = {
  getUser,
  deleteUser,
  saveUser,
  findUsersByName,
  getUsers
};