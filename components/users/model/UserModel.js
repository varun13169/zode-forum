const mongoose = require('mongoose');
const uuid = require('uuid');

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v1
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: String,
    ref: 'Users',
    default: '',
  },
  updatedBy: {
    type: String,
    ref: 'Users',
    default: '',
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.post('save', (user) => {
  if(user.createdBy === '') {
    user.createdBy = user._id;
  }
  if(user.updatedBy === '') {
    user.updatedBy = user._id;
  }
});

const UserModel = mongoose.model('Users', UserSchema);
module.exports = UserModel;