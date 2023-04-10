const router = require('express').Router();
const {Commity} = require("../../models");


// GET all data from Families table
router.get('/', (req,res) => {
  Commity.findAll({})
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({ message: 'No commity member found with this id' });
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


// POST a commity member
router.post('/', (req,res) => {
  Commity.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dateOfBirth: req.body.dateOfBirth,
  })
  .then(dbCommityData => res.json(dbCommityData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
})



// DELETE a commity memeber
router.delete('/:id', (req,res) => {
  Commity.destroy({
    where:{
      id: req.params.id
    }
  })
  .then(dbCommityData => res.json(dbCommityData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
})


module.exports = router;