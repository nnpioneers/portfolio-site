import { NextRequest, NextResponse } from 'next/server';
import { DatabaseManager } from '@/lib/server/config/db';
import { AuthService } from '@/lib/server/services/auth.service';

export async function POST(req: NextRequest) {
  try {
    await DatabaseManager.getInstance().connect();
    const body = await req.json();

    const authService = new AuthService();
    const { accessToken, refreshToken, user } = await authService.register(body);

    const response = NextResponse.json(
      { success: true, data: { accessToken, user } },
      { status: 201 }
    );

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60,
      path: '/'
    });

    return response;
  } catch (error: any) {
    const status = error.status || 400;
    return NextResponse.json(
      { success: false, error: { code: error.code || 'ERR_REGISTRATION_FAILED', message: error.message || 'Registration failed' } },
      { status }
    );
  }
}
