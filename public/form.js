document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.php-email-form');

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get form data
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Configure the request
    xhr.open('POST', '/submit');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // Define the callback function when the request completes
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Request succeeded, display success message
        console.log('Form submitted successfully');
        displayMessage('success', 'Your message has been sent. Thank you!');
        form.reset(); // Clear the form
      } else {
        // Request failed, display error message
        console.error('Error submitting form');
        displayMessage('error', 'Oops! Something went wrong. Please try again.');
      }
    };

    // Create the request body
    const requestBody = `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&subject=${encodeURIComponent(subject)}&message=${encodeURIComponent(message)}`;

    // Send the request
    xhr.send(requestBody);
  });

  // Function to display success or error message
  function displayMessage(type, message) {
    const messageElement = document.querySelector('.sent-message');
    messageElement.textContent = message;

    if (type === 'success') {
      messageElement.classList.add('success-message');
      messageElement.classList.remove('error-message');
    } else {
      messageElement.classList.add('error-message');
      messageElement.classList.remove('success-message');
    }

    messageElement.style.display = 'block';

    // Hide the message after 3 seconds
    setTimeout(function () {
      messageElement.style.display = 'none';
    }, 3000);
  }
});
