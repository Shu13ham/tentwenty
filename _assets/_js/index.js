document.addEventListener("DOMContentLoaded", function () {
  hamburgerToggle();
  navbarToggle();
  preloaderSetting();
  checkViewportVisibility();
  customCursorSetting();
});

function removeElementIfHidden() {
  const displayNoneElement = document.querySelector('.d-none'); 

  if (displayNoneElement && window.innerWidth < 768) {
    displayNoneElement.remove(); 
  }
}
window.addEventListener('resize', removeElementIfHidden);
removeElementIfHidden();

function hamburgerToggle() {
  const toggleButton = document.querySelector(".toggle-button");
  const hamburgerIcon = toggleButton.querySelector(".hamburger-icon");
  const crossIcon = toggleButton.querySelector(".close-icon");
  const navbarMobile = document.querySelector(".navbar-mobile");

  toggleButton.addEventListener("click", function () {
    const isHamburgerHidden = hamburgerIcon.style.display === "none";    //to check if hamburger is hidden or visible

    document.body.style.overflow = !isHamburgerHidden ? "hidden" : "";
    hamburgerIcon.style.display = !isHamburgerHidden ? "none" : "block"; //hamburger toggle
    crossIcon.style.display = !isHamburgerHidden ? "block" : "none"; //close icon toggle

    if (!isHamburgerHidden) {
      navbarMobile.style.display = "block";
      navbarMobile.classList.add("fade-left-animation"); //fade left animation on click of hamburger
    } else {
      navbarMobile.classList.remove("fade-left-animation");
      navbarMobile.classList.add("fade-right-animation"); //fade left animation on click of close icon
      setTimeout(() => {
        navbarMobile.style.display = "none";
        navbarMobile.classList.remove("fade-right-animation"); //delay so that animation plays till the end smoothly
      }, 500);
    }
  });
}

function navbarToggle() {
  window.addEventListener("scroll", function () {
    const navElement = document.querySelector("nav");
    if (navElement) {
      if (window.scrollY > 0 && screen.width >= 768) {
        navElement.style.margin = "0px"; //making it full width alongside position sticky
      } else if (window.scrollY < 10 && screen.width >= 768) {
        navElement.style.margin = "20px 20px 0"; //as per design with margin at sides and top
      }
    }
  }, { passive: true }); // for speeding up page
}

function preloaderSetting() {
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.remove();
      }, 1000); //delay so that animation plays smoothly
    });
  }
}

function checkViewportVisibility() {
  const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
    const { top, left, bottom, right } = el.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;
    return partiallyVisible
      ? ((top > 0 && top < innerHeight) ||
          (bottom > 0 && bottom < innerHeight)) &&
          ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
      : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
  };
  //To handle the visibility of elements
  function handleVisibility() {
    const elements = document.querySelectorAll(".in-viewport");

    elements.forEach((element) => {
      if (elementIsVisibleInViewport(element)) {
        element.classList.add("active");
      }
    });
  }
  // Event listener for scroll
  window.addEventListener("scroll", handleVisibility, { passive: true });
  // Initial check on initial load
  handleVisibility();
}

function customCursorSetting() {
  const customCursor = document.querySelector('.custom-cursor');
  const positionElement = (e) => {
    const mouseY = e.clientY;
    const mouseX = e.clientX;
    customCursor.style.top = `${mouseY}px`;
    customCursor.style.left = `${mouseX}px`;
  }
  window.addEventListener('mousemove', positionElement);
}

let slideIndex = 0;
const slidesToShow = 3;
const slides = document.querySelectorAll(".slide");
const slidesWrapper = document.querySelector(".slides");
const slideWidth = slidesWrapper.offsetWidth;
const slidesContainer = document.querySelector(".slides");
const totalSlides = slides.length;

function changeSlide(n) {
  slideIndex += n;
  if (slideIndex >= totalSlides) {
    slideIndex = 0;
  } else if (slideIndex < 0) {
    slideIndex = totalSlides - 1;
  }

  if (slideIndex + slidesToShow >= totalSlides) {
    slidesContainer.style.transform = `translateX(-${
      ((slideIndex + slidesToShow - totalSlides) * slideWidth) / 3 //calculating how much to scroll at once
    }px)`;
  } else {
    slidesContainer.style.transform = `translateX(-${
      (slideIndex * slideWidth) / 3
    }px)`;
  }

  // Remove active and similar classes from all slides
  slides.forEach((slide) => slide.classList.remove("active"));
  slides.forEach((slide) => slide.classList.remove("left-slide-rotate"));
  slides.forEach((slide) => slide.classList.remove("right-slide-rotate"));
  slides.forEach((slide) => slide.classList.remove("left-most-slide-rotate"));
  slides.forEach((slide) => slide.classList.remove("right-most-slide-rotate"));

  // Calculate the index of the middle slide
  const middleSlideIndex = slideIndex + Math.ceil(slidesToShow / 2);

  // Add classes to the apropriate slides in order to decide the transform calculation
  slides[middleSlideIndex].classList.add("active");
  slides[middleSlideIndex - 1].classList.add("left-slide-rotate");
  slides[middleSlideIndex + 1].classList.add("right-slide-rotate");
  slides[middleSlideIndex - 2].classList.add("left-most-slide-rotate");
  slides[middleSlideIndex + 2].classList.add("right-most-slide-rotate");
}

// Show the first set of slides initially
slides[2].classList.add("active");
slides[1].classList.add("left-slide-rotate");
slides[3].classList.add("right-slide-rotate");
changeSlide(0);
// setInterval(() => {
//   changeSlide(1);
// }, 3000); //for automatic carousel play after 3 secs


// Variables to track the start position of the drag
let dragStartX = 0;
let dragging = false;

// Add event listeners for touch and mouse events
slidesContainer.addEventListener("mousedown", handleDragStart);
slidesContainer.addEventListener("touchstart", handleDragStart);
slidesContainer.addEventListener("mousemove", handleDrag);
slidesContainer.addEventListener("touchmove", handleDrag);
slidesContainer.addEventListener("mouseup", handleDragEnd);
slidesContainer.addEventListener("touchend", handleDragEnd);
slidesContainer.addEventListener("mouseleave", handleDragEnd);

// Functions to handle drag start, drag, and drag end events
function handleDragStart(e) {
  dragging = true;
  dragStartX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
}

function handleDrag(e) {
  if (dragging) {
    const currentX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
    const diffX = currentX - dragStartX;
    
    // Change the slide based on the drag movement
    if (Math.abs(diffX) > 50) {
      changeSlide(diffX > 0 ? -1 : 1); // Change the slide based on the drag direction
      dragging = false;
    }
  }
}

function handleDragEnd() {
  dragging = false;
}

