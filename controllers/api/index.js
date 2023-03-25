const router = require('express').Router();
const userRoutes = require('./user-routes');
const populationRoutes = require('./families-routes') 

router.use('/user', userRoutes);
// router.use('/population', populationRoutes);


module.exports = router;
