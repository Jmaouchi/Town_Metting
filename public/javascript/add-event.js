const events = document.querySelector('.event-submit-btn');

async function addEvent(event){
  event.preventDefault();

  // get the input values
  const code = document.querySelector('.code').value.trim();
  const eventName = document.querySelector('.eventName').value.trim();
  const eventAddress = document.querySelector('.eventAddress').value.trim();
  const eventDate = document.querySelector('.eventDate').value.trim();
  const description = document.querySelector('.description').value.trim();

  if(code, eventName, eventAddress, eventDate, description){
    const response = await fetch('/api/event', {
      method: 'POST',
      body: JSON.stringify({
        code,
        eventName,
        eventAddress,
        eventDate,
        description
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      // Reload the page and hide the Model Overlay
      document.location.assign('/event');
    } else {
      alert("Ceci ne peut pas être terminé, vous n'êtes pas un administrateur")
      alert(response.statusText);
    }
  }else{
    alert('Somethig is missing!!')
  }
}

events.addEventListener('click', addEvent)
