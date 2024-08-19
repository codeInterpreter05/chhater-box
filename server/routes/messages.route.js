import { Router } from 'express'
import { getMessages } from '../controllers/messages.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import multer from'multer';

const messagesRoutes = Router();
const upload = multer({ dest: 'uploads/files' });

messagesRoutes.post('/get-messages', verifyToken, getMessages);



export default messagesRoutes;