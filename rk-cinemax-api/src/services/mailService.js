const nodemailer = require('nodemailer');

const getMailTransport = () => {
    const {
        SMTP_HOST,
        SMTP_PORT,
        SMTP_SECURE,
        SMTP_USER,
        SMTP_PASS
    } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
        return null;
    }

    return nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure: SMTP_SECURE === 'true',
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS
        }
    });
};

const sendQueryEmail = async ({ name, email, phone, subject, message }) => {
    const transporter = getMailTransport();

    if (!transporter) {
        throw new Error('Email service is not configured');
    }

    const recipient = process.env.QUERY_RECEIVER_EMAIL || 'radhakrishnacinemax@gmail.com';
    const from = process.env.SMTP_FROM || process.env.SMTP_USER;

    await transporter.sendMail({
        from,
        to: recipient,
        replyTo: email,
        subject: `Support Query: ${subject}`,
        text: [
            `Name: ${name}`,
            `Email: ${email}`,
            `Phone: ${phone}`,
            `Subject: ${subject}`,
            '',
            'Message:',
            message
        ].join('\n'),
        html: `
            <h2>New Support Query</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br />')}</p>
        `
    });
};

module.exports = {
    sendQueryEmail
};
