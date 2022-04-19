/* forms */
/* форма добавления карточки, поля */
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
/* форма редактирования профиля, поля */
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

const formTpl = document.querySelector('#form').content; /* содержимое шаблона формы */
let formTplEl; /* определение переменной непосредственно для формы */
let formBody; /* определение переменной для контейнера полей формы */
const createForm = (formName,...formFields) => { /* в качестве аргументов функция createForm принимет данные массива формы (определены выше) */
  formTplEl = formTpl.querySelector('.form').cloneNode(true); /* создаём форму, копируя содержимое соответствующего шаблона */
  formTplEl.name = formName; /* присваиваем атрибуту формы name значение из массива  */
  formBody = formTplEl.querySelector('.form__body'); /* переопределяем переменную, внося в неё опрделённый блок контейнера полей */
  formFields.forEach(formFieldsEl => { /* создаём поля ввода, определяем их свойства */
    let input = document.createElement('input');
    input.type = 'text';
    input.name = formFieldsEl.name;
    input.placeholder = formFieldsEl.placeholder;
    input.classList.add('form__field');
    formBody.append(input); /* вставляем поля в родительский контейнер */
  });

  formTplEl.addEventListener('submit', e => { /* при отправке данных проверяем назначение формы */
    e.preventDefault();
    switch(formName) { /* проверяем передаваемое значение атрибута name формы */
      case 'addCard': /* в случае [name="addCard"] создаём карточку галереи, если оба поля заполнены */
        const addCardTitle = getFormData(e.target).name;
        const addCardLink = getFormData(e.target).value; /* getFormData возвращает объект, содержащий введённые значения полей ранее созданной формы, функция принимает в качестве аргумента форму */
        if(addCardTitle && addCardLink) {
          elements.prepend(addCard(addCardTitle,addCardLink)); /* addCard создаёт карточку, принимает два аргумента: заголовок и ссылку на изображение */
        }
        break;
    };
    closeModalForm(); /* закрываем модальное окно */
  });
  return formTplEl; /* возвращаем форму, она будет использована при создании модального окна */
};

const getFormData = (form) => {
  let formData = {}; /* определяем объект */
  const formFields = form.querySelectorAll('.form__field'); /* получаем поля формы */
  formFields.forEach(formFieldsEl => {
    formData[`${formFieldsEl.name}`] = formFieldsEl.value; /* заполняем объект, в качестве ключа используем значение атрибута поля name */
  });
  return formData; /* возвращаем заполненный объект, будет использован внутри createForm */
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
const elements = document.querySelector('.elements'); /* определяем родителя карточек */
const cardTpl = document.querySelector('#card').content; /* содержимое шаблона карточки */
let cardTplEl; /* непосредственно карточка */
const addCard = (cardName,cardLink) => { /* создаём карточку, вносим содержимое, возвращаем элемент */
  cardTplEl = cardTpl.querySelector('.photo-wrap').cloneNode(true);
  cardTplEl.querySelector('.photo-wrap__title').textContent = cardName;
  cardTplEl.querySelector('.photo-wrap__picture').src = cardLink;
  cardTplEl.querySelector('.photo-wrap__photo-holder').href = cardLink;
  return cardTplEl;
};

initialCards.forEach(initialCardsEl => { /* обрабатываем массив данных для карточек функцией addCard, вносим содержимое в родительский блок */
  elements.append(addCard(initialCardsEl.name,initialCardsEl.link));
});

/* show modals */
const page = document.querySelector('.page'); /* определяем родителя модального окна */
const modalTpl = document.querySelector('#modal').content; /* содержимое шаблона модального окна */
let modalTplEl; /* непосредственно модальное окно */
let modalContent; /* контейнер содержимого для модального окна */
let modalCloseBtn;
function showModalForm(modalTitle,formArr) { /* showModalForm в качестве аргументов принимает заголовок модального окна и массив полей формы, которую необходимо в окно поместить */
  modalTplEl = modalTpl.querySelector('.modal').cloneNode(true);
  modalTplEl.querySelector('.modal__title').textContent = modalTitle;
  modalContent = modalTplEl.querySelector('.modal__content');
  modalCloseBtn = modalTplEl.querySelector('.modal__close');
  modalContent.append(createForm(...formArr)); /* внутри тела окна помещаем форму, созданную при помощи функции createForm */
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
