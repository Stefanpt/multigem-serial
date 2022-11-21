require('dotenv').config()
var express = require('express');
const { Router } = require('express');
const { withJWTAuthMiddleware, withMiddleware } = require("express-kun");
const router = Router();
const { check, validationResult } = require('express-validator');
const gemController = require('../controllers/gem.js')



router.get('/', gemController.index)

router.get('/create', gemController.create)

router.post('/create/save', gemController.save)

router.get('/all', gemController.getAll)

router.get('/:id', gemController.getById)

router.get('/delete/:id', gemController.remove)

router.post('/delete/confirm', gemController.confirm_delete)

router.get('/update/:id', gemController.update)

router.post('/update/save', gemController.confirm_update)





module.exports = router;