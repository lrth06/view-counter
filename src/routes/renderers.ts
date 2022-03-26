import express from 'express';
import standardController from '../controllers/renderController.js';
import rateLimit from '../middleware/rateLimit.js';
export const router = express.Router();

router.get('/', rateLimit, standardController);
