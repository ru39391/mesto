import {modalConfig} from '../utils/constants.js';

export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(e) {
    if(e.key == 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', e => {
      if (e.target.classList.contains(modalConfig.closeBtnClass) || e.target.classList.contains(modalConfig.defaultClass)) {
        this.close();
      }
    });
  }

  open() {
    this._popup.classList.add(modalConfig.visibleClass);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove(modalConfig.visibleClass);
    document.removeEventListener('keydown', this._handleEscClose);
  }
}
