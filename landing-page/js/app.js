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
const navbarList = document.querySelector('#navbar__list');
const navFragment = document.createDocumentFragment();
const section = document.querySelectorAll('section');

let options = {
    threshold: 0.25
  }
  
let observer = new IntersectionObserver(setActiveSection, options);


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
        navbarList.appendChild(navFragment);
    }

}

function setActiveSection(entries){
    entries.forEach((entry) => {
        console.log(entry);
        if(entry.isIntersecting){
            entry.target.classList.toggle("active-section");
            console.log(`${entry.target.id} is ${entry.intersectionRect}`);
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


// Scroll to section on link click
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
