let editBtn = document.querySelector('.avatar__edit-icon');
let clsBtn = document.querySelector('.form-popup__close-btn');
let popUpForm = document.querySelector('.form-popup');
let popupBtn = document.querySelector('.form-popup__btn');

function addPopup() {
    popUpForm.style.display = 'flex'
    document.getElementById('first-name').value = document.querySelector('.avatar__head').textContent;;
    document.getElementById('job-name').value = document.querySelector('.avatar__subtitle').textContent;
};


function clsPopup() {
    popUpForm.style.display = 'none'
};


// Находим форму в DOM
let formElement = document.querySelector('.form-popup__form')

function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    let nameInput = document.getElementById('first-name').value;
    let jobInput = document.getElementById('job-name').value;

    nameAvatar = document.querySelector('.avatar__head');
    jobAvatar = document.querySelector('.avatar__subtitle');

    // Вставьте новые значения с помощью textContent
    nameAvatar.textContent = nameInput
    jobAvatar.textContent = jobInput
    clsPopup()
}

formElement.addEventListener('submit', formSubmitHandler);
editBtn.addEventListener('click', addPopup);
clsBtn.addEventListener('click', clsPopup);