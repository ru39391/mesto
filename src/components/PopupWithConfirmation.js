import {formConfig} from '../utils/constants.js';
import {Popup} from './Popup.js';

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formEl = this._popup.querySelector(formConfig.defaultSelector);
  }

  submitForm(handler) {
    this._handleSubmit = handler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formEl.addEventListener('submit', e => {
      e.preventDefault();
      this._handleSubmit();
    });
  }
}
