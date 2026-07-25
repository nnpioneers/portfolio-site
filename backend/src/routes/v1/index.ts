import { Router } from 'express';
import { AuthController } from '../../controllers/auth.controller';
import { UserController } from '../../controllers/user.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

import { SystemController } from '../../controllers/system.controller';

import adminRoutes from './admin.routes';

const router = Router();
const authController = new AuthController();
const userController = new UserController();
const systemController = new SystemController();

// Auth Routes
router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);
router.post('/auth/refresh', authController.refresh);
router.post('/auth/logout', authMiddleware, authController.logout);

// User Routes
router.get('/users/profile', authMiddleware, userController.getProfile);

// System Route
router.get('/system/health', systemController.getHealth);

// Admin Routes (Protected by adminAuthMiddleware inside the file)
router.use('/admin', adminRoutes);

// Business, Project, Chat, etc. will follow this same pattern.
router.get('/health', (req, res) => {
  res.json({ status: 'v1_ok' });
});

export default router;
