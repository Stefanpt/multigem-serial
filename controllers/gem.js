const Gem = require("../models/gem.js");
const crypto = require('crypto')


async function save(req, res) {

  const request = JSON.stringify(req.body)

  let hash_sting = crypto.createHash('md5').update(request).digest("hex")

  const gem = await Gem
  .findOne({
    serial: hash_sting
  })

  if(gem){
    return res.render('index', { title: 'Failed to create Gem', message: "That gem already exists"})
  }

  const newGem = new Gem({
    name: req.body.name,
    origin: req.body.origin,
    weight: req.body.weight,
    clarity: req.body.clarity,
    cut: req.body.cut,
    measurement: req.body.measurement,
    color: req.body.color,
    treatment: req.body.treatment,
    price: req.body.price,
    serial: hash_sting
  })

  newGem
  .save(newGem)
  .then(data => {
    res.render('list_gem', { title: 'Successfully created Gem', gem: data})
  })
  .catch(err => {
    res.render('index', { title: 'Failed to create Gem', message: err})
  });

}

async function create(req, res) {

  res.render('create_gem', { title: 'Enter Gem information'})

}

async function index(req, res) {

  res.render('index', { title: 'Welcome to Multigem!'})

}

async function getAll(req, res) {

  Gem
  .find({})
  .then(data => {
    res.render('list_gems', { title: 'All Gems', gems: data})
  })
  .catch(err => {
    res.render('index', { title: 'Failed to find Gems', message: err})
  });
  
}

async function getById(req, res) {
  
  Gem
  .findOne({
    _id: req.params.id
  })
  .then(data => {
    res.render('list_gem', { title: 'Single Gem', gem: data})
  })
  .catch(err => {
    res.render('index', { title: 'Failed to find Gem', message: err})
  });

}

async function remove(req, res) {

  Gem
  .findOne({
    _id: req.params.id
  })
  .then(data => {
    res.render('delete_gem', { title: 'Are you sure you want to delete this gem?', gem: data})
  })
  .catch(err => {
    res.render('index', { title: 'Failed to find Gem', message: err})
  });

}

async function confirm_delete(req, res) {

  Gem.findByIdAndRemove({
    _id: req.body.id
  })
  .then(data => {
    res.render('index', { title: 'Gem Deleted', message: "Successfully Deleted gem"})
  })
  .catch(err => {
    res.render('index', { title: 'Failed to delete Gem', message: err})
  });

}

async function update(req, res) {

  Gem
  .findOne({
    _id: req.params.id
  })
  .then(data => {
    res.render('update_gem', { title: 'Update Gem', gem: data})
  })
  .catch(err => {
    res.render('index', { title: 'Failed to find Gem', message: err})
  });

}

async function confirm_update(req, res) {
  
  Gem.findOne({ serial: req.body.serial }).exec(function(error, gem) {
    if (error) {
      res.render('index', { title: 'Failed to update Gem', message: error})
    } else if (!gem) {
      res.render('index', { title: 'Failed to update Gem'})
    } else {

      gem.name = req.body.name,
      gem.origin = req.body.origin,
      gem.weight = req.body.weight,
      gem.clarity = req.body.clarity,
      gem.cut = req.body.cut,
      gem.measurement = req.body.measurement,
      gem.color = req.body.color,
      gem.treatment = req.body.treatment,
      gem.price = req.body.price,
      gem.serial = req.body.serial

      gem.save(function(error) {
        if (error) {
          res.render('index', { title: 'Failed to update Gem', message: error})
        } else {
          res.render('index', { title: 'Gem updated successfully'})
        }
      })

    }
  })
}


module.exports = {
  index,
  create,
  save,
  getAll,
  getById,
  remove,
  confirm_delete,
  update,
  confirm_update
};