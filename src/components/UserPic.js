export class UserPic {
  constructor(userAvatarSelector) {
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserPic() {
    return this._userAvatar.src;
  }

  setUserPic(avatar) {
    this._userAvatar.src = avatar;
  }
}
