import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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
