const hamburger = document.getElementById("mobileNav");
const close = document.getElementById("mobileClose");

hamburger.addEventListener("click", () => {
  sideNav.style.display = "block";
})

close.addEventListener("click", () => {
  sideNav.style.display = "none";
})