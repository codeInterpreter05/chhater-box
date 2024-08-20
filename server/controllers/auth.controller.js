import {User} from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { renameSync, unlinkSync } from 'fs';

const maxAge = 1000 * 60 * 60 * 24 * 3;

const createToken = (user, userId) => {
    return jwt.sign({ user, userId }, process.env.JWT_KEY, { expiresIn: maxAge });
}

export const signup = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists, please login' });
        }

        const user = await User.create({ username, password });


        res.cookie('jwt', createToken(user, user._id), { 
            maxAge, 
            secure: true, 
            sameSite: "None" 
        });

        return res.status(201).json({ 
            user: {
                _id: user._id,
                username: user.username,
                profileSetUp: user.profileSetUp,
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server Error' });
    }
}

export const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }


        const auth = await bcrypt.compare(password, user.password);

        if (!auth) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        res.cookie('jwt', createToken(user, user._id), { 
            maxAge, 
            secure: true, 
            sameSite: "None" 
        });

        return res.json({ 
            user: {
                _id: user._id,
                username: user.username,
                profileSetUp: user.profileSetUp,
                image: user.image,
                color: user.color,
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server Error' });
    }
}

export const getUserInfo = async (req, res, next) => {
    try {
        const userData = await User.findById(req.userId);
        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }

        

        return res.status(200).json({
            user: {
                _id: userData._id,
                username: userData.username,
                profileSetUp: userData.profileSetUp,
                image: userData.image,
                color: userData.color,
            }
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server Error' });
    }
}

export const updateProfile = async (req, res, next) => {
    try {
        console.log(req.body);
        const { userId } = req;
        const { username, profileSetUp, image, color } = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, { profileSetUp:true, color }, { new: true, runValidators: true });

        return res.status(200).json({
            user: {
                _id: updatedUser._id,
                username: updatedUser.username,
                profileSetUp: updatedUser.profileSetUp,
                image: image || updatedUser.image,
                color: color || updatedUser.color,
            }
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server Error' });
    }
}

export const addProfileImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image provided' });
        }

        console.log(req.file);

        const date = Date.now();
        const fileName = `uploads/profiles/${date}_${req.file.originalname}`;

        renameSync(req.file.path, `./${fileName}`);

        console.log(fileName);


        const updatedUser = await User.findByIdAndUpdate(
            req.userId,
            { image: fileName },
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            user: {
                image: updatedUser.image,
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteProfileImage = async (req, res, next) => {
    const { userId } = req;

    try {
        const user = await User.findByIdAndUpdate(userId, { new: true, runValidators: true });
        console.log(user.username);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        unlinkSync(`./${user.image}`);
        user.image = null;
        await user.save();
        return res.status(200).json({
            user: {
                image: null,
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const logout = (req, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 1, secure:true, sameSite: "None" });
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};