const User = require('../models/UserModel');

const getAllUsers = async(req, res, next) => {
    let users;

    //get all users
    try {
        users = await User.find();
    } catch(err) {
        console.log(err);
    }

    //if users not found
    if (!users) {
        return res.status(404).json({message: 'Users not found'});
    }

    //display all users
    res.status(200).json({users});
};

exports.getAllUsers = getAllUsers;