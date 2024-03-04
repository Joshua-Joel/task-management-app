import nodemailer from 'nodemailer';

// Create a transporter object
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'task.due.notification@gmail.com',
        pass: 'vtcu qler lmxs ycva' 
    }
});

export const sendMail = async (to, subject, text) => {
    const mailOptions = {
        from: 'task.due.notification@gmail.com',
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
