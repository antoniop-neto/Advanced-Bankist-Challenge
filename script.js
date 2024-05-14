'use strict';
///////////////////////// BANKIST APP /////////////////////////
///////////////////////////////////////////////////////////////

///////////////////// Elements selections /////////////////////
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
// Scroll elements
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
// navElements and navLink has same function, but used in different ways
const navElements = document.querySelectorAll('.nav__link');
const navLinks = document.querySelector('.nav__links');
// operations elements
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
// Menu fade animation
const nav = document.querySelector('.nav');
// Sticky navbar
const header = document.querySelector('.header');
///////////////////////////////////////////////////////////////

////////////////////////// FUNCTIONS //////////////////////////

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const handleHover = function (event) {
  if (event.target.classList.contains('nav__link')) {
    const link = event.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
///////////////////////////////////////////////////////////////

//////////////////////// Event Handlers ///////////////////////
///////////////////////////////////////////////////////////////

////////////////////////// Open Modal /////////////////////////

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

///////////////////////// Close Modal /////////////////////////
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
/////////////////////// Button Scrolling ///////////////////////

btnScrollTo.addEventListener('click', function (e) {
  // const s1Coords = section1.getBoundingClientRect();
  // console.log(s1Coords);
  // // e.target is the button element that is been clicked where Y represent the distance from the top to this element and X from the left side of the window.
  // console.log(e.target.getBoundingClientRect());

  // // pageXOffset and pageYOffset represent the exact distance from the top and left respectively;
  // console.log('Current Scroll (X/Y)', window.pageXOffset, window.pageYOffset);
  // // documentElement.clientHeight and documentElement.clientWidth represent the size of the window that is displaying.

  // console.log(
  //   'heigth / width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // // Scrooling
  // window.scrollTo(s1Coords.left + pageXOffset, s1Coords.top + pageYOffset);

  // // or
  // window.scrollTo({
  //   left: s1Coords.left + pageXOffset,
  //   top: s1Coords.top + pageYOffset,
  //   behavior: 'smooth',
  // });
  // // or
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////// NAV links ///////////////////////////

// navElements.forEach(element => {
//   element.addEventListener('click', function (event) {
//     event.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. Add event listener to common parent element
navLinks.addEventListener('click', function (event) {
  event.preventDefault();
  // Matching strategy
  if (event.target.classList.contains('nav__link')) {
    const id = event.target.getAttribute('href');
    // 2. Determinate what element originated the event
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////////////////////////////

/////////////////////// Tabbed Content ////////////////////////
tabsContainer.addEventListener('click', function (event) {
  event.preventDefault();
  const clicked = event.target.closest('.operations__tab');
  // Guard clause
  if (!clicked) return;
  // When you click in the button, it removes active from all buttons and add in the one you clicked.
  // Remove active classes from tabs and contents
  tabs.forEach(tab => {
    tab.classList.remove('operations__tab--active');
  });
  tabsContent.forEach(content => {
    content.classList.remove('operations__content--active');
  });
  // Activate tab
  clicked.classList.add('operations__tab--active');
  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.getAttribute('data-tab')}`)
    .classList.add('operations__content--active');
});
///////////////////////////////////////////////////////////////

///////////////////// Menu fade animation /////////////////////
// nav.addEventListener('mouseover', function (event) {
//   handleHover(event, 0.5);
// });
// Passing 'argument' into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));

// nav.addEventListener('mouseout', function (event) {
//   handleHover(event, 1);
// });
nav.addEventListener('mouseout', handleHover.bind(1));
///////////////////////////////////////////////////////////////

/////////////////////// Sticky navigation /////////////////////

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2], // 0 - 20%
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);
const navHeigth = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries; // to get the first element of entries
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeigth}px`, // 90px negative represent oposite margin
});
headerObserver.observe(header);
///////////////////////////////////////////////////////////////

//////////////////////// Reveal sections //////////////////////
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

///////////////////////////////////////////////////////////////

////////////////////// Lazy loading images ////////////////////
const allImages = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null, // null means intire newport
  threshold: 0,
  rootMargin: '200px',
});

allImages.forEach(img => {
  imgObserver.observe(img);
});
///////////////////////////////////////////////////////////////

//////////////////////////// Slides ///////////////////////////
// only to test - uncomment line 205 as well

// const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.4) translateX(-800px)';
// slider.style.overflow = 'visible';
// to remove
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const sliderBtnLeft = document.querySelector('.slider__btn--left');
  const sliderBtnRight = document.querySelector('.slider__btn--right');
  let currSlide = 0;
  const maxSlides = slides.length - 1;
  const dotContainer = document.querySelector('.dots');
  // 0%, 100%, 200%, 300% ...
  // slides.forEach((slide, i) => {
  //   slide.style.transform = `translateX(${100 * i}%)`;
  // });
  // -100%, 0%, 100%, 200% ...
  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  const nextSlide = function () {
    if (currSlide === maxSlides) {
      currSlide = 0;
    } else {
      currSlide++;
    }
    goToSlide(currSlide);
    activateDot(currSlide);
  };

  const previousSlide = function () {
    if (currSlide === 0) {
      currSlide = maxSlides;
    } else {
      currSlide--;
    }
    goToSlide(currSlide);
    activateDot(currSlide);
  };
  // dots
  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.remove('dots__dot--active');
      document
        .querySelector(`.dots__dot[data-slide="${slide}"`)
        .classList.add('dots__dot--active');
    });
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  sliderBtnRight.addEventListener('click', nextSlide);
  sliderBtnLeft.addEventListener('click', previousSlide);

  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowRight' && nextSlide();
    e.key === 'ArrowLeft' && previousSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const slide = e.target.dataset.slide;
      activateDot(slide);
      goToSlide(slide);
    }
  });
};
slider();
///////////////////////////////////////////////////////////////

