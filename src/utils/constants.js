export const forms = {
  profile: document.forms.editProfile,
  card: document.forms.addCard
}

export const profileForm = {
  title: forms.profile.elements.title,
  subtitle: forms.profile.elements.subtitle
}

export const cardForm = {
  name: forms.card.elements.name,
  link: forms.card.elements.link
}

export const btns = {
  targetEditProfile: document.querySelector('.profile__edit-button'),
  targetAddCard: document.querySelector('.profile__add-button')
}

export const items = {
  parentSelector: '.elements',
  tplSelector: '.card-template'
}

export const modalConfig = {
  defaultClass: 'modal',
  visibleClass: 'modal_visible',
  closeBtnClass: 'modal__close',
  targetEditProfileSelector: '.modal_target_edit-profile',
  targetAddCardSelector: '.modal_target_add-card',
  targetPhotoSelector: '.modal_target_reveal-photo',
  photoSelector: '.modal__photo',
  photoCaptionSelector: '.modal__photo-caption',
}

export const formConfig = {
  defaultSelector: '.form',
  inputSelector: '.form__field',
  submitBtnSelector: '.form__button',
  inactiveBtnClass: 'form__button_disabled',
  inputErrorClass: 'form__field_type_error',
  errorClass: 'form__error_visible'
};

export const userConfig = {
  titleSelector: '.profile__title',
  subtitleSelector: '.profile__subtitle',
}

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
