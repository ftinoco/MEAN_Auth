const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const userSchema = mongoose.Schema({
	name: {
		type: String
	},
	email: {
		type: String,
		require: true
	},
	username: {
		type: String,
		require: true
	},
	password: {
		type: String,
		require: true
	},
});

const user = module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = function(id, callback){
	user.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
	//console.log(username);
	user.findOne({username:username}, callback);
}

module.exports.addUser = function(newUser, callback) {
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(newUser.password, salt, (err, hash) => {
			if (err) throw err;

			newUser.password = hash;
			newUser.save(callback);
		});
	});
}

module.exports.comparePassword = function (candidatePwsd, hash, callback) {
	bcrypt.compare(candidatePwsd, hash, (err, isMatch) => {
		if (err) throw err;
		callback(null, isMatch);
	});
}



