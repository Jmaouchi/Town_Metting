const router = require('express').Router();
const sequelize = require('../config/connection');
const {User, Families, Member} = require('../models')


// get all
router.get('/', (req,res) => {
  Families.findAll({
    include: [
      {
        model: Member, 
        attributes: ['id','firstName','lastName','dateOfBirth', 'created_at']
      }
    ]
  })
  .then(dbUserData => {
    const familyData = dbUserData.map(data => data.get({plain: true}));
    console.log(familyData);
    res.render('homepage', {
      familyData
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


module.exports = router;