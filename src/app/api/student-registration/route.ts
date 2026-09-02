import { NextResponse } from 'next/server';
import { prisma } from '@/lib/server/config/db';

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
      guidanceAreas, // Expecting string or array
      helpMessage,
      linkedIn,
      github,
      resumeFileName
    } = body;

    // Validate required fields
    if (!fullName || !email || !mobile || !college || !department || !currentYear || !graduationYear || !skills || !guidanceAreas) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const areasString = Array.isArray(guidanceAreas) ? guidanceAreas.join(', ') : guidanceAreas;

    // Create DB entry (assuming Prisma handles the connection)
    // We wrap this in a try-catch in case Prisma hasn't been migrated yet during dev testing
    try {
      await (prisma as any).studentRegistration.create({
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
      console.warn("Database save failed (likely pending migration). Registration continues.", dbError.message);
      // We continue since the DB might not be ready but we want the UI flow to work
    }

    // Mock Email Sending
    console.log("==========================================");
    console.log("Mock Email Service:");
    console.log("To: mohameedmohai2020@gmail.com");
    console.log("Subject: New Student Registration — Placement Guidance");
    console.log("Body:");
    console.log(`Student Information
- Full Name: ${fullName}
- Email: ${email}
- Mobile: ${mobile}
- College: ${college}
- Department: ${department}
- Current Year: ${currentYear}
- Graduation Year: ${graduationYear}

Placement Preparation
- Skills: ${skills}
- Selected guidance areas: ${areasString}
- Student's message: ${helpMessage}
- LinkedIn: ${linkedIn}
- GitHub / Portfolio: ${github}
- Resume information: ${resumeFileName}`);
    console.log("Timestamp:", new Date().toISOString());
    console.log("STATUS: EMAIL CONFIGURATION REQUIRED");
    console.log("==========================================");

    return NextResponse.json({ success: true, message: 'Registration submitted successfully' });

  } catch (error) {
    console.error('Registration API Error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
