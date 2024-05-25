export default class Downloader {
    constructor() {
        this.parents = document.querySelectorAll(".module__info-book");
        this.makeLink();
    }

    makeLink() {
        this.parents.forEach((parent) => {
            const link = document.createElement("a");
            link.classList.add("download__link");
            link.setAttribute("download", "bill.pdf");
            link.href = "../public/files/bill.pdf";
            link.style.height = "100%";
            parent.append(link);
            const btn = link.previousElementSibling;
            link.insertAdjacentElement("beforeend", btn);
        });
    }
}
