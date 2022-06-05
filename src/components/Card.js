export class Card {
  constructor({data, revealPhoto}, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._revealPhoto = revealPhoto;
    this._cardSelector = cardSelector;
    this._cardPhotoHolder = null;
    this._cardPhoto = null;
    this._cardTitle = null;
    this._buttonLike = null;
    this._buttonRemove = null;
  }

  _removeCard() {
    this._card.remove();
    this._card = null;
  }

  _likeCard() {
    this._buttonLike.classList.toggle('photo-wrap__like-button_active');
  }

  _setEventListeners() {
    this._buttonRemove.addEventListener('click', () => {
      this._removeCard();
    });
    this._cardPhotoHolder.addEventListener('click', () => {
      this._revealPhoto({
        name: this._name,
        link: this._link
      });
    });
    this._buttonLike.addEventListener('click', () => {
      this._likeCard();
    });
  }

  createCard() {
    this._card = document.querySelector(this._cardSelector).content.querySelector('.photo-wrap').cloneNode(true);
    this._cardPhotoHolder = this._card.querySelector('.photo-wrap__photo-holder');
    this._buttonRemove = this._card.querySelector('.photo-wrap__remove-button');
    this._buttonLike = this._card.querySelector('.photo-wrap__like-button');
    this._cardPhoto = this._card.querySelector('.photo-wrap__picture');
    this._cardTitle = this._card.querySelector('.photo-wrap__title');
    this._cardTitle.textContent = this._name;
    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = this._name;
    this._setEventListeners();
    return this._card;
  }
}
