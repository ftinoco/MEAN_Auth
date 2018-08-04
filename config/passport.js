const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const user 	= require('../models/user');
const config = require('../config/database');

module.exports = function (passport) {
	let opts  = {};
	// Version 2
	//opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
	// Version 3
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
	opts.secretOrKey = config.secret;
	passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
		console.log(jwt_payload);
		user.getUserById(jwt_payload._id, (err, user) => {
			if (err) {
				return done(err, false);
			}

			if (user) {
				return done(null, user);
			}else{
				return done(null, false);
			}
		});
	}));
}