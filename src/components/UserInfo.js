export class UserInfo {
  constructor({userTitleSelector, userSubtitleSelector, userAvatarSelector}) {
    this._userTitle = document.querySelector(userTitleSelector);
    this._userSubtitle = document.querySelector(userSubtitleSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._userTitle.textContent,
      about: this._userSubtitle.textContent,
      avatar: this._userAvatar.src
    };
    return userInfo;
  }

  setUserInfo(name, about) {
    this._userTitle.textContent = name;
    this._userSubtitle.textContent = about;
  }

  setUserPic(link) {
    this._userAvatar.src = link;
  }
}
