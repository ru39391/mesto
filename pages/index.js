const editProfileBtn = document.querySelector('.profile__edit-button');
const addCardBtn = document.querySelector('.profile__add-button');
const submitBtns = document.querySelectorAll('.form__button');

const elements = document.querySelector('.elements');
const cardTpl = document.querySelector('#card').content;
let cardTplEl;

let cardsArr = [];
let newCard;
let cardPhoto;
let cardPhotoCaption;
let cardPhotoLink;
let cardRemoveBtn;
let cardLikeBtn;

let modal;
const modalCloseBtns = document.querySelectorAll('.modal__close');

let formFieldTitle;
let formFieldValue;

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

function showModal(modal) {
  modal.classList.add('modal_visible');
}

function hideModal(modal) {
  modal.classList.remove('modal_visible');
}

function createModalPhoto(cardTitle,cardLink) {
  modal = document.querySelector('.modal_target_reveal-photo');
  const modalPhoto = modal.querySelector('.modal__photo');
  const modalCaption = modal.querySelector('.modal__photo-caption');
  modalPhoto.src = cardLink;
  modalPhoto.alt = cardTitle;
  modalCaption.textContent = cardTitle;
  showModal(modal);
}

const createCard = (cardTitle,cardLink) => {
  cardTplEl = cardTpl.querySelector('.photo-wrap').cloneNode(true);
  cardTplEl.querySelector('.photo-wrap__title').textContent = cardTitle;
  cardTplEl.querySelector('.photo-wrap__picture').src = cardLink;
  cardTplEl.querySelector('.photo-wrap__photo-holder').href = cardLink;
  return cardTplEl;
}

function revealPhoto(card) {
  cardPhoto = card.querySelector('.photo-wrap__photo-holder');
  cardPhoto.addEventListener('click', e => {
    e.preventDefault();
    cardPhotoCaption = e.target.closest('.photo-wrap').querySelector('.photo-wrap__title').textContent;
    cardPhotoLink = e.target.href;
    createModalPhoto(cardPhotoCaption,cardPhotoLink);
  });
}

function removeCard(card) {
  cardRemoveBtn = card.querySelector('.photo-wrap__remove-button');
  cardRemoveBtn.addEventListener('click', e => {
    e.target.closest('.photo-wrap').remove();
  });
}

function likeCard(card) {
  cardLikeBtn = card.querySelector('.photo-wrap__like-button');
  cardLikeBtn.addEventListener('click', e => {
    e.target.classList.toggle('photo-wrap__like-button_active');
  });
}

initialCards.forEach(cardsEl => {
  newCard = createCard(cardsEl.name,cardsEl.link);
  elements.append(newCard);
  cardsArr.push(newCard);
});

editProfileBtn.addEventListener('click', () => {
  modal = document.querySelector('.modal_target_edit-profile');
  formFieldTitle = modal.querySelector('[name="editProfileTitle"]');
  formFieldValue = modal.querySelector('[name="editProfileSubtitle"]');

  formFieldTitle.value = profileTitle.textContent;
  formFieldValue.value = profileSubtitle.textContent;
  showModal(modal);
});

addCardBtn.addEventListener('click', () => {
  modal = document.querySelector('.modal_target_add-card');
  showModal(modal);
});

modalCloseBtns.forEach(modalCloseBtnsEl => {
  modalCloseBtnsEl.addEventListener('click', e => {
    modal = e.target.closest('.modal');
    hideModal(modal);
  });
});

submitBtns.forEach(submitBtnsEl => {
  submitBtnsEl.addEventListener('click', e => {
    e.preventDefault();
    modal = e.target.closest('.modal');
    modalClassMod = Boolean(modal.classList.contains('modal_target_edit-profile'));
    switch(modalClassMod) {
      case true:
        formFieldTitle = modal.querySelector('[name="editProfileTitle"]');
        formFieldValue = modal.querySelector('[name="editProfileSubtitle"]');
        profileTitle.textContent = formFieldTitle.value;
        profileSubtitle.textContent = formFieldValue.value;
        break;
      case false:
        formFieldTitle = modal.querySelector('[name="addCardTitle"]');
        formFieldValue = modal.querySelector('[name="addCardLink"]');
        if(formFieldTitle.value && formFieldValue.value) {
          cardPhotoCaption = formFieldTitle.value;
          cardPhotoLink = formFieldValue.value;
          newCard = createCard(cardPhotoCaption,cardPhotoLink);

          elements.prepend(newCard);
          formFieldTitle.value = '';
          formFieldValue.value = '';

          revealPhoto(newCard);
          removeCard(newCard);
          likeCard(newCard);
        };
        break;
    };
    hideModal(modal);
  });
});

cardsArr.forEach(cardsArrEl => {
  revealPhoto(cardsArrEl);
  removeCard(cardsArrEl);
  likeCard(cardsArrEl);
});
