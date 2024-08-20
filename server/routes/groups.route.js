import { Router } from 'express';
import { createGroup } from '../controllers/groups.controller.js';
import {verifyToken} from '../middlewares/auth.middleware.js';

const groupRoutes = Router();

groupRoutes.post('/create-group', verifyToken, createGroup);

export default groupRoutes;