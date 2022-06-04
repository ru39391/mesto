import {modalConfig} from '../utils/constants.js';

export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose(evt) {
    if(evt.key == 'Escape') {
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
    document.addEventListener('keydown', e => {
      this._handleEscClose(e);
    });
  }

  close() {
    this._popup.classList.remove(modalConfig.visibleClass);
    document.removeEventListener('keydown', e => {
      this._handleEscClose(e);
    });
  }
}
