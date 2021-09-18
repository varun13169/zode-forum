const _ = require('lodash');
const mongoose = require('mongoose');
const Route = require('expressjs-boilerplate').Route;
const postComponent = require('components/posts');
const env = process.env.NODE_ENV || 'development';
const config = require('config')[env];

let route = new Route('POST', '/post/:id', config.authUserTypes);
route.setAuthUsers(['SUPER_ADMIN', 'MODERATOR', 'CUSTOMER']);

// validate params
route.setValidParamsSchemaModel({
    type: 'object',
    properties: {
        id: {type: 'string'},
    },
    required: ['id'],
    additionalProperties: false,
});

// validate body schema
route.setValidBodySchemaModel({
    type: 'object',
    properties: {
      post: {type: 'string'},
    },
    required: ['post'],
    additionalProperties: false,
});

// get post details
route.addMiddleWare((req, res, next) => {
    let postId = req.params.id;

    postComponent.findPostByID(postId)
    .then((postInfo) => {
        res.locals.postInfo = postInfo;
        next();
    })
    .catch(next);
});

// check if post can be updated by user
route.addMiddleWare((req, res, next) => {
    let userRole =  res.locals.authUserInfo.role;
    let userId =  res.locals.authUserInfo.userId;
    let postCreatorId = res.locals.postInfo.userId;

    if(userRole === 'CUSTOMER' && userId !== postCreatorId) {
        throw new Error('User not an owner of post.');
    }

    next();
});

// update post
route.addMiddleWare((req, res, next) => {
    let postId = req.params.id;
    let post = {
        post: req.body.post,
        updatedBy: res.locals.authUserInfo.userId,
    };

    postComponent.updatePostByID(postId, post)
    .then((updatedPost) => {
        res.send({
            post: {
                updatedPost
            }
        })
    })
    .catch(next);
});

module.exports = route.getRouter();