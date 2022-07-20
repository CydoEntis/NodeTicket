const body = document.getElementsByTagName("body")[0];
const h3 = document.getElementsByTagName("h3");
const darkModeBtn = document.getElementById("darkMode");
const sideNav = document.querySelector(".nav-side")
const button = document.querySelector(".btn");
const deskTopButton = document.querySelector(".btn-desktop");


darkModeBtn.addEventListener("click", () => {
  body.classList.add('dark');
  // h3.classList.add('dark-txt');
  sideNav.style.backgroundColor = "#1E1E1E";
  sideNav.style.border = "none";
  button.style.backgroundColor = "white";
  button.style.color = "black";
  deskTopButton.style.backgroundColor = "white";
  deskTopButton.style.color = "black";

})
