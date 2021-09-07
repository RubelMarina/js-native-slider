import Carousel from './swipe-carousel.js';
let carousel = new Carousel({
  containerID: '#carousel',
  slideID: '.slide',
  interval: 3000,
  isPlaing: true,
}
);

carousel.init();


