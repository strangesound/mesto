export class FormValidator {

    constructor(config, selector) {
        this._formSelector = selector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._activeButtonClass = config.activeButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorElementActive = config.errorElementActive;
        this._formElement = document.querySelector(this._formSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(config.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    }

    _showInputError = (_inputElement) => {
        const errorElement = this._formElement.querySelector(`#${_inputElement.id}-error`);
        errorElement.textContent = _inputElement.validationMessage;
        errorElement.classList.add(this._errorElementActive);
    };

    _hideInputError = (_inputElement) => {
        const errorElement = this._formElement.querySelector(`#${_inputElement.id}-error`);
        errorElement.classList.remove(this._errorElementActive);
        errorElement.textContent = '';
    };

    _checkInputValidity = (_inputElement) => {
        if (!_inputElement.validity.valid) {
            this._showInputError(_inputElement);
        } else {
            this._hideInputError(_inputElement);
        }
    };

    _setEventListeners = () => {
        this._toggleButtonState();
        this._inputList.forEach((_inputElement) => {
            _inputElement.addEventListener('input', () => {
                this._checkInputValidity(_inputElement);
                this._toggleButtonState(_inputElement);

            });
        });
    };

    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    _toggleButtonState = () => {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.remove(this._activeButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.add(this._activeButtonClass);
            this._buttonElement.disabled = false;
        }
    };

    enableValidation = () => {
        this._formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        this._setEventListeners()
    };

    deactivateSubmitButton = () => {
        this._buttonElement.classList.remove('form-popup__btn-active')
        this._buttonElement.disabled = true;
    }

}






