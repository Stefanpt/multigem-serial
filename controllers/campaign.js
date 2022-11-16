const Campaign = require("../models/campaign.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


async function create(req, res) {

  const { campaign_name, campaign_is_open, total_supply } = req.body;

  const newCampaign = new Campaign({
    name: campaign_name,
    isOpen: campaign_is_open,
    supply: total_supply,
  })

  newCampaign
  .save(newCampaign)
  .then(data => {
    res.status(200).json({
      message: "Successfully created campaign"
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the campaign."
    });
  });

}

async function getAll(req, res) {

  Campaign.find({})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Tutorial."
    });
  });

}

async function get(req, res) {

  Campaign.findOne({
    name: req.params.campaign
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Tutorial."
    });
  });

}

async function updateStatus(req, res) {

  const { campaign_is_open } = req.body;

  const { id } = req.params;

  Campaign.findOne({_id: id}).exec(function(error, campaign) {

    if (error) {
      return res.json({
        message: "There was a problem updating the campaign"
      });
    } else if (!campaign) {
      return res.json({
        message: "The campaign could not be found"
      });
    } else {
      campaign.isOpen = campaign_is_open

      campaign.save(function(error) {
        if (error) {
          return res.json({
            message: "There was a problem updating the campaign"
          });
        } else {
          return res.json({
            message: "Successfully updated the campaign"
          });
        }
      })
    }

  })

}

async function remove(req, res) {

  Campaign.deleteOne({
    name: req.params.campaign
  })
  .then(data => {
    res.status(200).send({
      message:
        "Successfully deleted the campaign"
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while deleting the campaign"
    });
  });

}


module.exports = {
  create,
  getAll,
  get,
  remove,
  updateStatus
};