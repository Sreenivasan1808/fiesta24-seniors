const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // SMTP user
    pass: process.env.SMTP_PASS  // SMTP password
  }
});
const send_mail = () => {
// Define email options
const mailOptions = {
  from: process.env.SMTP_USER, // sender address
  to: 'sreenivasan1808@gmail.com', // list of receivers
  subject: 'Hello ✔', // Subject line
  text: 'Your mail has been approved' // plain text body
  
};

// Send email

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
});
}
export default send_mail
