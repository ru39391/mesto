export class Card {
  constructor({data, revealPhoto}, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._revealPhoto = revealPhoto;
    this._cardSelector = cardSelector;
    this._buttonLike = null;
  }

  _removeCard() {
    this._card.remove();
    this._card = null;
  }

  _likeCard() {
    this._buttonLike.classList.toggle('photo-wrap__like-button_active');
  }

  _setEventListeners() {
    this._card.querySelector('.photo-wrap__remove-button').addEventListener('click', () => {
      this._removeCard();
    });
    this._card.querySelector('.photo-wrap__photo-holder').addEventListener('click', () => {
      this._revealPhoto({
        name: this._name,
        link: this._link
      });
    });
    this._card.querySelector('.photo-wrap__like-button').addEventListener('click', () => {
      this._likeCard();
    });
  }

  createCard() {
    this._card = document.querySelector(this._cardSelector).content.querySelector('.photo-wrap').cloneNode(true);
    this._setEventListeners();
    this._card.querySelector('.photo-wrap__title').textContent = this._name;
    this._card.querySelector('.photo-wrap__picture').src = this._link;
    this._card.querySelector('.photo-wrap__picture').alt = this._name;
    this._buttonLike = this._card.querySelector('.photo-wrap__like-button');
    return this._card;
  }
}
