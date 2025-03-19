const express = require('express');
const router = express.Router();

//Insert model
const user = require("../models/UserModel");

//Insert controller
const UserController = require('../controllers/UserController');

//Get all users
router.get("/", UserController.getAllUsers);

//export
module.exports = router;