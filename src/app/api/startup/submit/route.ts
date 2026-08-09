import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/server/config/db';
import { StartupSubmissionModel } from '@/lib/server/database/schemas/startup-submission.schema.ts';
import jwt from 'jsonwebtoken';

// Use standard API response format for NNP if available, else simple JSON
export async function POST(req: Request) {
  try {
    await connectDB();

    // Verify authentication
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, message: 'Unauthorized. Please log in.' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    let decodedUser: any;
    try {
      decodedUser = jwt.verify(token, process.env.JWT_SECRET || 'nnp-secret-key-2024');
    } catch (err) {
      return NextResponse.json({ success: false, message: 'Invalid or expired token.' }, { status: 401 });
    }

    const body = await req.json();

    // Attach the user ID to the submission
    const submissionData = {
      ...body,
      user: decodedUser.id || decodedUser._id // Adjust based on your JWT payload structure
    };

    const newSubmission = await StartupSubmissionModel.create(submissionData);

    // TODO: Send email notification to Admin here
    // Example: await emailService.sendAdminNotification(newSubmission);

    return NextResponse.json({
      success: true,
      message: 'Startup submission received successfully.',
      data: newSubmission
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error submitting startup idea:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'An error occurred during submission.'
    }, { status: 500 });
  }
}
