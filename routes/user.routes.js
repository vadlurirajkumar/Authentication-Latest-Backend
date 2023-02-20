import express from 'express';
import { signup, login, userData } from '../services/user.service.js';
import isAuthenticated from '../middleware/Auth.service.js';

const router = express.Router();

router.post('/signup',signup)
router.post('/login',login)
router.get('/data', isAuthenticated, userData)

export default router;

