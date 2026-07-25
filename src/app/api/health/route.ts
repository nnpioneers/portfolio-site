import { NextResponse } from 'next/server';
import { DatabaseManager } from '../../../../backend/src/config/db';

export async function GET() {
  try {
    await DatabaseManager.getInstance().connect();
    const status = DatabaseManager.getInstance().getStatus();
    
    return NextResponse.json({
      status: 'v1_ok',
      timestamp: new Date().toISOString(),
      database: status
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: 'error', message: error?.message || 'Database connection failed' },
      { status: 500 }
    );
  }
}
