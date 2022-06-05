import {modalConfig} from '../utils/constants.js';
import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._modalPhoto = this._popup.querySelector(modalConfig.photoSelector);
    this._modalPhotoCaption = this._popup.querySelector(modalConfig.photoCaptionSelector);
  }

  open(data) {
    this._modalPhotoCaption.textContent = data.name;
    this._modalPhoto.src = data.link;
    this._modalPhoto.alt = data.name;
    super.open();
  }
}
