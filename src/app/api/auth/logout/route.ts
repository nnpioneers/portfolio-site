import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({
    success: true,
    data: { message: 'Logged out successfully' }
  });

  response.cookies.delete('refreshToken');
  response.cookies.delete('nnp_auth_token');

  return response;
}
