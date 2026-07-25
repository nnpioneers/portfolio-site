import { Router } from 'express';
import { AdminController } from '../../admin/controllers/admin.controller';
import { adminAuthMiddleware } from '../../middleware/admin.middleware';

const router = Router();
const adminController = new AdminController();

// Apply strict admin RBAC to all routes in this file
router.use(adminAuthMiddleware);

// 1. Dashboard
router.get('/dashboard', adminController.getDashboardStats);

// 2. Analytics
router.get('/analytics/ai', adminController.getAIAnalytics);

// 3. User Management
router.get('/users', adminController.searchUsers);
router.post('/users/:userId/suspend', adminController.suspendUser);

// 4. Knowledge Management
router.post('/knowledge/upload', adminController.uploadKnowledge);

// 5. System Management
router.get('/system/status', adminController.getSystemStatus);
router.post('/system/provider', adminController.toggleAIProvider);

// 6. Audit Center
router.get('/audit/logs', adminController.getAuditLogs);

// 7. Security Center
router.get('/security/alerts', adminController.getSecurityAlerts);

// 8. Reports
router.get('/reports/generate', adminController.generateReport);

export default router;
