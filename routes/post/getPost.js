const _ = require('lodash');
const mongoose = require('mongoose');
const Route = require('expressjs-boilerplate').Route;
const postComponent = require('components/posts');
const env = process.env.NODE_ENV || 'development';
const config = require('config')[env];

let route = new Route('GET', '/post/:id', config.authUserTypes);
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

// get post details
route.addMiddleWare((req, res, next) => {
    let postId = req.params.id;

    postComponent.findPostByID(postId)
    .then((post) => {
        res.send(post);
    })
    .catch(next);
});

module.exports = route.getRouter();

