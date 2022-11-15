require('dotenv').config()
var express = require('express');
const { Router } = require('express');
const { withJWTAuthMiddleware, withMiddleware } = require("express-kun");
const campaignController = require('../controllers/campaign.js');
const { catchValidationError } = require('../middleware/validationError')
const router = Router();
const { check, validationResult } = require('express-validator');


    const protectedRouter = withMiddleware(router, 
    [
        // isAdmin,
        // hasClaimed,
        // claimLimiter
        // catchValidationError
    ]);

    protectedRouter.post('/', campaignController.create)

    protectedRouter.get('/', campaignController.getAll)

    protectedRouter.get('/:campaign', campaignController.get)

    protectedRouter.delete('/:campaign', campaignController.remove)

    router.put('/:id', [
        check("id")
        .isLength({min: 2, max:3})
        .bail()
    ], campaignController.updateStatus)

module.exports = router;