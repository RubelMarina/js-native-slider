// import Carousel from './carousel.js';
// let carousel = new Carousel();

import Carousel from './swipe-carousel.js';
let carousel = new Carousel({
  containerID: '#carousel',
  slideID: '.slide',
  interval: 2000,
  isPlaing: true,
}
);

carousel.init();


