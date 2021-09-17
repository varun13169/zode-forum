const _ = require('lodash');
const mongoose = require('mongoose');
const Route = require('expressjs-boilerplate').Route;
const postComponent = require('components/posts');
const env = process.env.NODE_ENV || 'development';
const config = require('config')[env];

let route = new Route('POST', '/post', config.authUserTypes);
route.setAuthUsers(['SUPER_ADMIN', 'MODERATOR', 'CUSTOMER'])

// validate body schema
route.setValidBodySchemaModel({
    type: 'object',
    properties: {
      post: {type: 'string'},
    },
    required: ['post'],
    additionalProperties: false,
});

// reate post
route.addMiddleWare((req, res, next) => {
  let authUserInfo = res.locals.authUserInfo;

  let post = {
      userId: authUserInfo.userId,
      post: req.body.post,
  }

  postComponent.createPost(post)
  .then((p) => {
    res.send(p)
  })
  .catch(next);

});

module.exports = route.getRouter();