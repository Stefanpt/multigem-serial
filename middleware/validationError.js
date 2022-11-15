
require('dotenv').config();
const { check, validationResult } = require('express-validator');


function catchValidationError(req, res, next) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(200).json({
            message: "Validation errors",
            error: true,
            errors: errors.array()
        });
    }

    next()
    
}

module.exports = {
    catchValidationError
}


