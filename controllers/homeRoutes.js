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


// GET a single family by id
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


// GET a single family by family Name
router.get('/family/searchByFamilyName/:familyName', (req,res) => {
  Families.findOne({
    where:{
      familyName: req.params.familyName
    },
    attributes: ['id','familyName'],
    include: [
      {
        model: Member, 
        attributes: ['id', 'firstName', 'lastName', 'dateOfBirth', 'created_at']
      }
    ]
  })
  .then(singleFamilyData => {
    console.log(singleFamilyData);
    if (!singleFamilyData) {
      res.status(404).json({ message: 'No family found with this name' });
      return;
    }
    // serialize the data to get only whatever we data is needed
    const singleFamilyName  = singleFamilyData.get({ plain: true });
    console.log(`single data is here ${singleFamilyName}`);

    // pass data to template
    res.render('singleFamilyByFamilyName', {
      // use that data on the single-post handlebars file
      singleFamilyName
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
})


// GET all events
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