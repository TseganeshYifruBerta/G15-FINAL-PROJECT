const nodemailer = require('nodemailer');
const speakeasy = require('speakeasy');

// Create nodemailer transporter with your SMTP server configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
            user: "melat.mesele@aait.edu.et",
            pass: "akmnhm@123!",
  }
});

// Define sendEmail function to send emails using the transporter
const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: 'melat.mesele@aait.edu.et',
      to: to,
      subject: subject,
      text: text,
    });
    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error(`Error sending email to ${to}: ${error.message}`);
    throw error; // Rethrow the error for error handling at the caller level
  }
};

// Define a function to generate and return a one-time password (OTP)
const generateOTP = () => {
  const secret = speakeasy.generateSecret({ length: 20 });
  return speakeasy.totp({
    secret: secret.base32,
    encoding: 'base32',
    digits: 6
  });
};

module.exports = { sendEmail, generateOTP };
