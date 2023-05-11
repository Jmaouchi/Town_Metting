const deleteBtn = document.querySelector('.sections');
const showAddHelpBox = document.querySelector('.btn-show-hidden-help-box');
const helpBox = document.querySelector('.add-help');
const closeBtn = document.querySelector('.close-box');


function deleteHelp (event) {
  // prevent the default behavior
  event.preventDefault();

  // get the className of the clicked element
  const e = event.target.className;
  console.log(e);
  // get the id out of the clicked element, so we can send a request to the backend, and be able to delete the item 
  const datasetId = event.target.dataset;

  if(e==="delete-problem btn btn-danger"){
    deleteHelpHandler(datasetId.id)
  }
} 


deleteHelpHandler = (id) => {
  const emailFromLocalStroage = localStorage.getItem("email");
  if(emailFromLocalStroage === "djigo.maouchi@yahoo.com" || emailFromLocalStroage === "Djigo.maouchi@yahoo.com"){
  fetch('/api/help/' + id,{
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
    // you can also use another fetch request to fetch all the data again instead of using a reload.
      window.location.reload();
  });
}else{
  alert('cant')
}
}

// show hidden box
showBox = () => {
  helpBox.hidden = false;
}

closeBox = () => {
  helpBox.hidden = true;
}


showAddHelpBox.addEventListener('click', showBox)
closeBtn.addEventListener('click', closeBox)
deleteBtn.addEventListener('click', deleteHelp)