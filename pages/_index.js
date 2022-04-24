/* forms */
const getTextContent = (elem) => document.querySelector(elem).textContent;
/* форма добавления карточки, поля */
const addCardForm = [
  'addCard',
  {
    name: 'name',
    value: '',
    placeholder: 'Название'
  },
  {
    name: 'value',
    value: '',
    placeholder: 'Ссылка на картинку'
  }
];
/* форма редактирования профиля, поля */
const editProfileForm = [
  'editProfile',
  {
    name: 'profile__title',
    value: getTextContent('.profile__title'),
    placeholder: ''
  },
  {
    name: 'profile__subtitle',
    value: getTextContent('.profile__subtitle'),
    placeholder: ''
  }
];

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

  /* меняем иконку при клике на кнопку лайка */
  cardTplEl.querySelector('.photo-wrap__like-button').addEventListener('click', e => {
    const likeBtnIcon = e.target.querySelector('.photo-wrap__like-icon');
    let likeBtnIconSrc = likeBtnIcon.src;
    if(likeBtnIconSrc.includes('active')) {
      likeBtnIconSrc = likeBtnIconSrc.replace('button_active.','button.');
    } else {
      likeBtnIconSrc = likeBtnIconSrc.replace('button.','button_active.');
    }
    likeBtnIcon.src = likeBtnIconSrc;
  });

  /* удаляем карточку */
  cardTplEl.querySelector('.photo-wrap__remove-button').addEventListener('click', e => {
    e.target.closest('.photo-wrap').remove();
  });

  return cardTplEl;
};

initialCards.forEach(initialCardsEl => { /* обрабатываем массив данных для карточек функцией addCard, вносим содержимое в родительский блок */
  elements.append(addCard(initialCardsEl.name,initialCardsEl.link));
});

/* modals */
const page = document.querySelector('.page'); /* определяем родителя модального окна */
const modalTpl = document.querySelector('#modal').content; /* содержимое шаблона модального окна */
let modalTplEl; /* непосредственно модальное окно */
let modalContent; /* контейнер содержимого для модального окна */
let modalCloseBtn;

function setModal() {
  modalTplEl = modalTpl.querySelector('.modal').cloneNode(true);
  modalContent = modalTplEl.querySelector('.modal__content');
  modalCloseBtn = modalTplEl.querySelector('.modal__close');
};

function closeModal() {
  const modal = document.querySelector('.modal');
  modal.classList.remove('modal_visible');
  setTimeout(() => {
    modal.remove();
  }, 1000);
};

function showModal() {
  page.append(modalTplEl);
  setTimeout(() => modalTplEl.classList.add('modal_visible'));
  modalCloseBtn.addEventListener('click', closeModal);
};

function showModalForm(modalTitle,formArr) { /* showModalForm в качестве аргументов принимает заголовок модального окна и массив полей формы, которую необходимо в окно поместить */
  setModal();
  modalTplEl.querySelector('.modal__title').textContent = modalTitle;
  modalContent.append(createForm(...formArr)); /* внутри тела окна помещаем форму, созданную при помощи функции createForm */
  showModal();
};

function revealPhoto(url,desc) {
  setModal();
  modalTplEl.classList.add('modal_bg_dark')
  modalTplEl.querySelector('.modal__title').remove();
  const img = document.createElement('img');
  img.src = url;
  img.alt = desc;
  img.classList.add('modal__photo');
  modalContent.append(img);
  const caption = document.createElement('p');
  caption.textContent = desc;
  caption.classList.add('modal__photo-caption');
  modalContent.append(caption);
  modalContent.classList.add('modal__content_type_photo-holder');
  showModal();
};

/* forms */
const getFormData = (form) => {
  let formData = {}; /* определяем объект */
  const formFields = form.querySelectorAll('.form__field'); /* получаем поля формы */
  formFields.forEach(formFieldsEl => {
    formData[`${formFieldsEl.name}`] = formFieldsEl.value; /* заполняем объект, в качестве ключа используем значение атрибута поля name */
  });
  return formData; /* возвращаем заполненный объект, будет использован внутри createForm */
};

const formTpl = document.querySelector('#form').content; /* содержимое шаблона формы */
let formTplEl; /* определение переменной непосредственно для формы */
let formBody; /* определение переменной для контейнера полей формы */
const createForm = (formName,...formFields) => { /* в качестве аргументов функция createForm принимет данные массива формы (определены выше) */
  formTplEl = formTpl.querySelector('.form').cloneNode(true); /* создаём форму, копируя содержимое соответствующего шаблона */
  formTplEl.name = formName; /* присваиваем атрибуту формы name значение из массива  */
  formBody = formTplEl.querySelector('.form__body'); /* переопределяем переменную, внося в неё определённый блок контейнера полей */
  formFields.forEach(formFieldsEl => { /* создаём поля ввода, определяем их свойства */
    const input = document.createElement('input');
    input.type = 'text';
    input.name = formFieldsEl.name;
    input.value = formFieldsEl.value;
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
      case 'editProfile':
        const formData = getFormData(e.target);
        Object.keys(formData).forEach((formDataEl, index) => {
          document.querySelector(`.${formDataEl}`).textContent = formData[`${formDataEl}`];
          editProfileForm[index + 1].value = formData[`${formDataEl}`];
        });
        break;
    };
    closeModal(); /* закрываем модальное окно */
  });
  return formTplEl; /* возвращаем форму, она будет использована при создании модального окна */
};

/* btns */
const addBtn = document.querySelector('.profile__add-button');
addBtn.addEventListener('click', () => {
  showModalForm('Новое место', addCardForm);
});

const editBtn = document.querySelector('.profile__edit-button');
editBtn.addEventListener('click', () => {
  showModalForm('Редактировать профиль', editProfileForm);
});

const photoItems = document.querySelectorAll('.photo-wrap__photo-holder');
photoItems.forEach(photoItemsEl => {
  photoItemsEl.addEventListener('click', e => {
    e.preventDefault();
    const photoItemsElCaption = e.target.closest('.photo-wrap').querySelector('.photo-wrap__title').textContent;
    revealPhoto(photoItemsEl.href,photoItemsElCaption);
  });
});