// Global variables
let menu = document.querySelector(".topnav.menu");
let originalClass = "topnav menu";


// What happen when you click menu
function openMenu() {

  // Show menu upon click
  if (menu.className == originalClass) {
    menu.className += " responsive";
	
  // Close menu after it
  } else {
    menu.className = originalClass;
  }

  // Change burger style upon click
  let burger = document.querySelector(".burger");
  burger.style.backgroundColor = "rgba(58, 60, 90, 0.7)";

  setTimeout(() => {
    burger.style.backgroundColor = "transparent";
    } ,300 );
}

// Menu move up animation
function moveMenuUp() {

  menu.className += " responsive";  // add class name
  let responsive = document.querySelector("nav .menu.responsive");
  let top = 0;
  let moveUp = setInterval( () => {
    if (top <= 50) {
      responsive.style.top = `${top}px`;
      top++;
    } else {
      clearInterval(moveUp);
    }
  }, 5);
}

// Menu move down animation
function moveMenuDown() {
  let responsive = document.querySelector("nav .menu.responsive");
  let top = 50;
  let moveDown = setInterval( () => {
    if (top >= 0) {
      responsive.style.top = `${top}px`;
      top--;
    } else {
      menu.className = originalClass;  // delete last class
      clearInterval(moveDown);
    }
  }, 5);
}




