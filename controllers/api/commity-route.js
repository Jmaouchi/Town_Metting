const router = require('express').Router();
const {Commity} = require("../../models");
const {authPage, auCourse} = require('../../middlewares/middlewares')


// GET all data from Families table
router.get('/',(req,res) => {
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
router.post('/', authPage("1994"), (req,res) => {
  Commity.create({
    code: req.body.code,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    role: req.body.role,
    startedDate: req.body.startedDate
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