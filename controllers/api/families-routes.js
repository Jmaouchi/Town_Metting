const router = require('express').Router();
// we need this to be able to use the [Op, or]
const {Op } = require('sequelize');
const {User, Families, Member} = require("../../models");
const {authPage, auCourse} = require('../../middlewares/middlewares');
const sequelize = require('../../config/connection');
const { log } = require('console');


// GET all data from Families table
router.get('/', (req,res) => {
  Families.findAll({
    // order from A to Z, also you can order it frm Z to A with changing the ASC to DESC
    order: [[
      'familyName', 'ASC'
    ]],

    /* this will search for this or this, like here, we will search for family name = maouchi or id = 1
    where:{
      // to search for 1 of them or display the data if one of them = true 
       [Op.or] : {familyName: "maouchi", id:1}
       // this to search for both = true
      [Op.and] : {familyName: "maouchi", id:1}
     }, */



    /* if you want to get the summary or average of all the id's
       attributes:[[sequelize.fn('SUM', sequelize.col('Families.id')), 'achhal']],
    also if i want to filter by name
     where:{
       familyName: "maouchi"
     }, */



    /* this will search for the data by comparison
    where:{
      // diplay all the data where id > 10
      id:{
        [Op.gt]: 10
      }
    }, */


    /* this will search for the data by comparison
    where:{
      // diplay all the data where id < 25 or id = null
      id:{
        [Op.or]: {
          [Op,lt] : 25,
          [Op, eq]: null
        }
      }
    }, */



    /* this will search for the data where familyName's length is > 2 characters
    where:
       sequelize.where(sequelize.fn('char_length', sequelize.col('families.familyName')),2),  
    */

     

    /* this will delete all the data that is on the families table without deleting the table
    return Family.destroy({ truncate : true})
    */


    /* this will get the greatest or the lowest id inside the families table
      return Families.max("id")
      return Families.min("id")
      return Families.sum("id", {where : {id: 3 }}) for the summary of all id's where id = 3
    */

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


// get the count
router.get('/sum', (req, res) => {
  Families.findAll({
    attributes: [
      ['id', 'familyName'],
      [sequelize.fn('COUNT', sequelize.col('id')), 'num_families']
    ]
  }).then(dbUserData => {
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
})


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