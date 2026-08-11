const nodemailer = require('nodemailer');

/* ── Transporter ────────────────────────────────── */
function createTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return null; // not configured — emails will be skipped silently
  }

  const port   = Number(SMTP_PORT) || 587;
  const secure = port === 465;

  return nodemailer.createTransport({
    host:   SMTP_HOST,
    port,
    secure,
    auth:   { user: SMTP_USER, pass: SMTP_PASS },
  });
}

/* ── Welcome email HTML ─────────────────────────── */
function welcomeHtml(name, dashboardUrl) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>Account Created Successfully</title>
</head>
<body style="margin:0;padding:0;background:#f5f3ff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <div style="max-width:560px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(100,80,180,0.10)">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#4c3d94 0%,#7c5ccc 100%);padding:36px 40px">
      <h1 style="color:#ffffff;font-size:22px;font-weight:700;margin:0;letter-spacing:-0.01em">NexpreneurAI</h1>
      <p style="color:rgba(255,255,255,0.72);font-size:13px;margin:4px 0 0">AI-powered entrepreneurship platform</p>
    </div>

    <!-- Body -->
    <div style="padding:40px">
      <div style="width:52px;height:52px;background:#f0fdf4;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:22px">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#22c55e" fill-opacity="0.18"/>
          <path d="M8 12.5l2.5 2.5 5.5-5.5" stroke="#16a34a" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <h2 style="font-size:24px;font-weight:700;color:#1c1a2e;margin:0 0 12px;letter-spacing:-0.015em">
        Account Created Successfully!
      </h2>

      <p style="font-size:15px;color:#6b7280;line-height:1.75;margin:0 0 8px">
        Hi <strong style="color:#1c1a2e">${name}</strong>,
      </p>
      <p style="font-size:15px;color:#6b7280;line-height:1.75;margin:0 0 28px">
        Welcome to NexpreneurAI! Your account has been created successfully.
        You're all set to start building your business with the power of AI —
        generate business plans, create product descriptions, and track your progress.
      </p>

      <a href="${dashboardUrl}"
        style="display:inline-block;background:linear-gradient(135deg,#4c3d94,#7c5ccc);color:#ffffff;
          font-size:14px;font-weight:600;padding:13px 30px;border-radius:99px;
          text-decoration:none;letter-spacing:0.01em">
        Go to Dashboard &rarr;
      </a>

      <p style="font-size:13px;color:#9ca3af;margin:28px 0 0;line-height:1.65">
        If you didn't create this account, you can safely ignore this email.<br>
        Need help? Reply to this email and our team will assist you.
      </p>
    </div>

    <!-- Footer -->
    <div style="background:#f9f8ff;padding:20px 40px;border-top:1px solid #f0eef8">
      <p style="font-size:12px;color:#9ca3af;margin:0;text-align:center;letter-spacing:0.04em">
        &copy; 2026 NexpreneurAI. All Rights Reserved.
      </p>
    </div>

  </div>
</body>
</html>`;
}

/* ── Plain-text fallback (helps spam score) ─────── */
function welcomeText(name, dashboardUrl) {
  return `Hi ${name},

Welcome to NexpreneurAI! Your account has been created successfully.

You're all set to start building your business with the power of AI — generate business plans, create product descriptions, and track your progress.

Go to your dashboard here:
${dashboardUrl}

If you didn't create this account, you can safely ignore this email.

— The NexpreneurAI Team
© 2026 NexpreneurAI. All Rights Reserved.`;
}

/* ── Public API ─────────────────────────────────── */
const sendWelcomeEmail = async ({ name, email }) => {
  const transporter = createTransporter();

  if (!transporter) {
    console.warn('Mailer: SMTP not configured — skipping welcome email for', email);
    return;
  }

  const dashboardUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard`;
  const fromAddress  = process.env.SMTP_FROM || process.env.SMTP_USER;
  const from         = `"NexpreneurAI" <${fromAddress}>`;

  await transporter.sendMail({
    from,
    to:       `${name} <${email}>`,
    replyTo:  from,
    subject:  'Welcome to NexpreneurAI — Your Account is Ready!',
    text:     welcomeText(name, dashboardUrl),
    html:     welcomeHtml(name, dashboardUrl),
    headers: {
      'X-Mailer':        'NexpreneurAI Mailer',
      'X-Priority':      '3',
      'Precedence':      'bulk',
      'List-Unsubscribe': `<mailto:${fromAddress}?subject=unsubscribe>`,
    },
  });
};

module.exports = { sendWelcomeEmail };
