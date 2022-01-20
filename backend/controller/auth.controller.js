const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');
const dotenv = require('dotenv');
dotenv.config();

const LoginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // user not exist
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            return res
                .status(404)
                .json({ code: 404, message: 'User Not Registered' });
        }

        // check for password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingUser.password
        );
        if (!isPasswordCorrect) {
            return res
                .status(404)
                .json({ code: 404, message: 'Invalid Password!!' });
        }

        // generate jwt token
        const token = generateToken(
            email,
            existingUser._id,
            process.env.JWT_TOKEN_TIME
        );

        //add auth_token to user data
        await User.findOneAndUpdate({ email: email }, { auth_token: token });
        existingUser.auth_token = token;

        res.status(200).json({ code: 200, result: existingUser, token });
    } catch (err) {
        return res
            .status(500)
            .json({ code: 500, message: 'Something went to wrong!!', err });
    }
};

const registerUser = async (req, res) => {
    const { email, password, confirmpassword, name } = req.body;

    try {
        //User already exist
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res
                .status(404)
                .json({ code: 404, message: 'User Already Registered!!' });
        }

        //check for password
        if (password != confirmpassword) {
            return res.status(404).json({
                code: 404,
                message: 'Password & Confirm Password are not matched!!',
            });
        }

        //hash password
        const hashPassword = await bcrypt.hash(password, 12);

        const result = await User.create({
            email,
            password: hashPassword,
            name: name,
        });

        // //generate jwt token
        // const token = generateToken(
        //     result.email,
        //     result._id,
        //     process.env.JWT_TOKEN_TIME
        // );

        //add auth_token to user data
        await User.findOneAndUpdate({ email: email }, { auth_token: token });

        res.status(200).json({ code: 200, result, token });
    } catch (error) {
        return res
            .status(500)
            .json({ code: 500, message: 'Something went to wrong!!' });
    }
};

const LogoutUser = async (req, res) => {
    try {
        // remove auth_token from user data
        await User.findOneAndUpdate(
            { _id: res.locals.userId },
            { auth_token: '' }
        );

        // successfully response
        res.status(200).json({
            code: 200,
            message: 'User logged out successfully.',
        });
    } catch (err) {
        return res
            .status(500)
            .json({ code: 500, message: 'Something went to wrong!!' });
    }
};

module.exports = { LoginUser, registerUser, LogoutUser };
