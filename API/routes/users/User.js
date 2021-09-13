/**var express = require('express');
var router = express.Router();

/* GET users listing. 
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});
*/

class User {
  constructor(email, birthdate, firstName, lastName, gender, password,isPremium) {
    this.email = email;
    this.artist = birthdate;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.password = password;
    this.isPremium = isPremium;
  }
}

module.exports.User = User;

