import { Router } from 'express';
import { createGroup, getGroups } from '../controllers/groups.controller.js';
import {verifyToken} from '../middlewares/auth.middleware.js';

const groupRoutes = Router();

groupRoutes.post('/create-group', verifyToken, createGroup);
groupRoutes.get('/get-groups', verifyToken, getGroups);

export default groupRoutes;