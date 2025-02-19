import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import signUp from './signUp.js';
//import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/signUp', signUp);

//authenticateToken temporarily removed
router.use('/api', apiRoutes);

export default router;
