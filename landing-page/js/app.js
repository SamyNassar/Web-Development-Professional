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
const sections = document.querySelectorAll('section');
let currentActiveSection;

setTimeout(() => {
    const navAnchors = document.querySelectorAll('nav a');
},0)



let options = {
    threshold: [.1,.2,.3,.4,.5,.6,.7,.8,.9,1]
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
        if(entry.isIntersecting){
            if(currentActiveSection == undefined){
                currentActiveSection = entry;
                addActiveToSection(currentActiveSection.target);
                addActiveToAnchor(currentActiveSection.target.id)
            } else{
                if(entry.target.id == currentActiveSection.target.id || 
                    entry.intersectionRatio > currentActiveSection.intersectionRatio){
                        removeActiveFromSection(currentActiveSection.target);
                        removeActiveFromAnchor(currentActiveSection.target.id);
                        currentActiveSection = entry;
                        addActiveToSection(currentActiveSection.target);
                        addActiveToAnchor(currentActiveSection.target.id);
                }
            }
        }
    })
}

function removeActiveFromSection(section){
    if(section.classList.contains("active-section")){
        section.classList.toggle("active-section");
    }
}

function addActiveToSection(section){
    if(!section.classList.contains("active-section")){
        section.classList.toggle("active-section");
    }
}


function addActiveToAnchor(id){
    const activeAnchor = document.querySelector(`a[href="#${id}"]`);
    if(!activeAnchor.classList.contains("active-anchor")){
        activeAnchor.classList.toggle("active-anchor");
    }
}
function removeActiveFromAnchor(id){
    const activeAnchor = document.querySelector(`a[href="#${id}"]`);
    if(activeAnchor.classList.contains("active-anchor")){
        activeAnchor.classList.toggle("active-anchor");
    }
}

function initNavMenu(){
    const navMenu = document.querySelector('.burger');
    const nav = document.querySelector('.nav-list');
    navMenu.addEventListener('click', () => {
        nav.classList.toggle("passive-menu");
    });
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
sections.forEach((section) => {
    observer.observe(section);
})

// Initialize Navbar Menu.
initNavMenu();


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

console.log(performance.now() - t0);