const params = {
  formSelector: '.form',
  inputSelector: '.form__field',
  submitBtnSelector: '.form__button',
  inactiveBtnClass: 'form__button_disabled',
  inputErrorClass: 'form__field_type_error',
  errorClass: 'form__error_visible'
};

function showInputError(formEl, inputEl, errorMsg) {
  const errorEl = formEl.querySelector(`.${inputEl.name}-error`);
  inputEl.classList.add(params.inputErrorClass);
  errorEl.textContent = errorMsg;
  errorEl.classList.add(params.errorClass);
};

function hideInputError(formEl, inputEl) {
  const errorEl = formEl.querySelector(`.${inputEl.name}-error`);
  inputEl.classList.remove(params.inputErrorClass);
  errorEl.classList.remove(params.errorClass);
  errorEl.textContent = '';
};

function checkInputValidity(formEl, inputEl) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage);
  } else {
    hideInputError(formEl, inputEl);
  }
};

function hasInvalidInput(fieldsArr) {
  return fieldsArr.some(fieldsArrEl => !fieldsArrEl.validity.valid);
};

function toggleBtnState(fieldsArr, btnEl) {
  if(hasInvalidInput(fieldsArr)){
    btnEl.classList.add(params.inactiveBtnClass);
    btnEl.disabled = true;
  } else {
    btnEl.classList.remove(params.inactiveBtnClass);
    btnEl.disabled = false;
  }
};

function setEvtListeners(formEl) {
  const fieldsArr = Array.from(formEl.querySelectorAll(params.inputSelector));
  const btnEl = formEl.querySelector(params.submitBtnSelector);
  toggleBtnState(fieldsArr, btnEl);
  fieldsArr.forEach(fieldsArrEl => {
    if(fieldsArrEl.value) {
      checkInputValidity(formEl, fieldsArrEl);
    }
    fieldsArrEl.addEventListener('input', () => {
      checkInputValidity(formEl, fieldsArrEl);
      toggleBtnState(fieldsArr, btnEl);
    });
  });
};

function enableValidation() {
  const formsArr = Array.from(document.querySelectorAll(params.formSelector));
  formsArr.forEach(formsArrEl => {
    formsArrEl.addEventListener('submit', (e) => {
      e.preventDefault();
    });
    setEvtListeners(formsArrEl);
  });
};

enableValidation();
