import { Popup } from '../components/Popup.js'

export class PopupWithForm extends Popup {
    constructor(popupWrapper, submitFormHandler) {
        super(popupWrapper)
        this._popupWrapper = popupWrapper;
        this._submitFormHandler = submitFormHandler;
        this._inputList = Array.from(this._popupWrapper.querySelectorAll('.form-popup__contact-info'));
        this._form = this._popupWrapper.querySelector('.form-popup__form');
    }

    _getInputValues() {
        this._formValues = {}
        this._inputList.array.forEach(element => {
            this._formValues[element] = input.value
        });
        return this._formValues
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitFormHandler();
            this.closePopup();
        });

    }

    closePopup() {
        super.closePopup();
        this._form.reset();
    }
}
