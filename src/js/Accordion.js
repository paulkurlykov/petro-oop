export default class Accordeon {
    constructor() {
        this.container = document.querySelectorAll(".module__info-show");
        this.handler();
    }

    handler() {
        this.container.forEach((accord) => {
            accord.addEventListener("click", (e) => {
                const plus = e.target.closest(".plus__content");
                if (!plus) return;
                const description = accord.nextElementSibling;
                accord.classList.toggle("opened");
                if (accord.classList.contains("opened")) {
                    description.style.maxHeight = "200px";
                } else {
                    description.style.maxHeight = "0px";
                }
            });
        });
    }
}
