const nodemailer = require('nodemailer');

exports.handler = function (event, context, callback) {
  if (event.httpMethod !== 'POST') {
    return callback(null, {
      statusCode: 405,
      body: 'Method Not Allowed',
    });
  }

  const formData = new URLSearchParams(event.body);

  const name = formData.get('name');
  const email = formData.get('email');
  const subject = formData.get('subject');
  const message = formData.get('message');

  // Create a transport object using your SMTP credentials
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'sugarmummyconnect32@gmail.com',
      pass: 'xnfwsqxqsegsnbpk',
    },
  });

  // Configure the email details
  const mailOptions = {
    from: email,
    to: 'ojiezele@gmail.com',
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return callback(null, {
        statusCode: 500,
        body: 'Error',
      });
    } else {
      console.log('Email sent: ' + info.response);
      return callback(null, {
        statusCode: 302, // Redirect status code
        headers: {
          Location: '/', // Set the desired redirect location
        },
        body: '',
      });
    }
  });
};
