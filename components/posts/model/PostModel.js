const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid');

const PostSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v1
  },
  userId: {
    type: String,
    ref: 'Users',
    required: true,
  },
  post: {
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

PostSchema.post('save', (post) => {
  if(post.createdBy === '') {
    post.createdBy = post._id;
  }
  if(post.updatedBy === '') {
    post.updatedBy = post._id;
  }
});

const PostModel = mongoose.model('Posts', PostSchema);
module.exports = PostModel;