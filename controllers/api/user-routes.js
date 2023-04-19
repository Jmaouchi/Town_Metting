const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');


// send all the data using this api endpoint, and exclude the password from the response
router.get('/', (req, res) => {

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



// find a user by id
router.get('/:id', (req, res) => {
  // this will give us a sigle data object from the user table, where the id is = to the req.params.id
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



// post data to create a new user or signup
router.post('/', (req, res) => {
  // in a post its always a create method that we need to use
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    .then(dbUserData => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
        res.json(dbUserData);
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// check the users login infos
router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that email address!' });
      return;
    }
    //since the password is hashed, we can not check it, cause it will be different in the database
    // what we need to id is to run a function called checkPasswod and then call  bcrypt.compareSync method to hash the password and then compare
    // it, if its the same, then login
    // this function is in the user table
    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }
    // This gives our server easy access to the user's user_id, username, and a Boolean describing whether or not the user is logged in
    // we always need to create our sessoin before we send a response back
    req.session.save(() => {
      // declare session variables
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      // this will set in you client side as a cookie and it will check if you logged in or not
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  });
});


// destroy the session to logout from the page
router.post('/logout', (req, res) => {

  if (req.session.loggedIn) {
    req.session.destroy(() => {
      // the 204 response means that the session has successfully been destroyed.
      res.status(204).end();
    });
  }else {
    res.status(404).end();
  }
});



// delete data from the user table
router.delete('/:id', (req, res) => {
  // in a post its always a create method that we need to use
  User.destroy({
    where:{id: req.params.id}

  })
    .then(dbUserData => {
      if(!dbUserData){
        res.status(404).json({message:'No user found with this id'});
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



// update data  in the user table
router.put('/:id',(req, res) => {

  // pass in req.body instead to only update what's passed through
  User.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



module.exports = router;