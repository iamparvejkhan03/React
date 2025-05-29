import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: String(process.env.SMTP_HOST),
    port: String(process.env.SMTP_PORT),
    auth: {
        user: String(process.env.SMTP_USER),
        pass: String(process.env.SMTP_PASS),
    },
})

export default transporter;