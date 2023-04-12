const deleteBtn = document.querySelector('.sections');
const showAddEventBox = document.querySelector('.btn-show-hidden-event-box');
const eventBox = document.querySelector('.add-event');
const closeBtn = document.querySelector('.close-box');


function deleteEvent (event) {
  // prevent the default behavior
  event.preventDefault();

  // get the className of the clicked element
  const e = event.target.className;
  console.log(e);
  // get the id out of the clicked element, so we can send a request to the backend, and be able to delete the item 
  const datasetId = event.target.dataset;

  if(e==="delete-event btn btn-danger"){
    deleteEventHandler(datasetId.id)
  }
} 


deleteEventHandler = (id) => {
  fetch('/api/event/' + id,{
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
    // you can also use another fetch request to fetch all the data again instead of using a reload.
      window.location.reload();
  });
}

// show hidden box
showBox = () => {
  eventBox.hidden = false;
}

closeBox = () => {
  eventBox.hidden = true;
}


showAddEventBox.addEventListener('click', showBox)
closeBtn.addEventListener('click', closeBox)
deleteBtn.addEventListener('click', deleteEvent)