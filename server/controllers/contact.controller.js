import { Message } from '../models/message.model.js';
import User from '../models/user.model.js';
import mongoose from 'mongoose';

export const searchContacts = async (req, res, next) => {
    try {
        const { searchTerm } = req.body;
        if (searchTerm === undefined || searchTerm === null) {
            return res.status(400).json({ message: 'Search term is required' });
        }

        const sanitizedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g,
            "\\$&"
        );

        const regex = new RegExp(sanitizedSearchTerm, 'i');

        const contacts = await User.find({
            $and: [{ _id: { $ne: req.userId } }, { username: regex }]
        });

        return res.status(200).json({contacts});

    } catch (error) {
        next(error);
    }
}

export const getContactsForDMList = async (req, res, next) => {
    try {
        let userId = req.userId;

        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        userId = new mongoose.Types.ObjectId(userId);

        const contacts = await Message.aggregate([
            {
                $match: {
                    $or: [
                        { sender: userId },
                        { receiver: userId }
                    ]
                }
            },
            {
                $sort: { timestamp: -1 }
            },
            {
                $group: {
                    _id: {
                        $cond: {
                            if: { $eq: ["$sender", userId] },
                            then: "$receiver",
                            else: "$sender"
                        }
                    },
                    lastMessageTime: { $first: "$timestamp" },
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: "_id",
                    foreignField: "_id",
                    as: 'contactInfo'
                }
            },
            {
                $unwind: '$contactInfo',
            },
            {
                $project: {
                    _id: 1,
                    username: "$contactInfo.username",
                    color: "$contactInfo.color",
                    image: "$contactInfo.image",
                    lastMessageTime: 1,
                }
            },
            {
                $sort: { lastMessageTime: -1 }
            }
        ]);

        return res.status(200).json({ contacts });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};