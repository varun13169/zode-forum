const PostModel = require('./model/PostModel.js');

const postComponent = {};

/**
 * Create a new post.
 * 
 * @param {Object} post - post details.
 * @return {Promise} promise with the new post details.
 */
postComponent.createPost = function(post) {
  let newPost = new PostModel(post);
  return newPost.save();
}

/**
 * Find post by ID.
 * 
 * @param {String} id - post uuid.
 * @return {Promise} promise with the new post details.
 */
postComponent.findPostByID = function(id) {
  return PostModel.findById(id).exec();
}

/**
 * Update post by ID.
 * 
 * @param {String} id - post uuid.
 * @param {Object} id - post object with updated keys.
 * @return {Promise} promise with the new post details.
 */
postComponent.updatePostByID = function(id, post) {
  let filter = {
    _id: id
  }
  return PostModel.updateOne(filter, post);
}

module.exports = postComponent;








