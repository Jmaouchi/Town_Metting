const router = require('express').Router();
const { Help }= require("../../models");
const {authPage, auCourse} = require('../../middlewares/middlewares')

// find all
router.get('/', (req,res) => {
  Help.findAll({
  })
  .then(dbHelpData => {
    if (!dbHelpData) {
      res.status(404).json({ message: 'No data' });
      return;
    }
    res.json(dbHelpData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
})


// find one
router.get('/:id', (req,res) => {
  Help.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(dbHelpData => {
    if (!dbHelpData) {
      res.status(404).json({ message: 'No data' });
      return;
    }
    res.json(dbHelpData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
})



router.post('/', (req,res) => {
  Help.create({
    fullName: req.body.fullName,
    numero: req.body.numero,
    issue: req.body.issue
  })
  .then(dbHelpData => {
    if (!dbHelpData) {
      res.status(404).json({ message: 'No data' });
      return;
    }
    res.json(dbHelpData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
})


router.delete('/:id', (req,res) => {
  Help.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbHelpData => {
    if (!dbHelpData) {
      res.status(404).json({ message: 'No data' });
      return;
    }
    res.json(dbHelpData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
})



router.put('/:id', (req,res) => {
  Help.update(req.body,{
    where: {
      id: req.params.id
    }
  })
  .then(dbHelpData => {
    if (!dbHelpData) {
      res.status(404).json({ message: 'No data' });
      return;
    }
    res.json(dbHelpData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
})



module.exports = router