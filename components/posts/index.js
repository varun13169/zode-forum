const PostModel = require('./model/PostModel.js');

const postComponent = {};

postComponent.createPost = function(post) {
  let newPost = new PostModel(post);
  return newPost.save();
}

postComponent.findPost = function(query) {
  return PostModel.find(query);
}

module.exports = postComponent;








