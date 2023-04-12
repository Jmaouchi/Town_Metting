const router = require('express').Router();
const {TownEvents} = require('../../models')

// GET all data from Families table
router.get('/', (req,res) => {
  TownEvents.findAll({
  })
  .then(dbEventData => {
    if (!dbEventData) {
      res.status(404).json({ message: 'No Event found with this id' });
      return;
    }
    res.json(dbEventData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


router.post('/', (req,res) => {
  TownEvents.create({
    eventName: req.body.eventName,
    eventAdress: req.body.eventAdress,
    eventDate: req.body.eventDate,
    description: req.body.description
  })
  .then(dbFamilyData => res.json(dbFamilyData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
})


// DELETE an event
router.delete('/:id',(req,res) => {
  TownEvents.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(Eventdata => res.json(Eventdata))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
})


module.exports = router;
