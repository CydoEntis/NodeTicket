const body = document.getElementsByTagName("body")[0];
const h3 = document.getElementsByTagName("h3");
const darkModeBtn = document.getElementById("darkMode");
const sideNav = document.querySelector(".nav-side")
const buttons = document.querySelectorAll(".btn");
const inputs = document.getElementsByTagName("input");
const comments = document.querySelectorAll(".comment");
const commentBodies = document.querySelectorAll(".comment-body");
const textareas = document.getElementsByTagName('textarea');


const darkModeOn = () => {
  body.classList.add('dark');
  sideNav.classList.add('dark-nav');

  for(let button of buttons) {
    button.classList.add('btn-dark');
  }

  for(let input of inputs) {
    input.classList.add("input-dark");
  }

  for(let comment of comments) {
    comment.classList.add("comment-dark");
  }

  for(let body of commentBodies) {
    body.classList.add("body-dark");
  }

  for(let textarea of textareas) {
    textarea.classList.add("input-dark");
  }
}

const darkModeOff = () => {
  body.classList.remove('dark');
  sideNav.classList.remove('dark-nav');

  for(let button of buttons) {
    button.classList.remove('btn-dark');
  }

  for(let input of inputs) {
    input.classList.remove("input-dark");
  }

  for(let comment of comments) {
    comment.classList.remove("comment-dark");
  }

  for(let body of commentBodies) {
    body.classList.remove("body-dark");
  }

  for(let textarea of textareas) {
    textarea.classList.remove("input-dark");
  }
}

window.onload = function() {
  const isDarkMode = JSON.parse(localStorage.getItem('darkMode'));
  console.log(isDarkMode);
  if(isDarkMode) {
    darkModeOn();
  } else if(localStorage.getItem('darkMode') === false){
    darkModeOff();
  }
}

darkModeBtn.addEventListener("click", () => {
  const isDarkMode = JSON.parse(localStorage.getItem('darkMode'));
  if(isDarkMode) {
    localStorage.setItem("darkMode", false);
    darkModeOff();
    darkModeBtn.innerHTML = "<i class='bx bx-moon' ></i>"
  } else {
    localStorage.setItem("darkMode", true);
    darkModeOn();
    darkModeBtn.innerHTML = "<i class='bx bx-sun' ></i>"
  }
})
