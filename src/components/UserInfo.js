export class UserInfo {
    constructor(userNameInHeader, userInfoInHeader){
        this._userNameInHeader = userNameInHeader;
        this._userInfoInHeader = userInfoInHeader;
    }

    getUserInfo(){
        return{
            name: this._userNameInHeader.textContent,
            info: this._userInfoInHeader.textContent
        }

    }
    setUserInfo(profileName, profileTitle) {
        this._userNameInHeader.textContent = profileName;
        this._userInfoInHeader.textContent = profileTitle;

    }
}

