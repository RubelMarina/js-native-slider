function createCarousel(containerID = '#carousel', slideID = 'slide') {
  this.container =  document.querySelector('#carousel');

  this.interval = 2000;
};

createCarousel.prototype = {
  
  _initProps() {
    
    this.slidesCount = 5;
    this.CODE_LEFT_ARROW = 'ArrowLeft';
    this.CODE_RiGHT_ARROW = 'ArrowRight';
    this.CODE_SPACE = 'Space';
    this.FA_PAUSE = '<i class="fas fa-pause"></i>';
    this.FA_PLAY = '<i class="fas fa-play"></i>';
    this.FA_PREV = '<i class="fas fa-backward"></i>';
    this.FA_NEXT = '<i class="fas fa-forward"></i>';
    
    this.curretSlide = 0;
    this.isPlaing = true;
    this.timerID = null;
    this.swipeStartX = null;
    this.swipeEndX = null;
  },
  
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
  this.slides = this.container.querySelectorAll('.slides');
  this.slides = this.container.querySelectorAll('.slides__item');
},
  
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
  },

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
  },

  _initListeners() {
    this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
    this.prevBtn.addEventListener('click', this.prev.bind(this));
    this.nextBtn.addEventListener('click', this.next.bind(this));
    this.indicatorsContainer.addEventListener('click', this._indicate.bind(this));
    this.pauseBtn.addEventListener('mouseenter', this._mousePause.bind(this));
    this.pauseBtn.addEventListener('mouseleave', this._mouseLeave.bind(this));
    document.addEventListener('keydown', this._pressKey.bind(this));
  },
  
  _gotoNth(n) {
    this.slides[this.curretSlide].classList.toggle('active');
    this.indicators[this.curretSlide].classList.toggle('active');
    this.curretSlide = (n + this.slidesCount) % this.slidesCount;
    this.slides[this.curretSlide].classList.toggle('active');
    this.indicators[this.curretSlide].classList.toggle('active');
  },

  _gotoPrev() {
    this._gotoNth(this.curretSlide - 1);
  },
  _gotoNext() {
    this._gotoNth(this.curretSlide + 1); 
  }, 

  _pause() {
    if (this.isPlaing) {
      clearInterval(this.timerID);
      this.isPlaing = false;
      this.pauseBtn.innerHTML = `${this.FA_PLAY}`;
    }
  },

  _play() {
    this.timerID = setInterval(() => this._gotoNext(), this.interval);
    this.isPlaing = true;
    this.pauseBtn.innerHTML = `${this.FA_PAUSE}`;
  },
  
  _indicate(e) {
    const target = e.target;
      if (target && target.classList.contains('indicators__item')) {
        this._pause();
        this._gotoNth(+target.dataset.slideTo);   
      }
  },

  _mousePause(ev) {
    const target = ev.target;
      if (target && target.classList.contains('control-pause')) {
        this._pause();
      }
  },

  _mouseLeave(ev) {
    const target = ev.target;
      if (target && target.classList.contains('control-pause')) {
        this._play();
      }
  },
  
  _pressKey(e) {
    if (e.code === this.CODE_LEFT_ARROW) this.prev();
    if (e.code === this.CODE_RiGHT_ARROW) this.next();
    if (e.code === this.CODE_SPACE) this.pausePlay();
  },

  pausePlay() {
    this.isPlaing ? this._pause() : this._play()
  },
  
  prev() {
    this._pause();
    this._gotoPrev();
  },
  
  next() {
    this._pause();
    this._gotoNext();
  },

  init() {
    this._initProps();
    this._initSlides();
    this._initControls();
    this._initIndicators();
    this._initListeners();
    this.timerID = setInterval(() => this._gotoNext(), this.interval);
  },
};

function SwipeCarousel() {
  createCarousel.apply(this, arguments);

};

SwipeCarousel.prototype = Object.create(createCarousel.prototype);
SwipeCarousel.prototype.constructor = SwipeCarousel;

SwipeCarousel.prototype._swipeStart = function (e) {
  this.swipeStartX = e.changedTouches[0].pageX;
};

SwipeCarousel.prototype._swipeEnd = function (e) {
  this.swipeEndX = e.changedTouches[0].pageX;
  if ((this.swipeStartX - this.swipeEndX) < -100) this.next();
  if ((this.swipeStartX - this.swipeEndX) > 100) this.prev();
};

SwipeCarousel.prototype._initListeners = function() {
  createCarousel.prototype._initListeners.apply(this);
  this.container.addEventListener('touchstart', this._swipeStart.bind(this));
  this.container.addEventListener('touchend', this._swipeEnd.bind(this));
};


