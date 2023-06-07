const nodemailer = require('nodemailer');

exports.handler = function (event, context, callback) {
  if (event.httpMethod !== 'POST') {
    return callback(null, {
      statusCode: 405,
      body: 'Method Not Allowed',
    });
  }

  const formData = new FormData();
  const body = JSON.parse(event.body);

  formData.append('name', body.name);
  formData.append('dob', body.dob);
  formData.append('origin', body.origin);
  formData.append('nationality', body.nationality);
  formData.append('mobile', body.mobile);
  formData.append('email', body.email);
  formData.append('gender', body.gender);
  formData.append('passport', body.passport);

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
    from: body.email,
    to: 'ojiezele0@gmail.com',
    subject: 'New Registration',
    text: `
      Name: ${body.name}
      Date of Birth: ${body.dob}
      Place of Origin: ${body.origin}
      Nationality: ${body.nationality}
      Mobile No: ${body.mobile}
      Email: ${body.email}
      Gender: ${body.gender}
    `,
    attachments: [
      {
        filename: body.passport.name,
        content: body.passport.data,
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
