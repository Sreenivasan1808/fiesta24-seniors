const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
//const send_mail = (participantMail,message) => {
// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // SMTP user
    pass: process.env.SMTP_PASS  // SMTP password
  },
  connectionTimeout: 100000, // 10 seconds timeout
  socketTimeout: 100000 // 10 seconds timeout
});

// Define email options
const mailOptions = {
  from: process.env.SMTP_USER, // sender address
  to: 'sarathyj121@gmail.com', // list of receivers
  subject: 'Fiesta\'24 Seniors', // Subject line
  text: 'hi' // plain text body
  
};

// Send email

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
});
//}
//send_mail('sarathyj121@gmail.com','Testing Mail')
//module.exports= { send_mail}
