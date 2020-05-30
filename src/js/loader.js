(function () {
  if(window.screen.width > 998) {
    return false;
  }
  document.onreadystatechange = function () {
    if (document.readyState !== "complete") {
      document.querySelector("body").classList.add("preloader-init");
      document.querySelector("#loader").classList.add("preloader-init");
    } else {
      document.querySelector("#loader").classList.remove("preloader-init");
      document.querySelector("body").classList.remove("preloader-init");
    }
  };
})();
