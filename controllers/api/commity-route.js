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


module.exports = router;