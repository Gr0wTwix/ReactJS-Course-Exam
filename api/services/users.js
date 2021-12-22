const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/user-model');
const { validateRegister, validateLogin } = require('../validations');


const register = async (req, res, next) => {
    const { error } = validateRegister(req.body);

    if (error) {
        return res.status(422).json({ message: error.details[0].message, status: 422 });
    }

    const { email, username, password } = req.body;
    let existingUser;
    try {
        existingUser = await UserModel.findOne({ email: email });
    } catch(error) {
        return res.status(500).json({ message: error.message || 'Could not fetch the user!', status: 500 });
    }


    if (existingUser) {
        return res.status(422).json({ message: 'User with these credentials already exists!' });
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 10);
    } catch(error) {
        return res.status(500).json({ message: error.message || 'Could not register!' });
    }

    const newUser = new UserModel({
        email,
        username,
        password: hashedPassword
    });

    try {
        await newUser.save();
    } catch(error) {
        return res.status(500).json({ message: error.message || 'Could not save the user in the database!', status: 500 });
    }


    res.status(201).json({ message: 'Successfuly registered! Go To Login', status: 201 });
}


const loginUser = async (req, res, next) => {
    const { error } = validateLogin(req.body);

    if (error) {
        return res.status(422).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    let existingUser;
    try {
       existingUser = await UserModel.findOne({ email: email });
    } catch(error) {
        return res.status(500).json({ message: error.message || 'Could not fetch the user!' });
    }

    if (!existingUser) {
        return res.status(400).json({ message: 'Invalid email! No user with that email!', status: 400 });
    }

    let isValidPassword;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch(error) {
        return res.status(500).json({ message: error.message || 'Could not validate the password!' });
    }

    if (!isValidPassword) {
        return res.status(400).json({ message: 'Wrong password!', status: 400 });
    }

    let token;
    try {
        token = jwt.sign({ userId: existingUser._id }, 'gotingotin');
    } catch(error) {
        return res.status(500).json({ message: error.message || 'Could not generate the token!', status: 500 });
    }

    const userObject = {
        userId: existingUser._id,
        token: token
    }

    res.json(userObject);
}


module.exports = {
    register,
    loginUser
}