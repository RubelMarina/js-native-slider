 class Carousel {
  constructor(p) {
  let settings = {...{containerID: '#carousel', slideID: '.slide', interval: 5000, isPlaying: true}, ...p};

  this.container =  document.querySelector(settings.containerID);
  this.slides = this.container.querySelectorAll(settings.slideID);
  this.interval = settings.interval;
  this.isPlaying = settings.isPlaying;
}

_initProps() {
  this.slidesCount = 5;
  this.curretSlide = 0;

  this.CODE_LEFT_ARROW = 'ArrowLeft';
  this.CODE_RIGHT_ARROW = 'ArrowRight';
  this.CODE_SPACE = 'Space';
  this.FA_PAUSE = '<i class="fas fa-pause"></i>';
  this.FA_PLAY = '<i class="fas fa-play"></i>';
  this.FA_PREV = '<i class="fas fa-backward"></i>';
  this.FA_NEXT = '<i class="fas fa-forward"></i>';
}

_initSlides() {
  const slides = document.createElement('ul');
  slides.setAttribute('class', 'slides');
  
  for (let i = 0, n = this.slidesCount; i < n; i++) {
    const slide = document.createElement('li');
    const link = document.createElement('a');
    slide.setAttribute('class', 'slides__item');
    link.setAttribute('href', '#');
    slide.dataset.type = i;
    i === 0 && slide.classList.add('active');
    slides.appendChild(slide);
    slide.appendChild(link);
  }

this.container.appendChild(slides);
this.slides = this.container.querySelectorAll('.slides__item');
}

_initControls() {
  const controls = document.createElement('div');
  const PAUSE = `<span id="pause-btn" class="control control-pause">${this.FA_PAUSE}</span>`; 
  const PREV = `<span id="prev-btn" class="control control-prev">${this.FA_PREV}</span>`;
  const NEXT = `<span id="next-btn" class="control control-next">${this.FA_NEXT}</span>`;
  
  controls.setAttribute('class', 'controls');
  controls.innerHTML = PREV + PAUSE + NEXT;

  this.container.appendChild(controls);
  this.pauseBtn = this.container.querySelector('#pause-btn');
  this.prevBtn = this.container.querySelector('#prev-btn');
  this.nextBtn = this.container.querySelector('#next-btn');
}

_initIndicators() {
  const indicators = document.createElement('div');
  indicators.setAttribute('class', 'indicators');

  for (let i = 0, n = this.slidesCount; i < n; i++) {
    const indicator = document.createElement('span');
    indicator.setAttribute('class', 'indicators__item');
    indicator.dataset.slideTo = `${i}`;
    i === 0 && indicator.classList.add('active');
    indicators.appendChild(indicator);
  }
  this.container.appendChild(indicators);
  this.indicatorsContainer = this.container.querySelector('.indicators');
  this.indicators = this.indicatorsContainer.querySelectorAll('.indicators__item');
}

_initListeners() {
  document.addEventListener('keydown', this._pressKey.bind(this));
  this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
  this.prevBtn.addEventListener('click', this.prev.bind(this));
  this.nextBtn.addEventListener('click', this.next.bind(this));
  this.indicatorsContainer.addEventListener('click', this._indicate.bind(this));
  // this.container.addEventListener('mouseenter', this._pause.bind(this));
  // this.container.addEventListener('mouseleave', this._play.bind(this));
}

_gotoNth(n) {
  this.slides[this.curretSlide].classList.toggle('active');
  this.indicators[this.curretSlide].classList.toggle('active');
  this.curretSlide = (n + this.slidesCount) % this.slidesCount;
  this.slides[this.curretSlide].classList.toggle('active');
  this.indicators[this.curretSlide].classList.toggle('active');
}

_gotoPrev() {
  this._gotoNth(this.curretSlide - 1);
}
_gotoNext() {
  this._gotoNth(this.curretSlide + 1); 
}

_pause() {
  // if (this.isPlaying) {
    this.isPlaying = false;
    this.pauseBtn.innerHTML = `${this.FA_PLAY}`;
    this.pauseBtn.style.opacity = '1';
    clearInterval(this.timerID);
  // }
}

_play() {
  // if (!this.isPlaying) {
    this.isPlaying = true;
    this.pauseBtn.innerHTML = `${this.FA_PAUSE}`;
    this.pauseBtn.style.opacity = '0';
    this.timerID = setInterval(() => this._gotoNext(), this.interval);
  // }
}

_indicate(e) {
  const target = e.target;
    if (target && target.classList.contains('indicators__item')) {
      this._pause();
      this._gotoNth(+target.dataset.slideTo);   
    }
}

_pressKey(e) {
  if (e.code === this.CODE_LEFT_ARROW) this.prev();
  if (e.code === this.CODE_RIGHT_ARROW) this.next();
  if (e.code === this.CODE_SPACE) this.pausePlay();
}

pausePlay() {
  this.isPlaying ? this._pause() : this._play();
}

prev() {
  this._pause();
  this._gotoPrev();
}

next() {
  this._pause();
  this._gotoNext();
}

init() {
  this._initProps();
  this._initSlides();
  this._initControls();
  this._initIndicators();
  this._initListeners();
  if (this.isPlaying) this.timerID = setInterval(() => this._gotoNext(), this.interval);
}
}

export default Carousel;


