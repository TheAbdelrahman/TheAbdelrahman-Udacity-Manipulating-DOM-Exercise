/**
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
*/



//Global Variables
const main= document.querySelector('main'); 
const nav = document.querySelector('nav');
const myPageSections = document.querySelectorAll('section'); 
const myNavList = document.getElementById('navbar__list'); 
const myFragment= document.createDocumentFragment(); 


/** start of Nav parts*/ 

// 1 - building the nav 

createNav();

function createNav() {
    myPageSections.forEach((section) => {
        const sectionID= section.getAttribute('id')
        const textToLinks = section.getAttribute('data-nav');
        const navMenuNodes = document.createTextNode(textToLinks);
        const navAnchors = document.createElement('a');
        const listItems = document.createElement('li');
        navAnchors.appendChild(navMenuNodes);
        listItems.appendChild(navAnchors);
        myFragment.appendChild(listItems);

        scrolling(navAnchors, section);

        navAnchors.style.cssText= 'cursor: pointer';
        navAnchors.classList.add(sectionID)

    });
}
myNavList.appendChild(myFragment);
// end of - building the nav 

// 2- dynamic scroll to section when anchor is clicked 
function scrolling(navAnchors, section) {
    navAnchors.addEventListener('click', () => {
        section.scrollIntoView({ behavior: 'smooth' });
    });
}


// 3 - start of - Hide Menu while Scrolling
function hideNav() {
    let lastScrollPosition = 0; //declaring last position to compare to it 

    window.onscroll = () => {
        const currentScrollPostion = window.pageYOffset; //locating and storing the current position
        if (lastScrollPosition > currentScrollPostion && window.innerWidth > 600) {   // I limited this so it won't be weird on mobiles
            nav.style.display = 'block';

        } else if (window.innerWidth > 600){
            setTimeout(() => {
                nav.style.display = 'none';
            }, 1000);
        }
        lastScrollPosition = currentScrollPostion;
    }
}
hideNav();
// end of hiding Menu while scrolling 

// 4 - creating the "burger button"
const navIcon= document.createElement('a');
const navIconNode =  document.createTextNode('|||');
navIcon.appendChild(navIconNode);
main.appendChild(navIcon);
navIcon.classList.add('nav-icon');

// 5 - hiding navbar in it's button by defult when the page loads in small screens 
if (window.innerWidth < 600) {
      nav.style.display="none"
}

// 6 - hiding/showing nav on clicks on it self or it's button

navIcon.addEventListener('click', showHide);
myNavList.addEventListener('click', showHide);

function showHide(){
   if (nav.style.display === 'none') {
       nav.style.display = 'block'
       } else {
            nav.style.display = 'none';
    }
}
/**end of Nav parts exept highLighting*/


/**  Add class 'active' to section when near top of viewport*/
// 1 - removing active section class from all sections
function leaveAll(section) {
    section.classList.remove('your-active-class');
}
// 2 - adding active section with some clarfication
function choose(viewing, section) {
    if (viewing) {
        section.classList.add('your-active-class'); 
        
        const sectionInView = section.getAttribute('id');   
        highLightNav(navAnchors, sectionInView); 
        //console.log(sectionInView); 
    };  
}
// end of adding active section with some clarfication

function locate(section) {
    return Math.floor(section.getBoundingClientRect().top);
}

function youAreHere() {
    myPageSections.forEach((section)=> {
        const sectPosition = locate(section);  // locating sections 
        viewing = () => sectPosition < 400 && sectPosition >= -200;  // how much near viewport?
        leaveAll(section);
        choose(viewing(), section);
    });
      
}
window.addEventListener('scroll' ,youAreHere); 
//end of Add active class


// highlighting navbar anchors with the same viewing section id

const navAnchors= document.querySelectorAll('nav > ul > li > a'); // declaring anchors 

function highLightNav(navAnchors, sectionInView) {
    navAnchors.forEach((navAnchor) => {
        navAnchor.parentElement.classList.remove('active-nav'); //removing active class from all nav listItems

        if (navAnchor.classList.contains(sectionInView)) { // choosing a navbr listItem

            navAnchor.parentElement.classList.add('active-nav');  // adding active class to a navbar listItem
        }
    });
}


/**-------other scrolling functions-------------- */
// adding a scroll to top button
const topButton= document.createElement('button');
const topButtonNode =  document.createTextNode('Top');
topButton.appendChild(topButtonNode)
main.appendChild(topButton);
topButton.classList.add('Top-button');

// showing the button when you scroll down 400px from the top
window.addEventListener('scroll', scrollFunction);

 function scrollFunction() {
  if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
    topButton.style.display = 'block';
  } else {
    topButton.style.display = 'none';
  }
}

// a function for the button itself
topButton.addEventListener('click', topFunction);

function topFunction() {
  window.scrollTo({top:0, behavior:'smooth'}); 
} 
/**-------End of other scrolling functions-------------- */

// making sections collapsable
const h2 = document.querySelectorAll('h2');
let i;

for (i = 0; i < h2.length; i++){

h2[i].addEventListener('click', function collapse() {

    const ptext = this.nextElementSibling;

    if(ptext.style.display === 'block' ){
        ptext.style.display = 'none'
    } else {
        ptext.style.display = 'block'
    }
});
}
// end of collapsing sections







