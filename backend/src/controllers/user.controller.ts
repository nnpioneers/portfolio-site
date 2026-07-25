import { Request, Response } from 'express';
import { sendSuccess } from '../utils/response.util';

export class UserController {
  
  /**
   * @swagger
   * /api/v1/users/profile:
   *   get:
   *     summary: Get user profile
   */
  public getProfile(req: Request, res: Response) {
    sendSuccess(res, { id: 'usr_123', name: 'Admin', role: 'SUPER_ADMIN' });
  }
}
