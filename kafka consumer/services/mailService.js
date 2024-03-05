import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Create a transporter object
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.FROM_EMAIL_ID ,
        pass: process.env.EMAIL_PASSWORD
    }
});

export const sendMail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.FROM_EMAIL_ID,
        to: to,
        subject: subject,
        text: text
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return info.response;
    } catch (error) {
        throw error;
    }
};
