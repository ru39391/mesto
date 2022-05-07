const editProfileBtn = document.querySelector('.profile__edit-button');
const addCardBtn = document.querySelector('.profile__add-button');

const profileForm = document.querySelector('[name="editProfile"]');
const profileFormTitle = profileForm.querySelector('[name="editProfileTitle"]');
const profileFormSubtitle = profileForm.querySelector('[name="editProfileSubtitle"]');

const cardForm = document.querySelector('[name="addCard"]');
const cardFormTitle = cardForm.querySelector('[name="addCardTitle"]');
const cardFormLink = cardForm.querySelector('[name="addCardLink"]');

const elements = document.querySelector('.elements');
const cardTpl = document.querySelector('#card').content;

const modalTargetPhoto = document.querySelector('.modal_target_reveal-photo');
const modalTargetEditProfile = document.querySelector('.modal_target_edit-profile');
const modalTargetAddCard = document.querySelector('.modal_target_add-card');
const modals = document.querySelectorAll('.modal');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

function hideModalByEsc(e) {
  const modal = document.querySelector('.modal_visible');
  if(e.key == 'Escape') {
    hideModal(modal);
  };
};

function showModal(modal) {
  modal.classList.add('modal_visible');
  document.addEventListener('keydown', hideModalByEsc);
}

function hideModal(modal) {
  modal.classList.remove('modal_visible');
  document.removeEventListener('keydown', hideModalByEsc);
}

function createModalPhoto(cardTitle,cardLink) {
  const modalPhoto = modalTargetPhoto.querySelector('.modal__photo');
  const modalCaption = modalTargetPhoto.querySelector('.modal__photo-caption');
  modalPhoto.src = cardLink;
  modalPhoto.alt = cardTitle;
  modalCaption.textContent = cardTitle;
  showModal(modalTargetPhoto);
}

function revealPhoto(card) {
  const cardPhoto = card.querySelector('.photo-wrap__photo-holder');
  cardPhoto.addEventListener('click', e => {
    e.preventDefault();
    const cardPhotoCaption = e.target.closest('.photo-wrap').querySelector('.photo-wrap__title').textContent;
    const cardPhotoLink = e.target.querySelector('.photo-wrap__picture').src;
    createModalPhoto(cardPhotoCaption,cardPhotoLink);
  });
}

function removeCard(card) {
  const cardRemoveBtn = card.querySelector('.photo-wrap__remove-button');
  cardRemoveBtn.addEventListener('click', e => {
    e.target.closest('.photo-wrap').remove();
  });
}

function likeCard(card) {
  const cardLikeBtn = card.querySelector('.photo-wrap__like-button');
  cardLikeBtn.addEventListener('click', e => {
    e.target.classList.toggle('photo-wrap__like-button_active');
  });
}

const createCard = (cardTitle,cardLink) => {
  const cardTplEl = cardTpl.querySelector('.photo-wrap').cloneNode(true);
  cardTplEl.querySelector('.photo-wrap__title').textContent = cardTitle;
  cardTplEl.querySelector('.photo-wrap__picture').src = cardLink;
  cardTplEl.querySelector('.photo-wrap__picture').alt = cardTitle;
  revealPhoto(cardTplEl);
  removeCard(cardTplEl);
  likeCard(cardTplEl);
  return cardTplEl;
}

function submitEditProfileForm(form) {
  profileTitle.textContent = profileFormTitle.value;
  profileSubtitle.textContent = profileFormSubtitle.value;
  hideModal(form.closest('.modal'));
}

function submitAddCardForm(form) {
  if(cardFormTitle.value && cardFormLink.value) {
    elements.prepend(createCard(cardFormTitle.value,cardFormLink.value));
    cardFormTitle.value = '';
    cardFormLink.value = '';
  };
  hideModal(form.closest('.modal'));
}

initialCards.forEach(cardsEl => {
  elements.append(createCard(cardsEl.name,cardsEl.link));
});

editProfileBtn.addEventListener('click', () => {
  profileFormTitle.value = profileTitle.textContent;
  profileFormSubtitle.value = profileSubtitle.textContent;
  setEvtListeners(modalTargetEditProfile.querySelector(params.formSelector));
  showModal(modalTargetEditProfile);
});

addCardBtn.addEventListener('click', () => {
  setEvtListeners(modalTargetAddCard.querySelector(params.formSelector));
  showModal(modalTargetAddCard);
});

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

profileForm.addEventListener('submit', e => {
  e.preventDefault();
  submitEditProfileForm(e.target);
});

cardForm.addEventListener('submit', e => {
  e.preventDefault();
  submitAddCardForm(e.target);
});
