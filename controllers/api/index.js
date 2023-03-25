const router = require('express').Router();
const userRoutes = require('./user-routes');
const familyRoutes = require('./families-routes') 
const memberRoutes = require('./member-routes') 

router.use('/user', userRoutes);
router.use('/family', familyRoutes);
router.use('/member', memberRoutes);
// router.use('/population', populationRoutes);


module.exports = router;
