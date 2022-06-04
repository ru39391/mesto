import {modalConfig} from '../utils/constants.js';
import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(data, popupSelector) {
    super(popupSelector);
    this._name = data.name;
    this._link = data.link;
  }

  open() {
    this._popup.querySelector(modalConfig.photoCaptionSelector).textContent = this._name;
    this._popup.querySelector(modalConfig.photoSelector).src = this._link;
    this._popup.querySelector(modalConfig.photoSelector).alt = this._name;
    super.open();
  }
}
