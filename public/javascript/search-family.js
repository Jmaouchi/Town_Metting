const searchBtn = document.querySelector('#search')
const navbarIcon = document.querySelector('.navbar-little-icon');
const navbar = document.querySelector('.navbar-collapse')


async function getFamily(event){
  event.preventDefault()
  const familyName = document.querySelector('#search-family-input').value.trim();
   window.location.assign(`/family/searchByFamilyName/${familyName}`)
}


// show navbar on small screen 
function showNavItems(){
  const iconToggle = document.querySelector('.navbar-toggler-icon');
  const iconClose = document.querySelector('.active')

  // If the navbar className has the collapse className when we click on the button, then remove it, if not add it into the className
  if(navbar.classList.contains("collapse")){
    navbar.classList.remove('collapse')
    iconToggle.classList.remove('navbar-toggler-icon');
    iconToggle.textContent = 'X'
  }else{
    // This will show the navbar items, (since bootstrap collapse style will automaticly hide the items), and change the icon back to normal
    navbar.className = 'collapse navbar-collapse';
    iconClose.classList.add('navbar-toggler-icon');
    iconClose.textContent = ''
  }
}


navbarIcon.addEventListener('click', showNavItems)
searchBtn.addEventListener('click', getFamily)