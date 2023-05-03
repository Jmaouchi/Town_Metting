
// this fetch will send some data to the /api/users/login endpoint and then in the backend there is another post method to check if what we sent ( true or not,)
// If its true then it will send a OK response, if the response is ok (means checked the email and password correctly) in the fetch request, then document.location.replace with whatever you
// want to show them. also make sure  that in the backed post method, while its checking if the email and password are correct, to add another method to save the session.
// In the handlebars we can add an if login statement to show them some html they need to see
async function loginFormHandler(event) { 
  event.preventDefault();
  const email = document.querySelector('.email-login').value.trim();
  const password = document.querySelector('.password-login').value.trim();
  if (email && password) {
    const response = await fetch('/api/user/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert("Email ou mote de pass pas trouver");
    }
  }
}

// this fetch will send some data to the /api/users endpoint and then in the backend there is another post method to create a new user.
// in this case, we also have a method that will save the session.
async function signupFormHandler(event) {
  event.preventDefault();
  const username = document.querySelector('.username-signup').value.trim();
  const email = document.querySelector('.email-signup').value.trim();
  const password = document.querySelector('.password-signup').value.trim();
  // if the user provides all the infos, then do the post fetch
  if (username && email && password) {
    // post the data to this endpoint to create an account, and in the backend it will be the another post to post the data to the database with a create methode
    const response = await fetch('/api/user', {
      method: 'post',
      body: JSON.stringify({
        username,
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
      // after the account is been created, reffer them to another page
      document.location.replace('/');
    } else {
      alert("reload page and try again");
    }
  }
}


document.querySelector('.login').addEventListener('click', loginFormHandler);
document.querySelector('.signup').addEventListener('click', signupFormHandler);

