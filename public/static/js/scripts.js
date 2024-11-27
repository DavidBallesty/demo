

// Initialize functions when the window loads
window.onload = function() {

};


document.addEventListener('DOMContentLoaded', function() {
  const nav = document.getElementById('horizontal-nav');
  let totalScrollWidth = calculateTotalWidth(nav);  // Assume this function is defined to calculate width

  nav.addEventListener('wheel', function(e) {
      e.preventDefault();  // Prevent the default scroll behavior

      let scrollStep = 100;  // Adjust the step size based on your needs
      let delta = e.deltaY;

      if (delta < 0 && nav.scrollLeft > 0) {
          nav.scrollLeft -= scrollStep;
      } else if (delta > 0 && nav.scrollLeft < totalScrollWidth - nav.clientWidth) {
          nav.scrollLeft += scrollStep;
      }

      console.log('Current scroll position:', nav.scrollLeft);
  }, { passive: false });
});

function calculateTotalWidth(nav) {
  const children = nav.querySelectorAll('div');
  return Array.from(children).reduce((total, child) => total + child.offsetWidth, 0);
}

// Custom Cursor Movement
document.addEventListener('mousemove', (e) => {
  const cursor = document.getElementById('custom-cursor');
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});




// Full-page horizontal scroll effect
window.addEventListener('wheel', function(e) {
  e.preventDefault(); // Prevent default scrolling behavior

  const nav = document.getElementById('horizontal-nav');
  let totalScrollWidth = calculateTotalWidth(nav);

  let scrollStep = 100; // Adjust the step size based on your needs
  let delta = e.deltaY;

  if (delta < 0 && nav.scrollLeft > 0) {
      nav.scrollLeft -= scrollStep;
  } else if (delta > 0 && nav.scrollLeft < totalScrollWidth - nav.clientWidth) {
      nav.scrollLeft += scrollStep;
  }

  console.log('Current scroll position:', nav.scrollLeft);
}, { passive: false });



/* this event listener allows the horizontal-nav to be in italics when the mouse iis being scrolled*/
document.addEventListener('DOMContentLoaded', function() {
  const nav = document.getElementById('horizontal-nav');
  let isScrolling;

  // Scroll event listener
  nav.addEventListener('scroll', function() {
    // Add the 'italic-text' class on scroll
    nav.classList.add('italic-text');
    
    // Clear our timeout throughout the scroll
    window.clearTimeout(isScrolling);
    
    // Set a timeout to run after scrolling ends
    isScrolling = setTimeout(function() {
      // Remove the 'italic-text' class when scrolling stops
      nav.classList.remove('italic-text');
    }, 66); // 66ms is about the rate at which the browser renders frames
  }, false);
});
// Rest of the scripts.js code...
// Define a flag to track if the scroll event has happened
let hasScrolled = false;

document.addEventListener('DOMContentLoaded', function() {
  const nav = document.getElementById('horizontal-nav');
  const cursor = document.getElementById('custom-cursor');
  let isScrolling;

  // Scroll event listener
  nav.addEventListener('scroll', function() {
    // Change cursor and add italic style on first scroll
    if (!hasScrolled) {
      console.log("Adding bullseye-cursor class"); // Log when adding the class
      cursor.classList.remove('scroll-cursor');
      cursor.classList.add('bullseye-cursor');
      hasScrolled = true; // Set the flag so it doesn't change back
      console.log("Cursor class after adding:", cursor.className); // Check the class of the cursor
      // Additional logs to inspect the cursor element
      console.log("Cursor element styles:", cursor.style);
      console.log("Computed cursor background:", getComputedStyle(cursor).background);
    }

    // Add the 'italic-text' class on scroll
    nav.classList.add('italic-text');
    
    // Clear our timeout throughout the scroll
    window.clearTimeout(isScrolling);
    
    // Set a timeout to run after scrolling ends
    isScrolling = setTimeout(function() {
      // Remove the 'italic-text' class when scrolling stops
      nav.classList.remove('italic-text');
    }, 66); // Delay in ms
  }, false);
});






