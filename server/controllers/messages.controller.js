import {User} from '../models/user.model.js';
import {Message} from '../models/message.model.js';
import {mkdirSync, renameSync } from 'fs';

export const getMessages = async (req, res, next) => {
    try {
        const user1 = req.userId;
        const user2 = req.body._id;


        if (!user1 || !user2) {
            return res.status(400).json({ message: 'Users not found' });
        }

       const messages = await Message.find({
        $or: [{ sender: user1, receiver: user2 }, 
            { sender: user2, receiver: user1 }]
       }).sort({ timestamp: 1 });

        return res.status(200).json({messages});

    } catch (error) {
        console.log(error);
    }
}

export const uploadFile = async (req, res, next) => {
    try {
        if(!req.file) {
            return res.status(400).json({ message: 'No file provided' });
        }

        const date = Date.now();

        let fileDir = 'uploads/files/' + date;

        let fileName = fileDir + '/' + req.file.originalname;

        mkdirSync(fileDir, { recursive: true });

        renameSync(req.file.path, fileName);

        console.log(`File uploaded successfully at: ${fileName}  `);

        return res.status(200).json({filePath: fileName });

    } catch (error) {
        console.log(error);
    }
}