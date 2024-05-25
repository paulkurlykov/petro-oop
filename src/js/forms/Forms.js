import { addSpinner } from "./spinner";
import requests from "../Request";
import { POST_URL } from "../config";

export default class ForminputsHandler {
    constructor(form) {
        this.forms = document.querySelectorAll(form);
        this.data = {};
        this.message = {
            ok: `Благодарим вас за оставленную заявку, скот.`,
            error: `Что-то пошло не так, данные не были отправлены. Попробуйте еще раз.`,
        };
        this.init();
    }

    init() {
        this.getDataFromInputs(this.forms, this.data);
        this.formInputsHandler();
        this.formSubmitHandler();
    }

    _onlyEnglishSymbols(e) {
        // функция-валидатор, которая не дает вводить символы, которые не разрешены
        let input = e.target;
        input.value = input.value.replace(/[а-я]/gi, "");
    }

    formInputsHandler() {
        // вешает на инпуты хендлер, который слушает ввод, и выполняет функцию-валидатор
        this.forms.forEach((form) => {
            form.querySelectorAll("input").forEach((input) => {
                if (input.name !== "phone") input.addEventListener("input", this._onlyEnglishSymbols);
            });
        });
    }

    _setError(elem, msg = "is not correct") {
        // принимает пустой инпут, и добавляет ему или его соседу класс error.
        console.log(`Input ${elem.name} is empty. Please fill it completely`);
        elem.classList.add("error");
    }

    _resetError(elem) {
        // снимает класс error инпуту или его соседу
        elem.classList.remove("error");
    }

    _renderSpinner(parentEl) {
        parentEl.innerHTML = "";
        addSpinner(parentEl);
    }

    _renderUpdateMessage(parentEl, msg, err = undefined) {
        parentEl.innerHTML = "";
        const markup = `<div class="message">
        <img src="public/img/${!err ? "ok.png" : "error.png"}" alt="#" class="message__icon">
        <p class="message__text">${msg}</p>
      </div>`;
        parentEl.insertAdjacentHTML("beforeend", markup);
    }

    _hasEmptyFields(inputs) {
        // проверка на пустой инпут, возвращает true или false
        let res = true;
        inputs.forEach((input) => {
            if (input.value === "") {
                this._setError(input, "Поле не должно быть пустым");
                res = false;
                return;
            }

            this._resetError(input);
        });

        return res;
    }

    formSubmitHandler() {
        this.forms.forEach((form) => {
            form.addEventListener("submit", async (e) => {
                try {
                    e.preventDefault();
                    if (!this._hasEmptyFields(form.querySelectorAll("input"))) return;
                    this._renderSpinner(form);
                    const data = await requests.fetchData(POST_URL, form, this.data);
                    this._renderUpdateMessage(form, this.message.ok);
                } catch (e) {
                    console.error(e);
                    this._renderUpdateMessage(form, this.message.error, "error");
                }
            });
        });
    }

    getDataFromInputs(forms, data) {
        forms.forEach((form) => {
            // перебираем все типы инпутов в форме
            form.querySelectorAll("input, select").forEach((input) => {
                // для селекта изначально забираем данные на случай, если инпут не будут трогать
                input.tagName === "SELECT" ? (data.city = input.value) : "";
                input.addEventListener("change", (e) => {
                    // для каждого инпута берем атрибут name, и его значение сетим как название свойства объекту данных
                    data[e.target.name] = e.target.value;
                });
            });
        });
    }
}
