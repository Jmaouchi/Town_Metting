const member = document.querySelector('.add-member');
const showMemberBox = document.querySelector('.show-add-member-box');



async function addMember(event){
  event.preventDefault()
  const firstName = document.querySelector('.memberFirstName').value.trim();
  const lastName = document.querySelector('.memberLastName').value.trim();
  const dateOfBirth = document.querySelector('.memberDateOfBirth').value.trim();
  const family_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  const response = await fetch('/api/member', {
    method: 'POST',
    body: JSON.stringify({
      firstName,
      lastName,
      dateOfBirth,
      family_id
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    // Reload the page and hide the Model Overlay
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}


function showBox(){
  // Get the form className, then show the form after we click on the add member button
  const addForm = document.querySelector('.add-member-form')
  // Get the add member button, then hide it after we show the form
  const addBtn = document.querySelector('.show-add-member-box');

  addForm.hidden = false;
  addBtn.style.display = 'none'
}



showMemberBox.addEventListener('click', showBox)
member.addEventListener('click', addMember)