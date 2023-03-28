const createFamilyName = document.querySelector('.main-row');


// delete row or update name in a row 
function handleEvent(event){
  // prevent the default behavior
  event.preventDefault();

  // get the className of the clicked element
  const e = event.target.className;
  console.log(e);
  // get the id out of the clicked element, so we can send a request to the backend, and be able to delete the item 
  const datasetId = event.target.dataset;

    if(e==="delete-family"){
      deleteFamily(datasetId.id)
    }else if(e==="edit-family"){
      alert('edit')
    }
}


function deleteFamily(id){
  fetch('http://localhost:3001/api/family/' + id,{
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
    // you can also use another fetch request to fetch all the data again instead of using a reload.
      window.location.reload();
  });
}


createFamilyName.addEventListener("click", handleEvent)