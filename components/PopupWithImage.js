import {modalConfig} from '../utils/constants.js';
import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor({name, link}, popupSelector) {
    super(popupSelector);
    this._name = name;
    this._link = link;
  }

  open() {
    this._popup.querySelector(modalConfig.photoCaptionSelector).textContent = this._name;
    this._popup.querySelector(modalConfig.photoSelector).src = this._link;
    this._popup.querySelector(modalConfig.photoSelector).alt = this._name;
    super.open();
  }
}
