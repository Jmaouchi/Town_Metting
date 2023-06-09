const router = require('express').Router();

router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    res.render('homepage');
    return;
  }
  res.render('login');
});

module.exports = router;
