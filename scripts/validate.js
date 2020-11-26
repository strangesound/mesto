const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    //inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorElementActive);
};

const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    //inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorElementActive);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, config) => {
    console.log(inputElement)
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
        hideInputError(formElement, inputElement, config);
    }
};

const setEventListeners = (formElement, config) => {
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


const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};


const toggleButtonState = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.remove(config.activeButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.add(config.activeButtonClass);
        buttonElement.disabled = false;
    }
};

const enableValidation = (config) => {
    const formElement = document.querySelector(config.formSelector)
    formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
    });
    setEventListeners(formElement, config)
};


const configNameEdit = {
    formSelector: '.form-popup__form-edit',
    inputSelector: '.form-popup__contact-info',
    submitButtonSelector: '.form-popup__btn',
    activeButtonClass: 'form-popup__btn-active',
    inputErrorClass: 'error',
    errorElementActive: 'error-class'
};

const configCardAdd = {
    formSelector: '.form-popup__form-add-card',
    inputSelector: '.form-popup__contact-info',
    submitButtonSelector: '.form-popup__btn',
    activeButtonClass: 'form-popup__btn-active',
    inputErrorClass: 'error',
    errorElementActive: 'error-class'
};


enableValidation(configNameEdit);
enableValidation(configCardAdd);

