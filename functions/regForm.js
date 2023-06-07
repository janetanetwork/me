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

  // Create a transport object using your SMTP credentials
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'aguj911@gmail.com',
      pass: 'niivfvvmjhzbwhnk',
    },
  });

  // Email to the website owner
  const ownerMailOptions = {
    from: email,
    to: 'ojiezele0@gmail.com',
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
  };

  // Email to the user
  const userMailOptions = {
  from: 'ojiezele0@gmail.com',
  to: email,
  subject: 'Congratulations for Your Registration',
  html: `
    <p>Congratulations, you have successfully registered on sugarmummyconnects.</p><p> Agent Vivian will get in touch with you within 24 hours.</p>
    <p>Please click the button below to contact Agent Vivian:</p>
    <a href="https://t.me/vivianjerry1" target="_blank" style="display:inline-block;background-color:#4CAF50;color:#ffffff;padding:10px 20px;text-decoration:none;">Contact Agent Vivian</a>
  `,
};

  // Send the emails
  transporter.sendMail(ownerMailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return callback(null, {
        statusCode: 500,
        body: 'Error',
      });
    } else {
      console.log('Owner Email sent: ' + info.response);
      transporter.sendMail(userMailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return callback(null, {
            statusCode: 500,
            body: 'Error',
          });
        } else {
          console.log('User Email sent: ' + info.response);
          return callback(null, {
            statusCode: 302, // Redirect status code
            headers: {
              Location: '/', // Set the desired redirect location
            },
            body: '',
          });
        }
      });
    }
  });
};
