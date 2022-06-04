export class UserInfo {
  constructor({userTitleSelector, userSubtitleSelector}) {
    this._userTitle = document.querySelector(userTitleSelector);
    this._userSubtitle = document.querySelector(userSubtitleSelector);
  }

  getUserInfo() {
    const userData = {
      title: this._userTitle.textContent,
      subtitle: this._userSubtitle.textContent,
    };
    return userData;
  }

  setUserInfo(title, subtitle) {
    this._userTitle.textContent = title;
    this._userSubtitle.textContent = subtitle;
  }
}
