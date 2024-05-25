export default class DiffMenu {
    constructor({ columnOld, columnNew, item, clickTrigger }) {
        this.columnOld = document.querySelector(columnOld);
        this.columnNew = document.querySelector(columnNew);
        this.cardsClass = item;
        this.triggerClass = clickTrigger;
        this.init();
    }

    init() {
        this.clickHandler();
        this.hideCards();
    }

    makeAnimated(elem) {
        elem.classList.add("animated", "zoomInUp");
    }

    hideCards() {
        [this.columnOld, this.columnNew].forEach((column) => {
            const trigger = column.querySelector(this.triggerClass);
            column.querySelectorAll("*").forEach((el) => this.makeAnimated(el));
            Array.from(column.children)
                .filter((card) => card.matches(this.cardsClass) && !card.contains(trigger))
                .forEach((card) => (card.style.display = "none"));
        });
    }

    clickHandler() {
        [this.columnOld, this.columnNew].forEach((column) => {
            column.addEventListener("click", (e) => {
                const elem = e.target.closest(this.triggerClass);
                if (!elem) return;
                const notActiveCards = Array.from(column.children).filter((card) => card.style.display === "none");
                notActiveCards[0].style.display = "flex";
                notActiveCards.length === 1 ? (column.lastElementChild.style.display = "none") : "";
            });
        });
    }
}
