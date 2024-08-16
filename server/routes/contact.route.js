import {Router} from 'express';
import { searchContacts } from '../controllers/contact.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const contactsRoutes = Router();

contactsRoutes.post('/search', verifyToken, searchContacts);

export default contactsRoutes;