import {formConfig} from '../utils/constants.js';
import {Popup} from './Popup.js';

export class PopupWithConfirmation extends Popup {
  constructor({renderer}, popupSelector) {
    super(popupSelector);
    this._renderer = renderer;
    this._formEl = this._popup.querySelector(formConfig.defaultSelector);
  }

  _submitForm(evt, values) {
    evt.preventDefault();
    this._renderer(values);
  }

  open(data) {
    this._formEl.addEventListener('submit', e => {
      this._submitForm(e, data);
    });
    super.open();
  }
}
