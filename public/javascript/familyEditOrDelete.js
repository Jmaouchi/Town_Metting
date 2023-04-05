const createFamilyName = document.querySelector('.main-row');
const editInput = document.querySelector('.add-familyName-input');
const mainHomepageDiv = document.querySelector('.main-homepage-div');
const showMembers = document.querySelector('.show-family-members')


// delete row or update name in a row 
function handleEvent(event){
  // prevent the default behavior
  event.preventDefault();

  // get the className of the clicked element
  const e = event.target.className;
  console.log(e);
  // get the id out of the clicked element, so we can send a request to the backend, and be able to delete the item 
  const datasetId = event.target.dataset;

    if(e==="delete-family btn btn-primary"){
      deleteFamily(datasetId.id)
    }else if(e==="edit-family btn btn-primary"){
      // show model to be able to edit the family name
      hundleEditFamily(datasetId.id)
    }else if(e==="show-family-members btn btn-secondary"){
      showFamilyMembers(datasetId.id)
    }
}


function deleteFamily(id){
  fetch('/api/family/' + id,{
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
    // you can also use another fetch request to fetch all the data again instead of using a reload.
      window.location.reload();
  });
}


// Edit an existing family
function hundleEditFamily(id){
  // create a div 
  const addDiv = document.createElement('div');
  addDiv.className = 'add-family-container'
  addDiv.dataset.id = id;
  // create an input field 
  const addInput = document.createElement('input');
  addInput.className = 'add-family-input';
  addInput.dataset.id = id;
  // append the input field to the div
  addDiv.appendChild(addInput);
  // create a button
  const saveBtn = document.createElement("button");
  saveBtn.className = "btn btn-primary save-change-btn"
  saveBtn.textContent = "Save"
  saveBtn.dataset.id = id;
  // append the button to the div
  addDiv.appendChild(saveBtn)

  // append everything to the mainHomepageDiv
  mainHomepageDiv.appendChild(addDiv);

  // Update the data when we click on the save button that we created earlier
  document.querySelector('.add-family-container').addEventListener('click', function() {
    event.preventDefault();
    const e = event.target.className;
    console.log(e);
    if(e==='btn btn-primary save-change-btn'){
      fetch(`/api/family/update/` + id,{
        method:'PUT',
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          id: addInput.dataset.id,
          familyName: addInput.value
          
        })
      })
      .then(response => response.json())
      .then(data => {
        // realod the page, but here we can do another api call a ( GET all ) and display the data on a DOMloadContent
        window.location.reload();
      });
    }
  })
}


// function loadData(){
//   fetch('/api/family/'{
//         method:'GET',
//         headers:{
//           "Content-Type" : "application/json"
//         }
//       })
//       .then(response => response.json())
//       .then(data => {
//         // realod the page, but here we can do another api call to fetch the data again a
//         window.location.reload();
//       });

// }


function showFamilyMembers(id){
  // After you click on the see members button, it will take you to see all the data of members of that family
  window.location.assign(`/family/${id}`)
}


// window.addEventListener('DOMContentLoaded', loadData)
createFamilyName.addEventListener("click", handleEvent)
showMembers.addEventListener('click', showFamilyMembers)