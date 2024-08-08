import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

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
