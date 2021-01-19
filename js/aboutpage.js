let pages = ["description", "skill-set", "experience", "possible-job"];
let upKeys = ["ArrowUp", "ArrowDown"];
let state = 0;

function switchPage(key) {

  // Current Page
  let currentPage = document.querySelector(`.${pages[state]}`);
  currentPage.style.display = "none";

  // Switch State
  if (key == "ArrowDown" && state < pages.length - 1) state++;
  else if (key == "ArrowUp" && state > 0) state--;

  // Next Page
  let nextPage = document.querySelector(`.${pages[state]}`);
  nextPage.style.display = "flex";

}

window.addEventListener("keydown", (event) => {
  if (event.key == "ArrowDown") {
    switchPage(event.key);
    }
  else if (event.key == "ArrowUp") {
    switchPage(event.key);}
})