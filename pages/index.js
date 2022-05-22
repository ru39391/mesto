import {FormValidator} from './FormValidator.js';
import {checkFormValidity} from './validate.js';
import {Card} from './Card.js';
import {initialCards} from './initialCards.js';
import {modals, modalTargetEditProfile, modalTargetAddCard, showModal, hideModal} from './modals.js';

const params = {
  formSelector: '.form',
  inputSelector: '.form__field',
  submitBtnSelector: '.form__button',
  inactiveBtnClass: 'form__button_disabled',
  inputErrorClass: 'form__field_type_error',
  errorClass: 'form__error_visible'
};
const forms = document.querySelectorAll(params.formSelector);

const profileForm = document.forms.editProfile;
const profileFormTitle = profileForm.elements.editProfileTitle;
const profileFormSubtitle = profileForm.elements.editProfileSubtitle;
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const cardTplSelector = '.card-template';
const cardForm = document.forms.addCard;
const cardFormTitle = cardForm.elements.addCardTitle;
const cardFormLink = cardForm.elements.addCardLink;

const elements = document.querySelector('.elements');
const addCardBtn = document.querySelector('.profile__add-button');
const editProfileBtn = document.querySelector('.profile__edit-button');

function submitAddCardForm(form) {
  if(cardFormTitle.value && cardFormLink.value) {
    const cardValues = {
      name: cardFormTitle.value,
      link: cardFormLink.value,
    };
    const card = new Card(cardValues, cardTplSelector);
    elements.prepend(card.createCard());
    form.reset();
  };
  hideModal(form.closest('.modal'));
}

function submitEditProfileForm(form) {
  profileTitle.textContent = profileFormTitle.value;
  profileSubtitle.textContent = profileFormSubtitle.value;
  hideModal(form.closest('.modal'));
}

/* edit profile */
editProfileBtn.addEventListener('click', () => {
  profileFormTitle.value = profileTitle.textContent;
  profileFormSubtitle.value = profileSubtitle.textContent;
  showModal(modalTargetEditProfile);
  checkFormValidity(modalTargetEditProfile, params);
});

profileForm.addEventListener('submit', e => {
  e.preventDefault();
  submitEditProfileForm(e.target);
});

/* add cards */
initialCards.forEach(initialCardsEl => {
  const card = new Card(initialCardsEl, cardTplSelector);
  elements.append(card.createCard());
});

addCardBtn.addEventListener('click', () => {
  showModal(modalTargetAddCard);
  checkFormValidity(modalTargetAddCard, params);
});

cardForm.addEventListener('submit', e => {
  e.preventDefault();
  submitAddCardForm(e.target);
});

/* close modals */
modals.forEach(modalEl => {
  modalEl.addEventListener('click', e => {
    const modal = e.target.closest('.modal');
    const modalCloseBtn = modal.querySelector('.modal__close');
    switch(Boolean(e.target.closest('.modal__content'))) {
      case true:
        if(e.target == modalCloseBtn){
          hideModal(modal);
        }
        break;

      case false:
        hideModal(modal);
        break;
    };
  });
});

/* validate forms */
forms.forEach(formsEl => {
  const formValidator = new FormValidator(params, formsEl);
  formValidator.enableValidation();
});
