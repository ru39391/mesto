/* cards */
const initialCards = [
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
const elements = document.querySelector('.elements');
const cardTpl = document.querySelector('#card').content;
let cardTplEl;
initialCards.forEach(initialCardsEl => {
  cardTplEl = cardTpl.querySelector('.photo-wrap').cloneNode(true);
  cardTplEl.querySelector('.photo-wrap__title').textContent = initialCardsEl.name;
  cardTplEl.querySelector('.photo-wrap__picture').src = initialCardsEl.link;
  cardTplEl.querySelector('.photo-wrap__photo-holder').href = initialCardsEl.link;
  elements.append(cardTplEl);
});

/* add card */
const page = document.querySelector('.page');
const addCardForm = [
  'addCard',
  {
    name: 'addCardTitle',
    placeholder: 'Название'
  },
  {
    name: 'addCardSubtitle',
    placeholder: 'Ссылка на картинку'
  }
]

const formTpl = document.querySelector('#form').content;
let formTplEl;
function createForm(formName,...formFields) {
  formTplEl = formTpl.querySelector('.form').cloneNode(true);
  formTplEl.name = formName;
  formFields.forEach(formFieldsEl => {
    let input = document.createElement('input');
    input.type = 'text';
    input.name = formFieldsEl.name;
    input.placeholder = formFieldsEl.placeholder;
    input.classList.add('form__field');
    formTplEl.querySelector('.form__body').append(input);
  });
}

const modalTpl = document.querySelector('#modal').content;
let modalTplEl;
let modalContent;
function showModalForm(modalTitle,formArr) {
  modalTplEl = modalTpl.querySelector('.modal').cloneNode(true);
  modalTplEl.querySelector('.modal__title').textContent = modalTitle;
  modalContent = modalTplEl.querySelector('.modal__content');
  createForm(...formArr);
  modalContent.append(formTplEl);
  modalTplEl.classList.add('modal_visible');
  page.append(modalTplEl);
}

const addBtn = document.querySelector('.profile__add-button');
addBtn.addEventListener('click', () => {
  showModalForm('Новое место',addCardForm);
});


/* profile */
/*
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const editBtn = document.querySelector('.profile__edit-button');

const modalCloseBtn = modal.querySelector('.modal__close');

const form = modal.querySelector('[name="profileEdit"]');
const profileTitleInput = form.querySelector('[name="profileTitle"]');
const profileSubtitleInput = form.querySelector('[name="profileSubtitle"]');

function showModalForm() {
  modal.classList.add('modal_visible');
  profileTitleInput.value = profileTitle.textContent;
  profileSubtitleInput.value = profileSubtitle.textContent;
}

function closeModalForm() {
  modal.classList.remove('modal_visible');
}

function editModalForm(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileSubtitle.textContent = profileSubtitleInput.value;
  closeModalForm();
}

editBtn.addEventListener('click', showModalForm);
modalCloseBtn.addEventListener('click', closeModalForm);
form.addEventListener('submit', editModalForm);
*/