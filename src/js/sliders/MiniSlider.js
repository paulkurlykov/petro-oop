import Slider from "./SliderProto";

export default class MiniSlider extends Slider {
    _int;
    constructor(sel) {
        super(sel);
        this.leftBtns = document.querySelectorAll(sel.btnLeftSelector);
        this.rightBtns = document.querySelectorAll(sel.btnRightSelector);
        this._direction = sel.dir;
        this.activeClass = sel.activeClass;
        this.autoplay = sel.autoplay;
        this.btnsHandler();
        this.sliderAutoPlay();
        this.slidesHoverHandler();
    }

    moveSlide(slideIndex) {
        this.slides.forEach((item, index) => {
            item.setAttribute("data-index", `${index - slideIndex}`);
            item.dataset.index === "0" ? item.classList.add(this.activeClass) : item.classList.remove(this.activeClass);
            let k = item.classList.contains(this.activeClass) ? 1 : 0.85;
            item.style.transform = `translateX(${100 * (index - slideIndex)}%) scale(${k})`;
        });
    }

    sliderAutoPlay() {
        console.log(this.autoplay);
        if (!this.autoplay) return;
        this._int = setInterval(this.moveRight, 5000);
    }

    stopInterval(sec) {
        console.log("clearing interval");
        clearInterval(this._int);
        setTimeout(() => {
            clearInterval(this._int);
            this.sliderAutoPlay();
        }, sec * 1000);
    }

    btnsHandler() {
        this.leftBtns.forEach((btn) =>
            btn.addEventListener("click", () => {
                this.moveLeft();
                this.stopInterval(10);
            })
        );
        this.rightBtns.forEach((btn) =>
            btn.addEventListener("click", () => {
                this.moveRight();
                this.stopInterval(10);
            })
        );
    }

    slidesHoverHandler() {
        this.slides.forEach((slide) => {
            slide.addEventListener("mouseover", () => {
                this.stopInterval(5);
            });
        });
    }
}
