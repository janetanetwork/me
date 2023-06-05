const express = require('express');
const app = express();
const port = 3000;
const nodemailer = require('nodemailer');

// Serve static files from the "public" directory
app.use(express.static('public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Handle form submission
app.post('/submit', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Create a transport object using your SMTP credentials
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
       user: 'aguj911@gmail.com',
      pass: 'niivfvvmjhzbwhnk'
    }
  });

  // Configure the email details
  const mailOptions = {
    from: email,
    to: 'ojiezele@gmail.com',
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('Error');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Success');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
