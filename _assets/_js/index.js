document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(".toggle-button");
  const hamburgerIcon = toggleButton.querySelector(".hamburger-icon");
  const crossIcon = toggleButton.querySelector(".close-icon");
  const navbarMobile = document.querySelector(".navbar-mobile");

  toggleButton.addEventListener("click", function () {
    if (hamburgerIcon.style.display !== "none") {
        document.body.style.overflow = 'hidden';
        hamburgerIcon.style.display = "none";
        crossIcon.style.display = "block";
        navbarMobile.style.display = "block";
        navbarMobile.classList.add("fade-left-animation");
    } else {
        document.body.style.overflow = '';
        crossIcon.style.display = "none";
        hamburgerIcon.style.display = 'block';
        navbarMobile.classList.remove("fade-left-animation");
        navbarMobile.classList.add("fade-right-animation");
        setTimeout(() => {
            navbarMobile.style.display = "none";
            navbarMobile.classList.remove("fade-right-animation");
        }, 500);
    }
  });
});

window.addEventListener('scroll', function() {
    const navElement = document.querySelector('nav');
    if (navElement) {
      if (window.scrollY > 0  && screen.width >=768) {
        navElement.style.margin = '0px';
      } 
      else if(window.scrollY < 10  && screen.width >=768){
        navElement.style.margin = '20px 20px 0';
      }
    }
  });

const preloader = document.querySelector("#preloader");
if (preloader) {
  window.addEventListener('load', () => {
    preloader.style.opacity = "0";
    setTimeout(() => {
        preloader.remove();
      }, 1000);
  });
}

const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
    const { top, left, bottom, right } = el.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;
    return partiallyVisible
      ? ((top > 0 && top < innerHeight) ||
          (bottom > 0 && bottom < innerHeight)) &&
          ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
      : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
  };
  
  // Function to handle the visibility of elements
  function handleVisibility() {
    const elements = document.querySelectorAll('.in-viewport');
  
    elements.forEach(element => {
      if (elementIsVisibleInViewport(element)) {
        element.classList.add('active');
      } 
    });
  }
  
  // Event listener for scroll or any relevant event triggering visibility changes
  window.addEventListener('scroll', handleVisibility);
  
  // Initial check on page load
  handleVisibility();
