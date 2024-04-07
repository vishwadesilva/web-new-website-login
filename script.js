document.addEventListener('DOMContentLoaded', function() {
  const signInForm = document.querySelector('.login-form');
  signInForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const username = signInForm.querySelector('#username').value;
      const password = signInForm.querySelector('#password').value;

      // Get users from local storage
      const localStorageUsers = JSON.parse(localStorage.getItem('users')) || [];

      // Hardcoded user data
      const hardcodedUsers = [
          {
              "username": "admin",
              "password": "admin",
              "role": "admin",
              "email": "admin@admin.com"
          },
          {
              "username": "user",
              "password": "user",
              "role": "site user",
              "email": "user@user.com"
          }
      ];

      // Combine hardcoded users and local storage users
      const allUsers = [...localStorageUsers, ...hardcodedUsers];

      const user = allUsers.find(u => u.username === username && u.password === password);
      if (user) {
          // Store user details in localStorage
          localStorage.setItem('currentUser', JSON.stringify(user));
          alert('Login successful!');
          window.location.href = 'index.html';
      } else {
          alert('Invalid username or password');
      }
  });

  const signUpForm = document.querySelector('.register-form');
  signUpForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const fullname = signUpForm.querySelector('#fullname').value;
      const newusername = signUpForm.querySelector('#newusername').value;
      const email = signUpForm.querySelector('#email').value;
      const newpassword = signUpForm.querySelector('#newpassword').value;

      // Get existing users or initialize empty array
      const users = JSON.parse(localStorage.getItem('users')) || [];

      // Check if the username or email already exists
      const existingUser = users.find(u => u.username === newusername || u.email === email);
      if (existingUser) {
          alert('Username or email already exists');
          return;
      }

      // Add the new user to the array
      const newUser = {
          fullname,
          username: newusername,
          email,
          password: newpassword
      };
      users.push(newUser);

      // Store updated user data in localStorage
      localStorage.setItem('users', JSON.stringify(users));

      alert('Registration successful!');
      // Clear the form fields
      signUpForm.reset();
  });
});

// Newsletter Form Function
function newsletterForm() {
    return {
      email: '',
      subscribe() {
        // Regular expression to validate email address format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // Check if the entered email matches the pattern
        if (!emailPattern.test(this.email)) {
          alert('Please enter a valid email address.');
          return;
        }
  
        // Save the email to local storage
        const newsletterEmails = JSON.parse(localStorage.getItem('newsletterEmails')) || [];
        newsletterEmails.push(this.email);
        localStorage.setItem('newsletterEmails', JSON.stringify(newsletterEmails));
  
        // Redirect to the newslettersave.html page
        window.location.href = "newslettersave.html";
      }
    };
  }
// Function to display subscribed email addresses
function displaySubscribedEmails() {
    const newsletterEmails = JSON.parse(localStorage.getItem('newsletterEmails')) || [];
    const listContainer = document.getElementById('subscribedEmailList');
    
    newsletterEmails.forEach(function(email) {
      const listItem = document.createElement('li');
      listItem.textContent = email;
      listContainer.appendChild(listItem);
    });
  }
    