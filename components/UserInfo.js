// Создайте класс UserInfo
// Класс UserInfo отвечает за управление отображением информации о пользователе на странице. Этот класс:
// Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
// Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
// Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.


// Slack
// Обратите внимание, класс UserInfo не должен взаимодействовать с формой. Он будет отвечать только за отображение данных пользователя в шапке
// метод getUserInfo возвращает текущие значения из разметки. то есть textContent свойство двух элементов в виде объекта
// метод setUserInfo - получает объект с ключами и устанавливает их в разметку


export class UserInfo {
    constructor(userNameInHeader, userInfoInHeader){
        this.userNameInHeader = userNameInHeader;
        this._userInfoInHeader = userInfoInHeader;
    }

    getUserInfo(){
        return{
            name: this._userNameInHeader.textcontent,
            info: this._userInfoInHeader.textcontent
        }
        // Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.


    }
    setUserInfo(profileName, profileTitle) {
        this._userNameInHeader.textcontent = profileName;
        this._userInfoInHeader.textcontent = profileTitle;
        // Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.


    }
}

