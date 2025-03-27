const User = require('../models/UserModel');
const bcrypt = require("bcrypt");


// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.status(200).json({ users });
    } catch (err) {
        console.error('Error retrieving users:', err);
        res.status(500).json({ message: 'Error retrieving users', error: err.message });
    }
};

// Add user (by admin)
const addUser = async (req, res) => {
    let { username, firstName, lastName, email, phone, salary, password } = req.body;

    try {
        if (!username || !firstName || !lastName || !email || !salary || !password) {
            return res.status(400).json({ message: 'All required fields are missing' });
        }

        // Check if username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        const user = new User({ 
            username,
            firstName,
            lastName,
            email,
            phone: phone || '',
            pw_hash: password,
            job_title: 'Customer',
            salary,
            hire_date: Date(),
            created_at: new Date(),
            is_active: true,
        });

        await user.save();
        res.status(201).json({ message: "User added successfully", user: user.toObject({ virtuals: true }) });
    } catch (err) {
        console.error("Error adding user:", err);
        res.status(500).json({ message: 'Error adding user', error: err.message });
    }
};

// Get user by ID
const getById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (err) {
        console.error('Error retrieving user:', err);
        res.status(500).json({ message: 'Error retrieving user', error: err.message });
    }
};

// Update user (by admin)
const updateUser = async (req, res, next) => {
    let updatedUser;

    try {
        const userId = req.params.id;
        const { username, password, email, firstName, lastName, phone, salary } = req.body;

        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user with the new values from the request body
        user.username = username || user.username;
        user.pw_hash = password || user.pw_hash;
        user.email = email || user.email;
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.phone = phone || user.phone;
        user.job_title = user.job_title;
        user.salary = salary || user.salary;
        user.hire_date = user.hire_date;
        user.is_active = user.is_active;

        updatedUser = await user.save();

        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).json({ message: 'Error updating user', error: err.message });
    }
};


//delete user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate if the ID is a valid MongoDB ObjectId
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ 
            message: "User deleted successfully", 
            success: true 
        });
    } catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).json({ message: "Error deleting user", error: err.message });
    }
};



// Register user (self-registration)
const registerUser = async (req, res) => {
    const { username, password, confirmPassword, email, firstName, lastName, phone } = req.body;
    console.log('register', username)
    try {

        //validation
        if (!username || !password || !confirmPassword || !firstName || !lastName || !email ) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Check if username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            pw_hash: hashedPassword,
            email,
            firstName,
            lastName,
            phone: phone || "",
            created_at: new Date(),
            is_active: true,
            job_title: 'Customer',
            salary: 0,
            hire_date: null
        });

        await newUser.save();

        res.status(200  ).json({ 
            message: "User registered successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName
            }
        });
    } catch (err) {
        res.status(400).json({error: err.message})
        console.log(err);
    }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.pw_hash);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        // If login is successful
        res.status(200).json({ message: "Login successful", user: { id: user._id, username: user.username, email: user.email } });
    } catch (err) {
        console.log(err);
    }
};


module.exports = { getAllUsers, addUser, getById, updateUser, deleteUser, registerUser, loginUser };