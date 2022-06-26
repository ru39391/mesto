import {btnConfig} from '../utils/constants.js';
import {formConfig} from '../utils/constants.js';
import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({renderer}, popupSelector) {
    super(popupSelector);
    this._renderer = renderer;
    this._formEl = this._popup.querySelector(formConfig.defaultSelector);
    this._fieldsArr = Array.from(this._popup.querySelectorAll(formConfig.inputSelector));
    this._btnCaptionEl = this._formEl.querySelector(btnConfig.captionSelector);
    this._btnPreloaderEl = this._formEl.querySelector(btnConfig.preloaderSelector);
  }

  _getInputValues() {
    const formData = {};
    this._fieldsArr.forEach(inputEl => {
      formData[inputEl.name] = inputEl.value;
    });
    return formData;
  }

  _submitForm(evt) {
    evt.preventDefault();
    this._renderer(this._getInputValues());
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._btnCaptionEl.style.display = 'none';
      this._btnPreloaderEl.style.display = 'block';
      this._btnPreloaderEl.textContent = btnConfig.preloaderCaption;
    } else {
      this._btnCaptionEl.style.display = 'block';
      this._btnPreloaderEl.style.display = 'none';
      this._btnPreloaderEl.textContent = '';
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._formEl.addEventListener('submit', e => {
      this._submitForm(e);
      this.renderLoading(true);
    });
  }

  close() {
    super.close();
    this._formEl.reset();
  }
}
