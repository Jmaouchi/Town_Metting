const commityBtn = document.querySelector('.commity-submit-btn')


async function addCommity(event){
  event.preventDefault();


  const firstName = document.querySelector('.commityFirstName').value.trim();
  const lastName = document.querySelector('.commityLastName').value.trim();
  const dateOfBirth = document.querySelector('.commityDateOfBirth').value.trim();

  if(firstName, lastName, dateOfBirth){
    const response = await fetch('/api/commity', {
      method: 'POST',
      body: JSON.stringify({
        firstName,
        lastName,
        dateOfBirth
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      // Reload the page and hide the Model Overlay
      document.location.assign('/commity');
    } else {
      alert(response.statusText);
    }
  }else{
    alert('no')
  }

}



commityBtn.addEventListener('click', addCommity)