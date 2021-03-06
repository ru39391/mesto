export class FormValidator {
  constructor(settings, formEl) {
    this._formSelector = settings.formSelector,
    this._inputSelector = settings.inputSelector,
    this._submitBtnSelector = settings.submitBtnSelector,
    this._inactiveBtnClass = settings.inactiveBtnClass,
    this._inputErrorClass = settings.inputErrorClass,
    this._errorClass = settings.errorClass,
    this._formEl = formEl;
    this._btnEl = this._formEl.querySelector(this._submitBtnSelector);
    this._fieldsArr = Array.from(this._formEl.querySelectorAll(this._inputSelector));
  }

  _hasInvalidInput() {
    return this._fieldsArr.some(fieldsArrEl => !fieldsArrEl.validity.valid);
  };

  _showInputError(inputEl) {
    const errorEl = this._formEl.querySelector(`.${inputEl.name}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorEl.textContent = inputEl.validationMessage;
    errorEl.classList.add(this._errorClass);
  };

  _hideInputError(inputEl) {
    const errorEl = this._formEl.querySelector(`.${inputEl.name}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorEl.classList.remove(this._errorClass);
    errorEl.textContent = '';
  };

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  };

  _toggleBtnState() {
    if(this._hasInvalidInput()){
      this._btnEl.classList.add(this._inactiveBtnClass);
      this._btnEl.disabled = true;
    } else {
      this._btnEl.classList.remove(this._inactiveBtnClass);
      this._btnEl.disabled = false;
    }
  };

  _setEvtListeners() {
    this._formEl.addEventListener('submit', e => {
      e.preventDefault();
    });
    this._fieldsArr.forEach(fieldsArrEl => {
      fieldsArrEl.addEventListener('input', e => {
        this._checkInputValidity(e.target);
        this._toggleBtnState();
      });
    });
  }

  enableValidation() {
    this._setEvtListeners();
    this._toggleBtnState();
  };

  checkValidation() {
    this._fieldsArr.forEach(fieldsArrEl => {
      if(fieldsArrEl.value) {
        this._checkInputValidity(fieldsArrEl);
      } else {
        this._hideInputError(fieldsArrEl);
      };
    });
    this._toggleBtnState();
  };
}
