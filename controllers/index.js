const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes')
const loginRoutes = require('./login-route')

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/login', loginRoutes)

router.use((req,res) => {
  res.status(404).end();
});


module.exports = router;