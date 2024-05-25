export default class Slider {
    _curSlide = 0;
    _curMove = "unset";
    constructor(sel) {
        this.slideContainer = document.querySelector(sel.slidesContainerSelector);
        this.slides = Array.from(this.slideContainer.children).filter((el) => el.tagName !== "BUTTON");
        this.moveSlide(0);
    }

    makeAnimated() {
        let animationSelector = this.direction ? "slideInLeft" : "slideInUp";
        this.slides.forEach((slide) => slide.classList.add("animated", `${animationSelector}`));
    }

    moveSlide(slideIndex) {
        this.slides.forEach((slide) => (slide.style.display = "none"));
        this.slides[slideIndex].style.display = "block";
    }

    moveLeft = () => {
        this._curSlide === 0 ? (this._curSlide = this.slides.length - 1) : this._curSlide--;
        this._curMove = 0;
        this.moveSlide(this._curSlide);
    };

    moveRight = () => {
        this._curSlide === this.slides.length - 1 ? (this._curSlide = 0) : this._curSlide++;
        this._curMove = 1;
        this.moveSlide(this._curSlide);
    };
}
