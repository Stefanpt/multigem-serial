require('dotenv').config()
var express = require('express');
const { Router } = require('express');
const { withJWTAuthMiddleware, withMiddleware } = require("express-kun");
const web3Controller = require('../controllers/web3.js');
const { isAdmin } = require('../middleware/isAdmin')
const { hasClaimed } = require('../middleware/hasClaimed')
const { isMobile } = require('../middleware/isMobile')
const { catchValidationError } = require('../middleware/validationError')
const { 
    isOpen,
    validSupply,
    validCampaign 
} = require('../middleware/campaign_middleware')
const router = Router();
const { check, validationResult } = require('express-validator');
const web3 = require('web3');
const rateLimit = require('express-rate-limit')


const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 2, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    skipFailedRequests: true
})


// const protectedRouter = withJWTAuthMiddleware(router, process.env.TOKEN_SECRET);

    const protectedRouter = withMiddleware(router, 
    [
        // isAdmin,
        // isMobile
        apiLimiter
    ]);

    const claimOnceRouter = withMiddleware(router, hasClaimed);

    protectedRouter.get("/", web3Controller.base);

    router.get("/claim",[
        check("account")
        .custom(value => {
            const accountCheck = web3.utils.isAddress(value);
            if(!accountCheck){
                return Promise.reject('Not a valid Account');
            }
            return true;
        }),
        catchValidationError,
        validCampaign,
        validSupply,
        isOpen
    ], web3Controller.claimNft);

    router.get("/getClaims", web3Controller.getClaims)

module.exports = router;