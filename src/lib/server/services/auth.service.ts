import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/db';

export class AuthService {
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'nnp_mock_secret';
  private readonly JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'nnp_mock_refresh_secret';
  
  private generateTokens(user: { id: string; role: string }) {
    const accessToken = jwt.sign({ id: user.id, role: user.role }, this.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user.id }, this.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
  }

  async register(data: any) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email.toLowerCase() }
    });

    if (existingUser) {
      throw { status: 400, code: 'ERR_DUPLICATE_EMAIL', message: 'Email already in use' };
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    
    // Create the user first without a refresh token
    let user = await prisma.user.create({
      data: {
        email: data.email.toLowerCase(),
        name: data.name,
        passwordHash,
        role: data.role || 'USER'
      }
    });

    const { accessToken, refreshToken } = this.generateTokens({ id: user.id, role: user.role });
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    
    // Update the user with the hashed refresh token
    user = await prisma.user.update({
      where: { id: user.id },
      data: { hashedRefreshToken }
    });

    return { 
      accessToken, 
      refreshToken, 
      user: { id: user.id, name: user.name, email: user.email, role: user.role } 
    };
  }

  async login(data: any) {
    const user = await prisma.user.findFirst({
      where: { 
        email: data.email.toLowerCase(),
        accountStatus: 'ACTIVE'
      }
    });
    
    if (!user || !user.passwordHash) {
      throw { status: 401, code: 'ERR_INVALID_CREDENTIALS', message: 'Invalid email or password' };
    }

    const isMatch = await bcrypt.compare(data.password, user.passwordHash);
    if (!isMatch) {
      throw { status: 401, code: 'ERR_INVALID_CREDENTIALS', message: 'Invalid email or password' };
    }

    const { accessToken, refreshToken } = this.generateTokens({ id: user.id, role: user.role });
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { 
        hashedRefreshToken,
        lastLoginAt: new Date()
      }
    });

    return { 
      accessToken, 
      refreshToken, 
      user: { id: user.id, name: user.name, email: user.email, role: user.role } 
    };
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw { status: 401, code: 'ERR_NO_TOKEN', message: 'No refresh token provided' };
    }

    try {
      const decoded: any = jwt.verify(refreshToken, this.JWT_REFRESH_SECRET);
      
      const user = await prisma.user.findUnique({
        where: { id: decoded.id }
      });

      if (!user || !user.hashedRefreshToken || user.accountStatus !== 'ACTIVE') {
        throw { status: 401, code: 'ERR_INVALID_TOKEN', message: 'Invalid refresh token' };
      }

      const isMatch = await bcrypt.compare(refreshToken, user.hashedRefreshToken);
      if (!isMatch) {
        throw { status: 401, code: 'ERR_INVALID_TOKEN', message: 'Invalid refresh token' };
      }

      const tokens = this.generateTokens({ id: user.id, role: user.role });
      const newHashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 10);

      await prisma.user.update({
        where: { id: user.id },
        data: { hashedRefreshToken: newHashedRefreshToken }
      });

      return tokens;
    } catch (err) {
      throw { status: 401, code: 'ERR_EXPIRED_TOKEN', message: 'Refresh token expired or invalid' };
    }
  }

  async logout(userId: string) {
    await prisma.user.update({
      where: { id: userId },
      data: { hashedRefreshToken: null }
    });
    return true;
  }

  // --- Abstracted Features (Configuration Required) ---

  async sendOtp(phone: string) {
    if (!process.env.OTP_PROVIDER_API_KEY) {
      throw { status: 501, code: 'ERR_NOT_IMPLEMENTED', message: 'OTP Provider is not configured (CONFIGURATION REQUIRED)' };
    }
    return true;
  }

  async verifyOtp(phone: string, code: string) {
    if (!process.env.OTP_PROVIDER_API_KEY) {
      throw { status: 501, code: 'ERR_NOT_IMPLEMENTED', message: 'OTP Provider is not configured (CONFIGURATION REQUIRED)' };
    }
    throw { status: 501, code: 'ERR_NOT_IMPLEMENTED', message: 'OTP verification not implemented' };
  }

  async forgotPassword(email: string) {
    throw { status: 501, code: 'ERR_NOT_IMPLEMENTED', message: 'Email Provider is not configured (CONFIGURATION REQUIRED)' };
  }

  async resetPassword(token: string, newPassword: string) {
    throw { status: 501, code: 'ERR_NOT_IMPLEMENTED', message: 'Password reset not implemented (CONFIGURATION REQUIRED)' };
  }

  async loginWithGoogle(token: string) {
    if (!process.env.GOOGLE_CLIENT_SECRET || !process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
      throw { status: 501, code: 'ERR_NOT_IMPLEMENTED', message: 'Google OAuth is not configured (CONFIGURATION REQUIRED)' };
    }
    throw { status: 501, code: 'ERR_NOT_IMPLEMENTED', message: 'Google login not implemented' };
  }
}
