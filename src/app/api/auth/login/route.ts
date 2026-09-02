import { NextRequest, NextResponse } from 'next/server';
import { DatabaseManager } from '@/lib/server/config/db';
import { AuthService } from '@/lib/server/services/auth.service';

export async function POST(req: NextRequest) {
  try {
    await DatabaseManager.getInstance().connect();
    const body = await req.json();

    const authService = new AuthService();
    const { accessToken, refreshToken, user } = await authService.login(body);

    const response = NextResponse.json({
      success: true,
      data: { accessToken, user }
    });

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/'
    });

    response.cookies.set('nnp_auth_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60, // 15 minutes to match jwt expiration
      path: '/'
    });

    return response;
  } catch (error: any) {
    const status = error.status || 400;
    return NextResponse.json(
      { success: false, error: { code: error.code || 'ERR_LOGIN_FAILED', message: error.message || 'Login failed' } },
      { status }
    );
  }
}
