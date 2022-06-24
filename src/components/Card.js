export class Card {
  constructor({data, currentOwner, revealPhoto, revealConfirmation}, cardSelector) {
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes.length;
    this._owner = data.owner._id;
    this._currentOwner = currentOwner;
    this._revealPhoto = revealPhoto;
    this._revealConfirmation = revealConfirmation;
    this._cardSelector = cardSelector;
    this._cardPhotoHolder = null;
    this._cardPhoto = null;
    this._cardTitle = null;
    this._cardLikes = null;
    this._buttonLike = null;
    this._buttonRemove = null;
  }

  _removeEl(item) {
    item.remove();
    item = null;
  }

  _likeCard() {
    this._buttonLike.classList.toggle('photo-wrap__like-button_active');
  }

  _setEventListeners() {
    this._cardPhotoHolder.addEventListener('click', () => {
      this._revealPhoto({
        name: this._name,
        link: this._link
      });
    });
    this._buttonLike.addEventListener('click', () => {
      this._likeCard();
    });
    if(this._owner == this._currentOwner) {
      this._buttonRemove.addEventListener('click', () => {
        this._revealConfirmation({
          id: this._id,
          card: this._card
        });
      });
    }
  }

  createCard() {
    this._card = document.querySelector(this._cardSelector).content.querySelector('.photo-wrap').cloneNode(true);
    this._cardPhotoHolder = this._card.querySelector('.photo-wrap__photo-holder');
    this._buttonLike = this._card.querySelector('.photo-wrap__like-button');
    this._cardLikes = this._card.querySelector('.photo-wrap__likes-counter');
    this._cardPhoto = this._card.querySelector('.photo-wrap__picture');
    this._cardTitle = this._card.querySelector('.photo-wrap__title');
    this._cardTitle.textContent = this._name;
    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = this._name;
    this._cardLikes.textContent = this._likes;
    if(this._owner == this._currentOwner) {
      this._buttonRemove = this._card.querySelector('.photo-wrap__remove-button');
    }
    if(!this._buttonRemove) {
      this._removeEl(this._card.querySelector('.photo-wrap__remove-button'));
    }
    this._setEventListeners();
    return this._card;
  }
}
