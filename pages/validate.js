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

export function checkFormValidity(modal, settings) {
  const form = modal.querySelector(settings.formSelector);
  const btnEl = form.querySelector(settings.submitBtnSelector);
  const fieldsArr = Array.from(form.querySelectorAll(settings.inputSelector));
  fieldsArr.forEach(fieldsArrEl => {
    if(fieldsArrEl.value) {
      checkInputValidity(form, fieldsArrEl, settings);
    } else {
      hideInputError(form, fieldsArrEl, settings);
    };
  });
  toggleBtnState(fieldsArr, btnEl, settings);
};
