const router = require('express').Router();
const {User, Families, Member} = require("../../models");
const {authPage, auCourse} = require('../../middlewares/middlewares');
const sequelize = require('../../config/connection');


// GET all data from Families table
router.get('/', (req,res) => {
  Families.findAll({
    // order from A to Z, also you can order it frm Z to A with changing the ASC to DESC
    order: [[
      'familyName', 'ASC'
    ]],
    // /* if you want to get the summary or average of all the id's 
    //    attributes:[
    //      [sequelize.fn('SUM or AVG', sequelize.col('Families.id')), 'achhal']],
    // also if i want to filter by name
    //  where:{
    //    familyName: "maouchi"
    //  }, */
    include: [
      {
        model: Member, 
        attributes: ['id','firstName','lastName','dateOfBirth', 'created_at']
      }
    ]
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


// GET a single family by id
router.get('/:id', (req, res) => { 
  Families.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'familyName'],
      include: [
        {
          model: Member, 
          attributes: ['id','firstName','lastName','dateOfBirth', 'created_at']
        }
      ]
    })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No family found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// GET a single family by familyName
router.get('/searchByFamilyName/:familyName', (req, res) => { 
  Families.findOne({
    where: {
      familyName: req.params.familyName
    },
    attributes: ['id', 'familyName'],
      include: [
        {
          model: Member, 
          attributes: ['id','firstName','lastName','dateOfBirth', 'created_at']
        }
      ]
    })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No family found with this name' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// POST a family 
router.post('/', authPage("1994"), (req,res) => {
  Families.create({
    code: req.body.code,
    familyName: req.body.familyName
  })
    .then(dbFamilyData => res.json(dbFamilyData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})


// dDELETE a family 
router.delete('/:id', (req,res) => {
  Families.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbFamilyData => res.json(dbFamilyData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
})



// UPDATE a family
router.put('/update/:id', (req,res) => {
  Families.update(
    {
      familyName: req.body.familyName
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbFamilyData => res.json(dbFamilyData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
})

module.exports = router;