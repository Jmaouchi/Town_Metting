const editMember = document.querySelector('.members')


function handleMemberEvent(event){
  // prevent the default behavior
  event.preventDefault();

  // get the className of the clicked element
  const e = event.target.className;
  console.log(e);
  // get the id out of the clicked element, so we can send a request to the backend, and be able to delete the item 
  const datasetId = event.target.dataset;

  if(e==="delete-member btn btn-danger"){
    deleteMember(datasetId.id);
  }
}


function deleteMember(id){
  fetch('/api/member/' + id,{
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
    // you can also use another fetch request to fetch all the data again instead of using a reload.
      window.location.reload();
  });
}

function showFamilyMembers(id){
  // After you click on the see members button, it will take you to see all the data of members of that family
  window.location.assign(`/member/${id}`)
}


// window.addEventListener('DOMContentLoaded', loadData)
// createFamilyName.addEventListener("click", handleMmberEvent)
// showMembers.addEventListener('click', showFamilyMembers)
editMember.addEventListener('click', handleMemberEvent)
