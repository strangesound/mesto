class FormValidator {

    constructor(text, image) {
        this._text = text;
        this._image = image;
    }

    _showInputError = (formElement, inputElement, errorMessage, config) => {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(config.errorElementActive);
    };

    _hideInputError = (formElement, inputElement, config) => {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        errorElement.classList.remove(config.errorElementActive);
        errorElement.textContent = '';
    };

    _checkInputValidity = (formElement, inputElement, config) => {
        if (!inputElement.validity.valid) {
            showInputError(formElement, inputElement, inputElement.validationMessage, config);
        } else {
            hideInputError(formElement, inputElement, config);
        }
    };

    _setEventListeners = (formElement, config) => {
        const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
        const buttonElement = formElement.querySelector(config.submitButtonSelector);
        toggleButtonState(inputList, buttonElement, config);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', function () {

                checkInputValidity(formElement, inputElement, config);
                toggleButtonState(inputList, buttonElement, config);

            });
        });
    };


    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };


    _toggleButtonState = (inputList, buttonElement, config) => {
        if (hasInvalidInput(inputList)) {
            buttonElement.classList.remove(config.activeButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.add(config.activeButtonClass);
            buttonElement.disabled = false;
        }
    };

    _enableValidation = (config, form) => {
        const formElement = document.querySelector(form)
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement, config)
    };

    _deactivateSubmitButton = (button) => {
        button.classList.remove('form-popup__btn-active')
        button.disabled = true;
    }

}



const config = {
    formSelector: {
        formNameEditSelector: '.form-popup__form-edit',
        formCardAddSelector: '.form-popup__form-add-card'
    },
    inputSelector: '.form-popup__contact-info',
    submitButtonSelector: '.form-popup__btn',
    activeButtonClass: 'form-popup__btn-active',
    inputErrorClass: 'error',
    errorElementActive: 'error-class'
};


enableValidation(config, config.formSelector.formNameEditSelector);
enableValidation(config, config.formSelector.formCardAddSelector);