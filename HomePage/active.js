//active navbar
(function () {
  let currentPath = location.pathname.split("/")[2];
  console.log(currentPath);
  if (currentPath === "") return;
  const headerNav = document.querySelector(".header-nav");
  console.log(headerNav);
  const navLinks = headerNav.querySelectorAll("li > a");
  //   console.log(navPages);
  navLinks.forEach((nav) => {
    // console.log(nav);
    // console.log(nav.getAttribute("href"));
    if (nav.getAttribute("href").indexOf(currentPath) !== -1) {
      nav.className += "nav-active";
    }
  });
})();
