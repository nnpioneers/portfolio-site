import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserMongoAdapter } from '../database/adapters/user.adapter';
import { IUser, UserModel } from '../database/schemas/user.schema';

export class AuthService {
  private userAdapter: UserMongoAdapter;
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'nnp_mock_secret';
  private readonly JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'nnp_mock_refresh_secret';
  
  constructor() {
    this.userAdapter = new UserMongoAdapter();
  }

  private generateTokens(user: IUser) {
    const accessToken = jwt.sign({ id: user._id, role: user.role }, this.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user._id }, this.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
  }

  async register(data: any) {
    const existingUser = await this.userAdapter.findByEmail(data.email);
    if (existingUser) {
      throw { status: 400, code: 'ERR_DUPLICATE_EMAIL', message: 'Email already in use' };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.userAdapter.create({
      email: data.email,
      name: data.name,
      password: hashedPassword,
      role: data.role || 'USER'
    });

    const { accessToken, refreshToken } = this.generateTokens(user);
    
    await this.userAdapter.update(String(user._id), { refreshToken });

    return { accessToken, refreshToken, user: { id: user._id, name: user.name, email: user.email, role: user.role } };
  }

  async login(data: any) {
    const user = await UserModel.findOne({ email: data.email, isDeleted: false }).select('+password').lean().exec() as any;
    
    if (!user || !user.password) {
      throw { status: 401, code: 'ERR_INVALID_CREDENTIALS', message: 'Invalid email or password' };
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw { status: 401, code: 'ERR_INVALID_CREDENTIALS', message: 'Invalid email or password' };
    }

    const { accessToken, refreshToken } = this.generateTokens(user);
    await this.userAdapter.update(String(user._id), { refreshToken });

    return { accessToken, refreshToken, user: { id: user._id, name: user.name, email: user.email, role: user.role } };
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw { status: 401, code: 'ERR_NO_TOKEN', message: 'No refresh token provided' };
    }

    try {
      const decoded: any = jwt.verify(refreshToken, this.JWT_REFRESH_SECRET);
      
      const user = await UserModel.findOne({ _id: decoded.id, isDeleted: false }).select('+refreshToken').lean().exec() as any;
      if (!user || user.refreshToken !== refreshToken) {
        throw { status: 401, code: 'ERR_INVALID_TOKEN', message: 'Invalid refresh token' };
      }

      const tokens = this.generateTokens(user);
      await this.userAdapter.update(String(user._id), { refreshToken: tokens.refreshToken });

      return tokens;
    } catch (err) {
      throw { status: 401, code: 'ERR_EXPIRED_TOKEN', message: 'Refresh token expired' };
    }
  }

  async logout(userId: string) {
    await this.userAdapter.update(userId, { refreshToken: undefined });
    return true;
  }
}
