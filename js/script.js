document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(".icon-menu");
  const menu = document.querySelector(".menu__body");

  function toggleNav() {
    menu.classList.toggle("active");
    menuButton.classList.toggle("active");
    document.body.style.overflow = menu.classList.contains("active")
      ? "hidden"
      : "auto";
  }

  menuButton.addEventListener("click", toggleNav);

  document.querySelectorAll(".menu__link").forEach((link) => {
    link.addEventListener("click", function () {
      toggleNav();

      setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 300);
    });
  });
});
