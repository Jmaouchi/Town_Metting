const helpForm = document.querySelector('.request-help-form');
const btnSubmitHelp = document.querySelector('.help-submit-btn');
const showHelpBox = document.querySelector('.btn-show-hidden-help-box');



async function addHelp(event){
  event.preventDefault()
  const fullName = document.querySelector('.fullName').value.trim();
  const numero = document.querySelector('.numero').value.trim();
  const issue = document.querySelector('.probleme').value.trim();

  // if the user enter all the inputs
  if(fullName, numero, issue){
  const response = await fetch('/api/help', {
    method: 'POST',
    body: JSON.stringify({
      fullName,
      numero,
      issue
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    // Reload the page and hide the Model Ov')erlay
    document.location.reload();
  } else {
    alert(response.statusText);
  }
  }else{
  alert('remplissez tout ce formulaire')
}
}


function showBox(){
  helpForm.hidden = false;
  showHelpBox.style.display = 'none'
}



showHelpBox.addEventListener('click', showBox)
btnSubmitHelp.addEventListener('click', addHelp)