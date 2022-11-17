const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { check, validationResult } = require('express-validator');
const Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');
const contract = require('../web3/contract.json');
const Claim = require("../models/claim.js");
const Campaign = require("../models/campaign.js");


const contractAddress =  process.env.CONTRACT_ADDRESS
const privateKey =  process.env.PRIVATE_KEY
const infuraUrl = process.env.INFURA_URL
const adminWalletAddress = process.env.ADMIN_WALLET_ADDRESS


async function base(req, res) {

  const { account } = req.params;

  res.json({
    message: account
  });

}

// TODO: 
//      check which tokenIDs are still held by proxy wallet
async function claimNft(req, res) {

  const { account, campaign } = req.query;

  let tokenId;

  const provider = new Provider(privateKey, infuraUrl); 
  const web3 = new Web3(provider);
  const networkId = await web3.eth.net.getId();
  const myContract = new web3.eth.Contract(
    contract.abi,
    contractAddress
  );

  myContract.methods.mintForAddress(1, account).send({from: adminWalletAddress})
  .then(function(receipt){

    tokenId = receipt.events.Transfer.returnValues.tokenId
    
    const newClaim = new Claim({
      tokenId: tokenId,
      time: new Date(),
      address: account
    })
  
    newClaim.save(function(error, newItem) {
      if (error) {
        console.log("failed to log claim", newClaim)
      } else {
        console.log("claim successfully logged")
      }
    })
    
    Campaign.findOne({name: campaign}).exec(function(error, campaign) {

      // Reduce supply by one in the DB
      campaign.supply = campaign.supply - 1

      // Close campaign if supply reches 0 with THIS request
      if(campaign.supply == 0){
        campaign.isOpen = false
      }

      campaign.save(function(error) {
        if (error) {
          console.log("Failed to update supply", error)
        } else {
          console.log("Successfully updated supply")
        }
      })
      
    })

    return res.status(200).json({
      message: "Successfully Minted",
      newTokenId: tokenId
    });

  })
  .catch(function(error){
      console.log("error: ", error);

      const newClaim = new Claim({
        tokenId: error.message,
        time: new Date(),
        address: account
      })
    
      newClaim.save(function(error, newItem) {
        if (error) {
          console.log("failed to log claim: ", newClaim)
        } else {
          console.log("claim successfully logged")
        }
      })

      return res.status(200).json({
        message: "There was a problem minting",
        error: true,
        errors: error.message
      });
      

  });

}

async function getClaims(req, res) {
  
    const claims = await Claim.find({});
    res.json({
      claims
    });
    
}

module.exports = {
  claimNft,
  base,
  getClaims
};