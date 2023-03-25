const router = require('express').Router();
const {User} = require("../../models");


// while clicking on that button   
router.get('/', (req, res) => {
  // this will get all the data from the user table and it will exclude the password for us. 
  // but the password is still visible in the database, so we need to hash it 
  User.findAll({
    // exclude password
    attributes: { exclude: ['password'] }
  })
  // then send the data to the user as json 
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router