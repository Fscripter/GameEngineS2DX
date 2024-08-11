const animationLogo = document.getElementById("logo");
let first = false;
animationLogo.onanimationend = () => {
  if (first) {
    return;
  }
  setTimeout(() => {
    window.startup.startupEnds();
  }, 2500);
  first = true;
};
