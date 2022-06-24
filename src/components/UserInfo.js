export class UserInfo {
  constructor({userTitleSelector, userSubtitleSelector}) {
    this._userTitle = document.querySelector(userTitleSelector);
    this._userSubtitle = document.querySelector(userSubtitleSelector);
  }

  getUserInfo() {
    const userData = {
      name: this._userTitle.textContent,
      about: this._userSubtitle.textContent,
    };
    return userData;
  }

  setUserInfo(name, about) {
    this._userTitle.textContent = name;
    this._userSubtitle.textContent = about;
  }
}
