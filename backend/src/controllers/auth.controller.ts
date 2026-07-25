import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../utils/response.util';
import { AuthService } from '../services/auth.service';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  private setRefreshCookie(res: Response, refreshToken: string) {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
  }

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { accessToken, refreshToken, user } = await this.authService.register(req.body);
      this.setRefreshCookie(res, refreshToken);
      sendSuccess(res, { accessToken, user }, 201);
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { accessToken, refreshToken, user } = await this.authService.login(req.body);
      this.setRefreshCookie(res, refreshToken);
      sendSuccess(res, { accessToken, user });
    } catch (error) {
      next(error);
    }
  };

  public refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.refreshToken;
      const { accessToken, refreshToken } = await this.authService.refresh(token);
      this.setRefreshCookie(res, refreshToken);
      sendSuccess(res, { accessToken });
    } catch (error) {
      next(error);
    }
  };

  public logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.id;
      if (userId) {
        await this.authService.logout(userId);
      }
      res.clearCookie('refreshToken');
      sendSuccess(res, { message: 'Logged out successfully' });
    } catch (error) {
      next(error);
    }
  };
}
