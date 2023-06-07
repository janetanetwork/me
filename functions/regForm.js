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
  const dob = formData.get('dob');
  const origin = formData.get('origin');
  const nationality = formData.get('nationality');
  const mobile = formData.get('mobile');
  const email = formData.get('email');
  const gender = formData.get('gender');
  const passport = event.isBase64Encoded ? Buffer.from(formData.get('passport'), 'base64') : formData.get('passport');

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
    subject: 'New Registration',
    text: `
      Name: ${name}
      Date of Birth: ${dob}
      Place of Origin: ${origin}
      Nationality: ${nationality}
      Mobile No: ${mobile}
      Email: ${email}
      Gender: ${gender}
    `,
    attachments: [
      {
        filename: 'passport.jpg',
        content: passport,
        encoding: 'base64',
      },
    ],
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
