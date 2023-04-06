const router = require('express').Router();
const sequelize = require('../config/connection');
const {User, Families, Member} = require('../models')


// GET all Families data
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


// GET a single family
router.get('/family/:id', (req, res) => { 
  Families.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'familyName'],
      include: [
        {
          model: Member, 
          attributes: ['id', 'firstName', 'lastName', 'dateOfBirth', 'created_at']
        }
      ]
    })
    .then(singleFamily => {
      if (!singleFamily) {
        res.status(404).json({ message: 'No family found with this id' });
        return;
      }
      // serialize the data to get only whatever we data is needed
      const singleFamilyData = singleFamily.get({ plain: true });
      console.log(singleFamilyData);

      // pass data to template
      res.render('singleFamily', {
        // use that data on the single-post handlebars file
        singleFamilyData
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.get('/event', (req,res) => {
  Families.findAll({})
  .then(dbUserData => {
    const familyData = dbUserData.map(data => data.get({plain: true}));
    console.log(familyData);
    res.render('event', {
      familyData
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
})


module.exports = router;