/* forms */
const addCardForm = [
  'addCard',
  {
    name: 'name',
    placeholder: 'Название'
  },
  {
    name: 'value',
    placeholder: 'Ссылка на картинку'
  }
];
const editProfileForm = [
  'editProfile',
  {
    name: 'editProfileTitle',
    placeholder: ''
  },
  {
    name: 'editProfileSubtitle',
    placeholder: ''
  }
];


const formTpl = document.querySelector('#form').content;
let formTplEl;
let formBody;
const createForm = (formName,...formFields) => {
  formTplEl = formTpl.querySelector('.form').cloneNode(true);
  formTplEl.name = formName;
  formBody = formTplEl.querySelector('.form__body');
  formFields.forEach(formFieldsEl => {
    let input = document.createElement('input');
    input.type = 'text';
    input.name = formFieldsEl.name;
    input.placeholder = formFieldsEl.placeholder;
    input.classList.add('form__field');
    formBody.append(input);
  });

  formTplEl.addEventListener('submit', e => {
    e.preventDefault();
    switch(formName) {
      case 'addCard':
        elements.prepend(addCard(getFormData(e.target).name,getFormData(e.target).value));
        break;
    };
    closeModalForm();
  });
  return formTplEl;
};

const getFormData = (form) => {
  let formData = {};
  const formFields = form.querySelectorAll('.form__field');
  formFields.forEach(formFieldsEl => {
    formData[`${formFieldsEl.name}`] = formFieldsEl.value;
  });
  return formData;
};

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

/* show cards on init */
const elements = document.querySelector('.elements');
const cardTpl = document.querySelector('#card').content;
let cardTplEl;
const addCard = (cardName,cardLink) => {
  cardTplEl = cardTpl.querySelector('.photo-wrap').cloneNode(true);
  cardTplEl.querySelector('.photo-wrap__title').textContent = cardName;
  cardTplEl.querySelector('.photo-wrap__picture').src = cardLink;
  cardTplEl.querySelector('.photo-wrap__photo-holder').href = cardLink;
  return cardTplEl;
};

initialCards.forEach(initialCardsEl => {
  elements.append(addCard(initialCardsEl.name,initialCardsEl.link));
});

/* show modals */
const page = document.querySelector('.page');
const modalTpl = document.querySelector('#modal').content;
let modalTplEl;
let modalContent;
let modalCloseBtn;
function showModalForm(modalTitle,formArr) {
  modalTplEl = modalTpl.querySelector('.modal').cloneNode(true);
  modalTplEl.querySelector('.modal__title').textContent = modalTitle;
  modalContent = modalTplEl.querySelector('.modal__content');
  modalCloseBtn = modalTplEl.querySelector('.modal__close');
  modalContent.append(createForm(...formArr));
  modalTplEl.classList.add('modal_visible');
  page.append(modalTplEl);
  modalCloseBtn.addEventListener('click', closeModalForm);
}

function closeModalForm() {
  const modal = document.querySelector('.modal');
  modal.remove();
}

const addBtn = document.querySelector('.profile__add-button');
addBtn.addEventListener('click', () => {
  showModalForm('Новое место', addCardForm);
});

const editBtn = document.querySelector('.profile__edit-button');
editBtn.addEventListener('click', () => {
  showModalForm('Редактировать профиль', editProfileForm);
});

/* profile */
/*
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');


const form = modal.querySelector('[name="editProfile"]');
const profileTitleInput = form.querySelector('[name="profileTitle"]');
const profileSubtitleInput = form.querySelector('[name="profileSubtitle"]');

function showModalForm() {
  modal.classList.add('modal_visible');
  profileTitleInput.value = profileTitle.textContent;
  profileSubtitleInput.value = profileSubtitle.textContent;
}

function editModalForm(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileSubtitle.textContent = profileSubtitleInput.value;
  closeModalForm();
}

form.addEventListener('submit', editModalForm);
*/