// LECTURES
// Selecting Elements
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const header = document.querySelector('.header');
// console.log(header);

// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// document.getElementById('section--1');
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);
// console.log(document.getElementsByClassName('btn'));

// // Creating and inserting elements

// const message = document.createElement('div');
// // This is not in the DOM yet
// message.classList.add('cookie-message');
// // message.textContent = 'We use cookied for improve funcionality and analytics.';

// message.innerHTML =
//   'We use cookied for improve funcionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// // this element created cannot be in two places at the same time. In the example bellow, the second will replace the first one. To be in other places at the same time it needs to be cloned by using cloneNode().
// // those bellow are child of header
// // header.prepend(message);
// header.append(message);
// // header.append(message.cloneNode(true));

// // those below are siblings of the header
// // header.before(message);
// // header.after(message);

// // Delete elements
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove();
//     // old way to remove:
//     // message.parentElement.removeChild(message);
//   });

// // Styles
// // edit
// message.style.width = '120%';
// message.style.backgroundColor = '#37383d';

// // read

// console.log(message.style.backgroundColor); // rgb(55, 56, 61)
// console.log(message.style.color); // nothing happen in this case, because it is NOT possible to read computed atributes, only inline attributes. So to read this, it is necessary to use:
// // 'getComputedStyle()'
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
// // message.style.height = '80px';
// console.log(getComputedStyle(message).height);

// document.documentElement.style.setProperty('--color-primary', 'gray'); // this is use to set variables on CSS

// // Attributes
// // Standard attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);

// logo.alt = 'Beautiful minimalist logo';
// console.log(logo.alt);

// // non-standard attributes
// console.log(logo.designer); // This is going to return UNDEFINED because this attribute is not standard. So for this it is necessary use getAttribute().
// console.log(logo.getAttribute('designer'));
// logo.setAttribute('company', 'Bankist');

// // comparing
// console.log(logo.src); // it gets the full path
// console.log(logo.getAttribute('src')); // it gets only the relative path

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href); // 'http://127.0.0.1:8080/#'
// console.log(link.getAttribute('href')); // '#'

// // Data Attributes
// console.log(logo.dataset.versionNumber);

// // Classes
// logo.classList.add('test');
// logo.classList.remove('test');
// logo.classList.toggle('test');
// console.log(logo.classList.contains('test'));

// // Events
// const h1 = document.querySelector('h1');

// const alertH1 = function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');
//   h1.removeEventListener('mouseenter', alertH1);
// };

// h1.addEventListener('mouseenter', alertH1);

// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// random color
// rgb(255, 255, 255)

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// const navLink = document.querySelector('.nav__link');
// const navLinks = document.querySelector('.nav__links');
// const nav = document.querySelector('.nav');

// navLink.addEventListener('click', function (e) {
//   console.log('LINK clicked', e.target, e.currentTarget);
//   this.style.backgroundColor = randomColor();
//   console.log(e.currentTarget === this);
//   // STOP propagation
//   // e.stopPropagation(); it can solve some problems, but it is not commonly used.
// });
// navLinks.addEventListener('click', function (e) {
//   console.log('CONTAINER clicked', e.target, e.currentTarget);
//   this.style.backgroundColor = randomColor();
// });
// // capturing - third parameter = true -> NOT commonly used as well
// nav.addEventListener('click', function (e) {
//   console.log('NAV clicked', e.target, e.currentTarget);
//   this.style.backgroundColor = randomColor();
// });

// const h1 = document.querySelector('h1');

// // Going downwards: child
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children); // only HTML collection (<span> and <br>)
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// // Going upwards: parents

// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// h1.closest('h1').style.background = 'var(--gradient-primary)';

// // Going sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);
// // To get All siblings including the element itself

// console.log(h1.parentElement.children);
// // In case you need to do something that is NOT going to include h1
// [...h1.parentElement.children].forEach(el => {
//   if (el !== h1) {
//     el.style.transform = 'scale(0.5)'; // 50% of the original size
//   }
// });
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

// don't use this event too much only the user is about to loose data like when filling a form, for example.
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
// });
