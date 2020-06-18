'use strict';
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId : { type: String, required: true, trim: true, index: true, unique: true},
  name : { type: String, required: true, trim: true}
}, {timestamps: true, autoIndex: false}); /* first time you run on a new DB must remove the auto index to create the index*/
const UserModel = mongoose.model('User', UserSchema);


module.exports = UserModel;