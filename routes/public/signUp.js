const _ = require('lodash')
const userComponent = require('components/users');
const Route = require('expressjs-boilerplate').Route;
const env = process.env.NODE_ENV || 'development';
const config = require('config')[env];

let route = new Route('POST', '/signup', config.authUserTypes);
route.setPublic();

// validate body schema
route.setValidBodySchemaModel({
  type: 'object',
  properties: {
    firstName: {type: 'string'},
    lastName: {type: 'string'},
    email: {type: 'string'},
    password: {type: 'string'},
    role: {
      type: 'string',
      enum: ['ADMIN', 'SUPER_ADMIN', 'CUSTOMER']
    },
  },
  required: ['firstName', 'lastName', 'email', 'password', 'role'],
  additionalProperties: false,
});

// creating user obj and adding to locals
route.addMiddleWare((req, res, next) => {
  let body = req.body;

  let user = {
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: body.password,
    role: body.role
  }

  res.locals.user = user;
  next();
});

// check if user exist
route.addMiddleWare((req, res, next) => {
  let user = res.locals.user;
  let query = {
    email: user.email,
    role: user.role
  }

  userComponent.findUser(query)
  .then((userList) => {
    if(userList.length !== 0) {
      res.send({
      'message': 'User Already exist'
    });
    }
    else {
      next();
    }
  })
  .catch(next);
});

// adding user to the database
route.addMiddleWare((req, res, next) => {
  let user = res.locals.user;
  // db.users.push(user);
  userComponent.createUser(user)
  .then((addedUser)=> {
    res.send({
      'user': addedUser,
    });
  })
  .catch(next);
  
})


module.exports = route.getRouter();