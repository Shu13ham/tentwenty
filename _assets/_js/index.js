document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.querySelector('.toggle-button');
    const hamburgerIcon = toggleButton.querySelector('.hamburger-icon');
    const crossIcon = toggleButton.querySelector('.close-icon');
    const navbarMobile = document.querySelector('.navbar-mobile');
  
    toggleButton.addEventListener('click', function() {
      if (hamburgerIcon.style.display !== 'none') {
        hamburgerIcon.style.display = 'none';
        crossIcon.style.display = 'block';
        navbarMobile.style.display = 'block';
      } else {
        navbarMobile.style.display = 'none';
        crossIcon.style.display = 'none';
        hamburgerIcon.style.display = 'block';
      }
    });
  });