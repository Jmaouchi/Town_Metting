const commityBtn = document.querySelector('.commity-submit-btn');
const deleteCommity = document.querySelector('.commity-member');
const committeeBox = document.querySelector('.btn-show-hidden-box');
const hiddenBox = document.querySelector('.add-commity');
const closeHiddenBox = document.querySelector('.close-box')


async function addCommity(event){
  event.preventDefault();

  // get the input values
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
    alert('Somethig is missing!!')
  }
}



async function deleteCommityMember(event){
  // Get the className of the clicked element
  const e = event.target.className;
  // Get the datasetIf of the clicked element
  const datasetId = event.target.dataset;

  if(e==="delete-commity-member btn btn-danger"){
    fetch('/api/commity/' + datasetId.id,{
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      // you can also use another fetch request to fetch all the data again instead of using a reload.
        window.location.reload();
    });
  }else{
    alert('no')
  }
}

// show hidden box, (when you can add a commitee member)
showHiddenBox = () => {
  hiddenBox.hidden = false;
}

// hide box after you click on the close button
hideBox = () => {
  hiddenBox.hidden = true;
}





deleteCommity.addEventListener('click', deleteCommityMember)
commityBtn.addEventListener('click', addCommity)
committeeBox.addEventListener('click', showHiddenBox)
closeHiddenBox.addEventListener('click', hideBox)
