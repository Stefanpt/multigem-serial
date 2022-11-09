require('dotenv').config()
var express = require('express');
const { Router } = require('express');
const { withJWTAuthMiddleware, withMiddleware } = require("express-kun");
const web3Controller = require('../controllers/web3.js');
const { isAdmin } = require('../middleware/isAdmin')
const { hasClaimed } = require('../middleware/hasClaimed')
const router = Router();
const { check, validationResult } = require('express-validator');
const web3 = require('web3');


// const protectedRouter = withJWTAuthMiddleware(router, process.env.TOKEN_SECRET);

// const protectedRoleRouter = withMiddleware(protectedRouter, isAdmin);

const claimOnceRouter = withMiddleware(router, hasClaimed);


router.get("/", web3Controller.base);

claimOnceRouter.get("/claim",[

    check("account")
    .custom(value => {
        const accountCheck = web3.utils.isAddress(value);
        if(!accountCheck){
            return Promise.reject('Not a valid Account');
        }
        return true;
    }),

], web3Controller.claimNft);



module.exports = router;