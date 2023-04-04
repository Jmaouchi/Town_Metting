// - if the button is clicked then call this javascript file
// - make sure to finish the add family, the box need to go away after we click add button
// - loggin page setup 
// - Evenement tab, it will have, add an event, name and date and description, then it will create the event
// on the evemt page we will have, add a groupe, then people of that goupe and what their task is. you can create multiple groupes 


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
  const familyName = document.querySelector('.family-name-input').value.trim()

  if(familyName){
    const response = await fetch('/api/family', {
      method: 'POST',
      body: JSON.stringify({
        familyName
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      // Reload the page and hide the Model Overlay
      document.location.reload();
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