import nodemailer from 'nodemailer';

export interface StudentRegistrationEmailData {
  fullName: string;
  email: string;
  mobile: string;
  college: string;
  department: string;
  currentYear: string;
  graduationYear: string;
  skills: string;
  guidanceAreas: string;
  helpMessage: string;
  linkedIn?: string | null;
  github?: string | null;
  resumeFileName?: string | null;
  submittedAt?: Date | string;
}

export class EmailService {
  private static instance: EmailService;

  private constructor() {}

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  private getTransporter() {
    const user = process.env.EMAIL_SERVER_USER || 'nnp.connect@gmail.com';
    const pass = process.env.EMAIL_SERVER_PASSWORD || process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;

    if (!pass) {
      return null;
    }

    const host = process.env.EMAIL_SERVER_HOST || 'smtp.gmail.com';
    const port = parseInt(process.env.EMAIL_SERVER_PORT || '465', 10);
    const secure = port === 465;

    return nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });
  }

  public isConfigured(): boolean {
    const pass = process.env.EMAIL_SERVER_PASSWORD || process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;
    return Boolean(pass && pass.trim().length > 0);
  }

  /**
   * TASK 1: Send NNP Team Notification
   * Recipient: moahmeedmohai2020@gmail.com
   * Subject: New Student Registration – NNP
   */
  public async sendTeamNotification(data: StudentRegistrationEmailData): Promise<{ success: boolean; error?: string }> {
    const transporter = this.getTransporter();
    const teamRecipient = process.env.NNP_NOTIFICATION_EMAIL || 'moahmeedmohai2020@gmail.com';
    const fromAddress = process.env.EMAIL_FROM || '"NNP System" <nnp.connect@gmail.com>';
    const submissionTime = data.submittedAt ? new Date(data.submittedAt).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }) : new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

    if (!transporter) {
      console.warn('[EmailService] SMTP credentials not configured (EMAIL_SERVER_PASSWORD or GMAIL_APP_PASSWORD). Notification skipped.');
      return { success: false, error: 'EMAIL_CONFIG_REQUIRED' };
    }

    const textContent = `
New Student Registration – NNP

Student Information:
- Full Name: ${data.fullName}
- Email Address: ${data.email}
- Mobile Number: ${data.mobile}
- College / University: ${data.college}
- Department: ${data.department}
- Current Year: ${data.currentYear}
- Graduation Year: ${data.graduationYear}

Placement Guidance Request:
- Current Skills / Technologies: ${data.skills}
- Selected Guidance Areas: ${data.guidanceAreas}
- Student's Help / Request Message:
${data.helpMessage || 'None provided'}

Links & Attachments:
- LinkedIn: ${data.linkedIn || 'Not provided'}
- GitHub / Portfolio: ${data.github || 'Not provided'}
- Resume: ${data.resumeFileName || 'Not provided'}

Submission Timestamp: ${submissionTime} (IST)
`.trim();

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0B0F19; color: #E2E8F0; margin: 0; padding: 24px; }
    .card { background-color: #161E2E; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px; max-width: 600px; margin: 0 auto; }
    h2 { color: #A855F7; margin-top: 0; font-size: 24px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 16px; }
    .section-title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #38BDF8; margin-top: 24px; margin-bottom: 12px; }
    .row { margin-bottom: 8px; font-size: 14px; line-height: 1.5; }
    .label { color: #94A3B8; font-weight: 600; display: inline-block; width: 180px; }
    .value { color: #FFFFFF; }
    .message-box { background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 12px 16px; font-size: 14px; color: #F1F5F9; white-space: pre-wrap; margin-top: 6px; }
    .footer { margin-top: 28px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.08); font-size: 12px; color: #64748B; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <h2>🎓 New Student Registration – NNP</h2>

    <div class="section-title">Student Information</div>
    <div class="row"><span class="label">Full Name:</span> <span class="value">${escapeHtml(data.fullName)}</span></div>
    <div class="row"><span class="label">Email Address:</span> <span class="value"><a href="mailto:${escapeHtml(data.email)}" style="color: #A855F7;">${escapeHtml(data.email)}</a></span></div>
    <div class="row"><span class="label">Mobile Number:</span> <span class="value"><a href="tel:${escapeHtml(data.mobile)}" style="color: #38BDF8;">${escapeHtml(data.mobile)}</a></span></div>
    <div class="row"><span class="label">College / University:</span> <span class="value">${escapeHtml(data.college)}</span></div>
    <div class="row"><span class="label">Department:</span> <span class="value">${escapeHtml(data.department)}</span></div>
    <div class="row"><span class="label">Current Year:</span> <span class="value">${escapeHtml(data.currentYear)}</span></div>
    <div class="row"><span class="label">Graduation Year:</span> <span class="value">${escapeHtml(data.graduationYear)}</span></div>

    <div class="section-title">Placement Preparation & Skills</div>
    <div class="row"><span class="label">Current Skills:</span> <span class="value">${escapeHtml(data.skills)}</span></div>
    <div class="row"><span class="label">Guidance Areas:</span> <span class="value" style="color: #C084FC;">${escapeHtml(data.guidanceAreas)}</span></div>
    <div class="row" style="margin-top: 12px;"><span class="label">Student's Request / Message:</span></div>
    <div class="message-box">${escapeHtml(data.helpMessage || 'None provided')}</div>

    <div class="section-title">Profiles & Attachments</div>
    <div class="row"><span class="label">LinkedIn:</span> <span class="value">${data.linkedIn ? `<a href="${escapeHtml(data.linkedIn)}" style="color: #38BDF8;" target="_blank">${escapeHtml(data.linkedIn)}</a>` : 'Not provided'}</span></div>
    <div class="row"><span class="label">GitHub / Portfolio:</span> <span class="value">${data.github ? `<a href="${escapeHtml(data.github)}" style="color: #38BDF8;" target="_blank">${escapeHtml(data.github)}</a>` : 'Not provided'}</span></div>
    <div class="row"><span class="label">Resume File:</span> <span class="value">${data.resumeFileName ? escapeHtml(data.resumeFileName) : 'Not provided'}</span></div>

    <div class="footer">
      Submitted on ${submissionTime} (IST) &bull; NNP Common Student Portal
    </div>
  </div>
</body>
</html>
`.trim();

    try {
      await transporter.sendMail({
        from: fromAddress,
        to: teamRecipient,
        replyTo: data.email,
        subject: 'New Student Registration – NNP',
        text: textContent,
        html: htmlContent,
      });
      return { success: true };
    } catch (err: any) {
      console.error('[EmailService] Error sending team notification:', err?.message || err);
      return { success: false, error: err?.message || 'FAILED_TO_SEND' };
    }
  }

  /**
   * TASK 2: Send Automatic Student Confirmation Email
   * Recipient: Student's submitted email
   * From: nnp.connect@gmail.com
   * Subject: We Successfully Received Your Registration – NNP
   */
  public async sendStudentConfirmation(data: { fullName: string; email: string }): Promise<{ success: boolean; error?: string }> {
    const transporter = this.getTransporter();
    const fromAddress = process.env.EMAIL_FROM || '"NNP Team" <nnp.connect@gmail.com>';
    const whatsappLink = process.env.NNP_WHATSAPP_GROUP_LINK || 'https://chat.whatsapp.com/JLWlSn5ZKy33vwxoMDQ6DM?s=sh&p=a&mlu=4&ilr=4';

    if (!transporter) {
      console.warn('[EmailService] SMTP credentials not configured. Student confirmation email skipped.');
      return { success: false, error: 'EMAIL_CONFIG_REQUIRED' };
    }

    const textContent = `
Hello ${data.fullName},

Thank you for registering with NNP.

We are happy to let you know that we have successfully received your registration and details.

We are glad to know that you are interested in learning, improving your skills, and beginning your journey with NNP.

If you are interested in continuing this journey with us, our team will guide and support you as much as we can. We can help you with areas such as:

• Aptitude Preparation
• Coding Preparation
• Data Structures & Algorithms
• Technical Interview Preparation
• HR Interview Preparation
• Resume Building
• Communication Skills
• Mock Interviews
• Overall Placement Preparation

We believe this journey works best with mutual commitment.

We will provide the guidance and support we can from our side, and we also expect your active participation, consistency, effort, and cooperation throughout the journey.

For further communication, updates, and guidance, please join our official NNP WhatsApp group:

NNP Placement Preparation & Guidance

WhatsApp Group:
${whatsappLink}

We look forward to learning, growing, and progressing together.

Best Regards,
NNP Team
Network Navigator Pioneers
`.trim();

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>We Successfully Received Your Registration – NNP</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0F172A; color: #334155; margin: 0; padding: 20px; }
    .container { max-width: 620px; margin: 0 auto; background-color: #FFFFFF; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.15); }
    .header { background: linear-gradient(135deg, #6B21A8 0%, #3B82F6 100%); padding: 36px 32px; text-align: center; color: #FFFFFF; }
    .header h1 { margin: 0 0 8px 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px; }
    .header p { margin: 0; font-size: 14px; opacity: 0.9; }
    .content { padding: 36px 32px; font-size: 15px; line-height: 1.7; color: #1E293B; }
    .bullet-list { margin: 16px 0 24px 0; padding-left: 20px; }
    .bullet-list li { margin-bottom: 6px; color: #334155; }
    .cta-box { background-color: #F8FAFC; border: 2px dashed #CBD5E1; border-radius: 16px; padding: 24px; text-align: center; margin: 28px 0; }
    .cta-title { font-weight: 700; font-size: 16px; color: #0F172A; margin-bottom: 6px; }
    .cta-desc { font-size: 13px; color: #64748B; margin-bottom: 16px; }
    .btn-whatsapp { display: inline-block; background-color: #25D366; color: #FFFFFF !important; font-weight: 700; font-size: 15px; text-decoration: none; padding: 14px 28px; border-radius: 9999px; box-shadow: 0 4px 14px rgba(37, 211, 102, 0.35); transition: transform 0.2s ease; }
    .btn-whatsapp:hover { background-color: #20BA5A; }
    .link-text { font-size: 12px; color: #64748B; margin-top: 12px; word-break: break-all; }
    .footer { background-color: #F1F5F9; padding: 24px 32px; font-size: 13px; color: #64748B; border-top: 1px solid #E2E8F0; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Network Navigator Pioneers</h1>
      <p>Student Placement Preparation &amp; Guidance</p>
    </div>

    <div class="content">
      <p>Hello <strong>${escapeHtml(data.fullName)}</strong>,</p>

      <p>Thank you for registering with NNP.</p>

      <p>We are happy to let you know that we have successfully received your registration and details.</p>

      <p>We are glad to know that you are interested in learning, improving your skills, and beginning your journey with NNP.</p>

      <p>If you are interested in continuing this journey with us, our team will guide and support you as much as we can. We can help you with areas such as:</p>

      <ul class="bullet-list">
        <li>Aptitude Preparation</li>
        <li>Coding Preparation</li>
        <li>Data Structures &amp; Algorithms</li>
        <li>Technical Interview Preparation</li>
        <li>HR Interview Preparation</li>
        <li>Resume Building</li>
        <li>Communication Skills</li>
        <li>Mock Interviews</li>
        <li>Overall Placement Preparation</li>
      </ul>

      <p>We believe this journey works best with mutual commitment.</p>

      <p>We will provide the guidance and support we can from our side, and we also expect your active participation, consistency, effort, and cooperation throughout the journey.</p>

      <!-- WhatsApp CTA -->
      <div class="cta-box">
        <div class="cta-title">NNP Placement Preparation &amp; Guidance</div>
        <div class="cta-desc">Join our official WhatsApp group for guidance sessions, updates, and materials:</div>
        <a href="${escapeHtml(whatsappLink)}" class="btn-whatsapp" target="_blank">
          Join the NNP WhatsApp Group
        </a>
        <div class="link-text">
          Direct Link: <a href="${escapeHtml(whatsappLink)}" style="color: #25D366;">${escapeHtml(whatsappLink)}</a>
        </div>
      </div>

      <p>We look forward to learning, growing, and progressing together.</p>

      <p style="margin-top: 24px;">
        <strong>Best Regards,</strong><br>
        NNP Team<br>
        <em>Network Navigator Pioneers</em>
      </p>
    </div>

    <div class="footer">
      Official Email: <a href="mailto:nnp.connect@gmail.com" style="color: #6B21A8; font-weight: 600;">nnp.connect@gmail.com</a><br>
      &copy; ${new Date().getFullYear()} Network Navigator Pioneers. All rights reserved.
    </div>
  </div>
</body>
</html>
`.trim();

    try {
      await transporter.sendMail({
        from: fromAddress,
        to: data.email,
        subject: 'We Successfully Received Your Registration – NNP',
        text: textContent,
        html: htmlContent,
      });
      return { success: true };
    } catch (err: any) {
      console.error('[EmailService] Error sending student confirmation:', err?.message || err);
      return { success: false, error: err?.message || 'FAILED_TO_SEND' };
    }
  }
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
