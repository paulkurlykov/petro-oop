import Slider from "./SliderProto";

export default class MainSlider extends Slider {
    _firstSlideLinks = document.querySelectorAll(".sidecontrol a:not(.next)");
    _visitCard = document.querySelector(".hanson");
    constructor(sel) {
        super(sel);
        this.nextBtns = document.querySelectorAll(sel.nextBtnSelector);
        this.prevBtns = document.querySelectorAll(sel.prevBtnSelector);
        this.direction = sel.direction;
        this.moveToFirstSlide();
        this.btnsHandler();
        this.makeAnimated();
    }

    moveSlide(slideIndex) {
        console.log(this.direction);
        super.moveSlide(slideIndex);
        this.showVisitCard(slideIndex);
    }

    moveToFirstSlide() {
        this._firstSlideLinks.forEach((link) => {
            link.addEventListener("click", () => {
                this._curSlide = 0;
                this.moveSlide(0);
            });
        });
    }

    showVisitCard(slideIndex) {
        const elem = this._visitCard;
        if (!elem) return;
        elem.style.display = "none";
        if (slideIndex === 2) {
            elem.classList.add("animated");
            elem.classList.add("scale-up-ver-bottom");
            setTimeout(function () {
                elem.style.display = "block";
            }, 3000);
        }
    }

    btnsHandler() {
        this.nextBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                this.moveRight();
            });
        });

        this.prevBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                this.moveLeft();
            });
        });
    }
}
