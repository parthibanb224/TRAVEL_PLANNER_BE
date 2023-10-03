const express = require('express');
const APP_SERVER = express();

// APP_SERVER.use('/',(req,res,next) => {
//     res.send('<h1>Diary Manager</h1>')
// });
APP_SERVER.use('/signup', require('./controllers/SignUp.controller'));
APP_SERVER.use('/users', require('./controllers/users.controller'));
APP_SERVER.use('/login', require('./controllers/Login.controller'));
APP_SERVER.use('/forgot', require('./controllers/Forgot.controller'));
APP_SERVER.use('/reset', require('./controllers/reset.controller'));
APP_SERVER.use('/updateUser', require('./controllers/UpdateUser.controller'));
APP_SERVER.use('/image', require('./controllers/image.controller'));
APP_SERVER.use('/trips', require('./controllers/Trips.controller'));
APP_SERVER.use('/destination', require('./controllers/Destination.controller'));


APP_SERVER.use(express.static('public'));

module.exports = APP_SERVER;