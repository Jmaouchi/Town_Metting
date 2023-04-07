const router = require('express').Router();
const {User, Families, Member} = require("../../models");


// GET all data from Families table
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
router.post('/', (req,res) => {
  Families.create({
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