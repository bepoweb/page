document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const submitButton = document.getElementById('submit');

  if (!form || !nameInput || !emailInput || !subjectInput || !messageInput || !submitButton) {
    console.error('One or more form elements are not found');
    return;
  }

  submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Submit button clicked, form submission prevented');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    console.log('Input values:', { name, email, subject, message });

    if (name === '' || email === '' || message === '') {
      alert('Please fill in all the fields!');
      console.log('Validation failed: some fields are empty');
      return;
    }

    if (!validateEmail(email)) {
      alert('Invalid email address!');
      console.log('Validation failed: invalid email address');
      return;
    }

    console.log('Validation passed');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('message', message);

    console.log('Form data prepared:', formData);

    fetch('/contact', {
      method: 'POST',
      body: formData,
    })
    .then((response) => {
      console.log('Server response:', response);
      return response.json();
    })
    .then((data) => {
      console.log('Response JSON:', data);
      if (data.success) {
        alert('Message sent successfully!');
        form.reset();
        console.log('Form reset');
      } else {
        alert('Error sending message!');
        console.log('Server indicated failure:', data);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });

  function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailRegex.test(email);
    console.log('Email validation:', email, isValid);
    return isValid;
  }
});
