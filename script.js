function toggleMenu() {
  const hamburgerIcon = document.querySelector(".hamburger-icon");
  const menuLinks = document.querySelector(".menu-links");
  const isOpen = hamburgerIcon.classList.toggle("open");
  menuLinks.classList.toggle("open");
  hamburgerIcon.setAttribute("aria-expanded", isOpen);
}
