import { Router } from 'express';
import { AIController } from '../../controllers/ai.controller';
import { authMiddleware } from '../../middleware/auth.middleware';
import { rateLimiter } from '../../middleware/rateLimiter.middleware';

const router = Router();
const aiController = new AIController();

// AI Chat Route
router.post('/chat', authMiddleware, rateLimiter, aiController.chat);

export default router;
