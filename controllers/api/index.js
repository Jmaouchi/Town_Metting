const router = require('express').Router();
const userRoutes = require('./user-routes');
const familyRoutes = require('./families-routes'); 
const memberRoutes = require('./member-routes');
const commityRoute = require('./commity-route');

router.use('/user', userRoutes);
router.use('/family', familyRoutes);
router.use('/member', memberRoutes);
router.use('/commity', commityRoute);
// router.use('/population', populationRoutes);


module.exports = router;
