import { NextResponse } from 'next/server';
import prisma from '@/lib/server/config/db';
import { EmailService } from '@/lib/server/services/email.service';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      fullName,
      email,
      mobile,
      college,
      department,
      currentYear,
      graduationYear,
      skills,
      guidanceAreas,
      helpMessage,
      linkedIn,
      github,
      resumeFileName
    } = body;

    // 1. Validate required fields
    if (!fullName || !email || !mobile || !college || !department || !currentYear || !graduationYear || !skills || !guidanceAreas) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const areasString = Array.isArray(guidanceAreas) ? guidanceAreas.join(', ') : guidanceAreas;

    // 2. Save registration to PostgreSQL / Neon via Prisma
    let savedRegistration: any = null;
    try {
      savedRegistration = await (prisma as any).studentRegistration.create({
        data: {
          fullName,
          email,
          mobile,
          college,
          department,
          currentYear,
          graduationYear,
          skills,
          guidanceAreas: areasString,
          helpMessage: helpMessage || '',
          linkedIn: linkedIn || null,
          github: github || null,
          resumeFileName: resumeFileName || null,
        }
      });
    } catch (dbError: any) {
      console.error('[StudentRegistration] Database save error:', dbError.message);
      return NextResponse.json({ success: false, error: 'Failed to save registration' }, { status: 500 });
    }

    // 3. Send NNP Team Notification (to moahmeedmohai2020@gmail.com)
    // 4. Send Student Confirmation Email (from nnp.connect@gmail.com to student's email)
    const emailService = EmailService.getInstance();
    let teamEmailResult: { success: boolean; error?: string } = { success: false, error: 'UNSENT' };
    let studentEmailResult: { success: boolean; error?: string } = { success: false, error: 'UNSENT' };

    try {
      teamEmailResult = await emailService.sendTeamNotification({
        fullName,
        email,
        mobile,
        college,
        department,
        currentYear,
        graduationYear,
        skills,
        guidanceAreas: areasString,
        helpMessage: helpMessage || '',
        linkedIn,
        github,
        resumeFileName,
        submittedAt: savedRegistration?.createdAt || new Date(),
      });

      studentEmailResult = await emailService.sendStudentConfirmation({
        fullName,
        email,
      });

      if (!teamEmailResult.success) {
        console.warn(`[StudentRegistration] Team notification status: ${teamEmailResult.error}`);
      }
      if (!studentEmailResult.success) {
        console.warn(`[StudentRegistration] Student confirmation status: ${studentEmailResult.error}`);
      }
    } catch (mailError: any) {
      // Safety rule: Do not delete registration if email delivery fails.
      console.error('[StudentRegistration] Email service exception:', mailError?.message || mailError);
    }

    return NextResponse.json({
      success: true,
      message: 'Registration submitted successfully',
      data: {
        id: savedRegistration?.id,
        emailSent: studentEmailResult.success,
      }
    });

  } catch (error: any) {
    console.error('[StudentRegistration] API Error:', error?.message || error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
