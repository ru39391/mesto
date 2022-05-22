import {modalTargetPhoto, modalPhoto, modalCaption, showModal} from './modals.js';

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _removeCard() {
    this._card.remove();
  }

  _revealPhoto() {
    modalPhoto.src = this._link;
    modalPhoto.alt = this._name;
    modalCaption.textContent = this._name;
    showModal(modalTargetPhoto);
  }

  _likeCard() {
    this._card.querySelector('.photo-wrap__like-button').classList.toggle('photo-wrap__like-button_active');
  }

  _setEventListeners() {
    this._card.querySelector('.photo-wrap__remove-button').addEventListener('click', () => {
      this._removeCard();
    });
    this._card.querySelector('.photo-wrap__photo-holder').addEventListener('click', () => {
      this._revealPhoto();
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
    return this._card;
  }
}
