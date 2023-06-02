const submitFamily = document.querySelector('.submit-family');
const modelDiv = document.querySelector('.model-overlay');
const addModel = document.querySelector('.add-model')


// Function that will show the model overlay after we click on the add family button
function showModel(){
  modelDiv.hidden = false;
}


// function that will handle the post request. (to add the family name into the database)
async function familyFormHandler(event) {
  event.preventDefault();

  // make sure that this const is inside the familyFormHandler function
  const code = document.querySelector('.code').value.trim()
  const familyName = document.querySelector('.family-name-input').value.trim()

  if(familyName){
    const response = await fetch('/api/family', {
      method: 'POST',
      body: JSON.stringify({
        code,
        familyName
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      // Reload the page and hide the Model Overlay
      document.location.assign('/');
      modelDiv.hidden = true;
    } else {
      alert(response.statusText);
    }
  }else{
    alert('Name cant be empty')
  }
}

submitFamily.addEventListener('click', familyFormHandler);
addModel.addEventListener('click', showModel)