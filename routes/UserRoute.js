const express = require('express');
const router = express.Router();

//Insert model
const user = require("../models/UserModel");

//Insert controller
const UserController = require('../controllers/UserController');

router.use((req, res, next) => {
    console.log(req)
    next()
})

//Get all users
router.get("/", UserController.getAllUsers);

//insert user
router.post("/add", UserController.addUser);

//get by id
router.get("/:id",UserController.getById)

//update user
router.put("/update/:id", UserController.updateUser); 

//delete user 
router.delete("/delete/:id",UserController.deleteUser);

// Register user
router.post("/register", UserController.registerUser);

// Loging user
router.post("/login", UserController.loginUser);



//export
module.exports = router;