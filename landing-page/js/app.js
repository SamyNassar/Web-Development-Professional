/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const t0 = performance.now();
const landingContainer = document.querySelectorAll(".landing__container");
const landingContainerLength = landingContainer.length;
const navbar = document.querySelector('.navbar__menu');
const navFragment = document.createDocumentFragment();
let activeSection = document.querySelector('active-section');

let options = {
    threshold: 0.25
  }
  
let observer = new IntersectionObserver(setActiveSection, options);

const section = document.querySelectorAll('section');



/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function addToNavbar(item, index){

    const navItem = document.createElement('li');
    const parent = item.parentElement;
    navItem.innerHTML =`<a href="#${parent.id}">${parent.dataset.nav}</a>`;
    navFragment.appendChild(navItem);

    if(landingContainerLength == index + 1){
        navbar.appendChild(navFragment);
    }

}

function setActiveSection(entries){
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.toggle("active-section");
        } else{
            if(entry.target.classList.contains("active-section")){
                entry.target.classList.toggle("active-section");
            }
        }
        
    })
}



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the Navbar
landingContainer.forEach((item, index) => {
    addToNavbar(item, index);
});




// Add class 'active' to section when near top of viewport
section.forEach((section) => {
    observer.observe(section);
})



/**
 * End Main Functions
 * Begin Events
 * 
*/





console.log(performance.now() - t0);
