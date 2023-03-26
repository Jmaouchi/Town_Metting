const router = require('express').Router();
const {Member, Families} = require("../../models");


// get all memebers
router.get('/', (req,res) => {
  Member.findAll({
    include: [
      {
        model: Families, 
        attributes: ['familyName']
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


// get one member
router.get('/:id', (req, res) => { 
  Member.findOne({
    attributes: ['id', 'firstName', 'lastName', 'dateOfBirth'],
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Families, 
          attributes: ['familyName']
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



// post a member
router.post('/', (req,res) => {
  Member.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dateOfBirth: req.body.dateOfBirth,
    family_id: req.body.family_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})




// delete a Member
router.delete('/:id', (req,res) => {
  Member.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbMemberData => res.json(dbMemberData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
})



// update a member
router.put('/:id', (req,res) => {
  Member.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
  .then(dbMemberData => res.json(dbMemberData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
})


module.exports = router;