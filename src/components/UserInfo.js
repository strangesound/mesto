export class UserInfo {
  constructor(userNameInHeader, userInfoInHeader, avatar) {
    this._userNameInHeader = userNameInHeader;
    this._userInfoInHeader = userInfoInHeader;
    this._avatar = avatar;
    
  }

  getUserInfo() {
    return {
      name: this._userNameInHeader.textContent,
      info: this._userInfoInHeader.textContent
    }

  }
  setUserInfo(profileName, profileTitle, avatar) {
    this._userNameInHeader.textContent = profileName;
    this._userInfoInHeader.textContent = profileTitle;
    this._avatar.src = avatar;

  }

  setAvatarImage(avatarURL) {
    this._avatar.src = avatarURL;

  }



}

