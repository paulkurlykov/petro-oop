export default class PhoneMask {
    constructor(input) {
        this.inputs = document.querySelectorAll(input);
        this.inputHandler();
    }

    getInputNumbersFormValue(input) {
        return input.value.replace(/\D/g, "");
    }

    onPhoneInput(e) {
        const input = e.target;
        let inputNumbersValue = this.getInputNumbersFormValue(input); // здесь возвращаем только цифры от input.value
        let formattedInputValue = ""; // здесь будут финишные данные, которые передаются в input.value
        let selectionStart = input.selectionStart;
        if (!inputNumbersValue) return (input.value = ""); // если цифры мы не вводим, то показываем пустой инпут. Так, если вводим что-то кроме цифр, это не будет отображаться
        if (input.value.length !== selectionStart) {
            if (e.data && /\D/g.test(e.data)) input.value = inputNumbersValue;
            return;
        }

        if (inputNumbersValue[0] == "1") {
            let firstSymbol = inputNumbersValue[0] === "1" ? "+1" : "";
            formattedInputValue = firstSymbol + " ";
            if (inputNumbersValue.length > 1) formattedInputValue += `(${inputNumbersValue.slice(1, 4)}`;
            if (inputNumbersValue.length >= 5) formattedInputValue += `) ${inputNumbersValue.slice(4, 7)}`;
            if (inputNumbersValue.length >= 8) formattedInputValue += `-${inputNumbersValue.slice(7, 9)}`;
            if (inputNumbersValue.length >= 10) formattedInputValue += `-${inputNumbersValue.slice(9, 11)}`; // Ставим последний дефис
        }

        input.value = formattedInputValue; // вставляем финальные данные
    }

    inputHandler() {
        this.inputs.forEach((input) => input.addEventListener("input", this.onPhoneInput.bind(this)));
    }
}
