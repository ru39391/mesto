import {formConfig} from '../utils/constants.js';
import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({renderer}, popupSelector) {
    super(popupSelector);
    this._renderer = renderer;
  }

  _getInputValues() {
    const formData = {};
    this._popup.querySelectorAll(formConfig.inputSelector).forEach(inputEl => {
      formData[inputEl.name] = inputEl.value;
    });
    return formData;
  }

  _submitForm(evt) {
    evt.preventDefault();
    this._renderer(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector(formConfig.defaultSelector).addEventListener('submit', e => {
      this._submitForm(e);
    });
  }

  close() {
    super.close();
    this._popup.querySelector(formConfig.defaultSelector).reset();
  }
}
