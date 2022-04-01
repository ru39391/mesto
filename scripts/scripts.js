const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const editBtn = document.querySelector('.profile__edit-button');

const modal = document.querySelector('.modal');
const modalCloseBtn = document.querySelector('.modal__close');

const profileTitleInput = modal.querySelector('[name="profileTitle"]');
const profileSubtitleInput = modal.querySelector('[name="profileSubtitle"]');
const submitBtn = document.querySelector('.form__button');

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
  closeModalForm();
  profileTitle.textContent = profileTitleInput.value;
  profileSubtitle.textContent = profileSubtitleInput.value;
}

editBtn.addEventListener('click', showModalForm);
modalCloseBtn.addEventListener('click', closeModalForm);
submitBtn.addEventListener('click', editModalForm);