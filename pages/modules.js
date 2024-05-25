import "../src/css/style.css";
import "../src/css/animate.css";
import "../src/css/font.css";
import fetchYT from "./youTubeAPI";

import MainSlider from "../src/js/sliders/MainSlider";
import VideoPlayer from "../src/js/VideoPlayer";
import Accordeon from "../src/js/Accordion";
import Downloader from "../src/js/Downloader";

window.addEventListener("DOMContentLoaded", () => {
    const modulesSlider = new MainSlider({
        slidesContainerSelector: ".moduleapp",
        prevBtnSelector: ".prev",
        nextBtnSelector: "div[class='next']",
        direction: "horizontal",
    });

    const modulePageVideo = new VideoPlayer(".module__video", ".overlay", ".close");

    const accordeon = new Accordeon();

    const downloader = new Downloader();
});
