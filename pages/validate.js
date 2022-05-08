const params = {
  formSelector: '.form',
  inputSelector: '.form__field',
  submitBtnSelector: '.form__button',
  inactiveBtnClass: 'form__button_disabled',
  inputErrorClass: 'form__field_type_error',
  errorClass: 'form__error_visible'
};

function showInputError(formEl, inputEl, errorMsg, settings) {
  const errorEl = formEl.querySelector(`.${inputEl.name}-error`);
  inputEl.classList.add(settings.inputErrorClass);
  errorEl.textContent = errorMsg;
  errorEl.classList.add(settings.errorClass);
};

function hideInputError(formEl, inputEl, settings) {
  const errorEl = formEl.querySelector(`.${inputEl.name}-error`);
  inputEl.classList.remove(settings.inputErrorClass);
  errorEl.classList.remove(settings.errorClass);
  errorEl.textContent = '';
};

function checkInputValidity(formEl, inputEl, settings) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, settings);
  } else {
    hideInputError(formEl, inputEl, settings);
  }
};

function hasInvalidInput(fieldsArr) {
  return fieldsArr.some(fieldsArrEl => !fieldsArrEl.validity.valid);
};

function toggleBtnState(fieldsArr, btnEl, settings) {
  if(hasInvalidInput(fieldsArr)){
    btnEl.classList.add(settings.inactiveBtnClass);
    btnEl.disabled = true;
  } else {
    btnEl.classList.remove(settings.inactiveBtnClass);
    btnEl.disabled = false;
  }
};

function setEvtListeners(formEl, settings) {
  const fieldsArr = Array.from(formEl.querySelectorAll(settings.inputSelector));
  const btnEl = formEl.querySelector(settings.submitBtnSelector);
  toggleBtnState(fieldsArr, btnEl, settings);
  fieldsArr.forEach(fieldsArrEl => {
    fieldsArrEl.addEventListener('input', () => {
      checkInputValidity(formEl, fieldsArrEl, settings);
      toggleBtnState(fieldsArr, btnEl, settings);
    });
  });
};

function enableValidation(settings) {
  const formsArr = Array.from(document.querySelectorAll(settings.formSelector));
  formsArr.forEach(formsArrEl => {
    formsArrEl.addEventListener('submit', e => {
      e.preventDefault();
    });
    setEvtListeners(formsArrEl, settings);
  });
};

enableValidation(params);
