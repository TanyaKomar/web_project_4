import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._form = this._popup.querySelector(".popup__form");
        this._inputList = this._popup.querySelectorAll(".popup__input");
        this._handleFormSubmit = (evt) => {
            evt.preventDefault();
            const formInputs = this._getInputValues();
            handleFormSubmit(formInputs);
            this.close();
        };
    }

    _getInputValues() {
        const inputValue = {};
        this._inputList.forEach((input) => {
            inputValue[input.name] = input.value
        })
        return inputValue;
    }

    setEventListeners = () => {
        this._form.addEventListener("submit", this._handleFormSubmit);
        super.setEventListeners();
    }

    close() {
        super.close();
        this._form.reset();
    }
}