require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Serve static files from the "public" directory
app.use(express.static('public'));

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS  // Your email password or app-specific password
  }
});

// POST route to handle form submissions
app.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log('Form data received:', { name, email, subject, message });

  // Email options
  const mailOptions = {
    from: email, // Sender address
    to: process.env.EMAIL_USER, // Receiver address
    subject: `Contact Form Submission: ${subject}`,
    text: `You have received a new message from your website contact form.\n\n` +
          `Here are the details:\n\n` +
          `Name: ${name}\n\n` +
          `Email: ${email}\n\n` +
          `Subject: ${subject}\n\n` +
          `Message:\n${message}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      return res.status(500).json({ success: false, error: 'Error sending email' });
    }
    console.log('Email sent:', info.response);
    res.json({ success: true });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
