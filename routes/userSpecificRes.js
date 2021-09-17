const _ = require('lodash')
const Route = require('expressjs-boilerplate').Route;
const env = process.env.NODE_ENV || 'development';
const config = require('config')[env];

let route = new Route('GET', '/user-specific-res', config.authUserTypes);
route.setAuthUsers(['SUPER_ADMIN'])

route.addMiddleWare((req, res, next) => {
  res.locals.token = req.headers.token;
  next();
});

// decode the token
route.addMiddleWare((req, res, next) => {
  let authUserInfo = res.locals.authUserInfo;
  res.send({'decoded': authUserInfo});
});

module.exports = route.getRouter();
