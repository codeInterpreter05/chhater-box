import {Router} from 'express';
import { getAllContacts, getContactsForDMList, searchContacts } from '../controllers/contact.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const contactsRoutes = Router();

contactsRoutes.post('/search', verifyToken, searchContacts);
contactsRoutes.get('/get-contacts-for-dm', verifyToken, getContactsForDMList);
contactsRoutes.get('/get-all-contacts', verifyToken, getAllContacts);

export default contactsRoutes;