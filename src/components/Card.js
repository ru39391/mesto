export class Card {
  constructor({data, currentOwner, revealPhoto, revealRemoveConfirmation, setLikes}, cardSelector) {
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._owner = data.owner._id;
    this._likes = data.likes;
    this._isLiked = false;
    this._currentOwner = currentOwner;
    this._revealPhoto = revealPhoto;
    this._revealRemoveConfirmation = revealRemoveConfirmation;
    this._setLikes = setLikes;
    this._cardSelector = cardSelector;
    this._cardPhotoHolder = null;
    this._cardPhoto = null;
    this._cardTitle = null;
    this._cardLikes = null;
    this._buttonLike = null;
    this._buttonRemove = null;
  }

  _removeEl(el) {
    el.remove();
    el = null;
  }

  _setLikeActiveClass(arr) {
    const usersLikes = [];
    arr.forEach(arrEl => {
      usersLikes.push(arrEl._id);
    });
    if(usersLikes.indexOf(this._currentOwner) != -1) {
      this._isLiked = true;
      this._buttonLike.classList.add('photo-wrap__like-button_active');
    } else {
      this._isLiked = false;
      this._buttonLike.classList.remove('photo-wrap__like-button_active');
    }
  }

  _refreshLikesCounter(counter) {
    this._cardLikes.textContent = counter;
  }

  _setEventListeners() {
    this._cardPhotoHolder.addEventListener('click', () => {
      this._revealPhoto({
        name: this._name,
        link: this._link
      });
    });
    this._buttonLike.addEventListener('click', () => {
      this._setLikes({
        id: this._id,
        isLiked: this._isLiked
      });
    });
    if(this._owner == this._currentOwner) {
      this._buttonRemove.addEventListener('click', () => {
        this._revealRemoveConfirmation({
          id: this._id
        });
      });
    }
  }

  setCardLikes(arr) {
    this._setLikeActiveClass(arr);
    this._refreshLikesCounter(arr.length);
  }

  removeCardEl() {
    this._removeEl(this._card);
  }

  createCardEl() {
    this._card = document.querySelector(this._cardSelector).content.querySelector('.photo-wrap').cloneNode(true);
    this._cardPhotoHolder = this._card.querySelector('.photo-wrap__photo-holder');
    this._buttonLike = this._card.querySelector('.photo-wrap__like-button');
    this._cardLikes = this._card.querySelector('.photo-wrap__likes-counter');
    this._cardPhoto = this._card.querySelector('.photo-wrap__picture');
    this._cardTitle = this._card.querySelector('.photo-wrap__title');
    this._cardTitle.textContent = this._name;
    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = this._name;
    if(this._owner == this._currentOwner) {
      this._buttonRemove = this._card.querySelector('.photo-wrap__remove-button');
    }
    if(!this._buttonRemove) {
      this._removeEl(this._card.querySelector('.photo-wrap__remove-button'));
    }
    this.setCardLikes(this._likes);
    this._setEventListeners();
    return this._card;
  }
}
