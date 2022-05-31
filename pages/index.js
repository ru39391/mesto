import {FormValidator} from './FormValidator.js';
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

const validators = {
  profileForm: new FormValidator(params, profileForm),
  cardForm: new FormValidator(params, cardForm)
};

function returnCard(data, tpl) {
  const card = new Card(data, tpl);
  return card.createCard();
}

function submitAddCardForm(form) {
  if(cardFormTitle.value && cardFormLink.value) {
    const cardValues = {
      name: cardFormTitle.value,
      link: cardFormLink.value,
    };
    elements.prepend(returnCard(cardValues, cardTplSelector));
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
  validators.profileForm.checkValidation();
  showModal(modalTargetEditProfile);
});

profileForm.addEventListener('submit', e => {
  e.preventDefault();
  submitEditProfileForm(e.target);
});

/* add cards */
initialCards.forEach(initialCardsEl => {
  elements.append(returnCard(initialCardsEl, cardTplSelector));
});

addCardBtn.addEventListener('click', () => {
  validators.cardForm.checkValidation();
  showModal(modalTargetAddCard);
});

cardForm.addEventListener('submit', e => {
  e.preventDefault();
  submitAddCardForm(e.target);
});

/* validation */
Object.values(validators).forEach(validatorsEl => {
  validatorsEl.enableValidation();
});

/* close modals */
modals.forEach(modalEl => {
  modalEl.addEventListener('click', e => {
    const modal = e.target.closest('.modal');
    if (e.target.classList.contains('modal__close') || e.target.classList.contains('modal')) {
      hideModal(modal);
    }
  });
});
