import "./src/css/style.css";
import "./src/css/animate.css";
import "./src/css/font.css";

import VideoPlayer from "./src/js/VideoPlayer";
import MainSlider from "./src/js/sliders/MainSlider";
import MiniSlider from "./src/js/sliders/MiniSlider";
import ReviewSlider from "./src/js/sliders/ReviewSlider";
import DiffMenu from "./src/js/DiffMenu";
import FormValidation from "./src/js/forms/Forms";
import PhoneMask from "./src/js/forms/PhoneMask";

window.addEventListener("DOMContentLoaded", () => {
    const pagesSlider = new MainSlider({ slidesContainerSelector: ".page", nextBtnSelector: "a[class='next']" });
    const firstPageSlider = new MiniSlider({
        slidesContainerSelector: ".showup__content-slider",
        btnLeftSelector: ".showup__prev",
        btnRightSelector: ".showup__next",
        activeClass: "card-active",
        autoplay: true,
    });
    const thirdPageSlider = new MiniSlider({
        slidesContainerSelector: ".modules__content-slider",
        btnLeftSelector: ".slick-prev",
        btnRightSelector: ".slick-next",
        activeClass: "card-active",
        autoplay: true,
    });
    const fifthPageSlider = new ReviewSlider({
        slidesContainerSelector: ".feed__slider",
        btnLeftSelector: ".slick-prev",
        btnRightSelector: ".slick-next",
        activeClass: "feed__item-active",
    });
    const firstPageVideo = new VideoPlayer(".showup__video", ".overlay", ".close");

    const diffMenu = new DiffMenu({
        columnOld: ".officerold",
        columnNew: ".officernew",
        item: ".officer__card-item",
        clickTrigger: ".card__click",
    });
    const formValidation = new FormValidation("form");
    const phoneMask = new PhoneMask('input[name="phone"]');
});
