const nodemailer = require('nodemailer');

exports.handler = function (event, context, callback) {
  if (event.httpMethod !== 'POST') {
    return callback(null, {
      statusCode: 405,
      body: 'Method Not Allowed',
    });
  }

  const { name, email, subject, message } = JSON.parse(event.body);

  // Create a transport object using your SMTP credentials
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'aguj911@gmail.com',
      pass: 'niivfvvmjhzbwhnk',
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
        statusCode: 200,
        body: 'Success',
      });
    }
  });
};
