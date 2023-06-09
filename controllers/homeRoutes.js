const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');
const {User, Families, Member, Commity, TownEvents, Help} = require('../models');
const { log } = require('console');


// GET all Families data
router.get('/', withAuth,(req,res) => {
  Families.findAll({
    order: [[
      'familyName', 'ASC'
    ]],
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
router.get('/family/:id', withAuth, (req, res) => { 
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
        res.status(404).json({ message: 'No famille avec ce nom'});
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
      res.render('wrongName')
      return;
    }else if(singleFamilyData === ""){
      res.render('wrongName')
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


// GET all commity members
router.get('/commity', withAuth, (req,res) => {
  Commity.findAll({})
  .then(commity => {
    const commityData = commity.map(data => data.get({plain: true}));
    res.render('commityMembers', {
      commityData
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
})


// GET all Events
router.get('/event',withAuth, (req,res) => {
  TownEvents.findAll({})
  .then(event => {
    const eventData = event.map(data => data.get({plain: true}));
    res.render('event', {
      eventData
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
})


// GET all help tickets
router.get('/help', withAuth, (req,res) => {
  Help.findAll({})
  .then(ticket => {
    const helpData = ticket.map(data => data.get({plain: true}));
    res.render('requestHelp', {
      helpData
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
})


module.exports = router;