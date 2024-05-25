import Slider from "./SliderProto";

export default class ReviewSlider extends Slider {
    constructor(sel) {
        super(sel);
        this.leftBtns = document.querySelectorAll(sel.btnLeftSelector);
        this.rightBtns = document.querySelectorAll(sel.btnRightSelector);
        this.activeClass = sel.activeClass;
        this.btnsHandler();
        this.setActiveClass();
    }

    setActiveClass() {
        const slides = Array.from(this.slideContainer.children).filter((el) => el.tagName !== "BUTTON");
        slides.forEach((slide) => slide.classList.remove(this.activeClass));
        slides[0].classList.add(this.activeClass);
    }

    moveSlide() {
        if (this._curMove == 1) {
            this.slideContainer.append(this.slideContainer.querySelectorAll(".feed__item")[0]);
        } else if (this._curMove == 0) {
            console.log(this.slides.length);
            this.slideContainer.prepend(this.slideContainer.querySelectorAll(".feed__item")[this.slides.length - 1]);
        }
        this.setActiveClass();
    }

    btnsHandler() {
        this.leftBtns.forEach((btn) => btn.addEventListener("click", this.moveLeft));
        this.rightBtns.forEach((btn) => btn.addEventListener("click", this.moveRight));
    }
}
