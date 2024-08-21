import { Router } from 'express';
import { createGroup, getGroupMessages, getGroups } from '../controllers/groups.controller.js';
import {verifyToken} from '../middlewares/auth.middleware.js';

const groupRoutes = Router();

groupRoutes.post('/create-group', verifyToken, createGroup);
groupRoutes.get('/get-groups', verifyToken, getGroups);
groupRoutes.get('/get-group-messages/:groupId', verifyToken, getGroupMessages);

export default groupRoutes;