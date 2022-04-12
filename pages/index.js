const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const editBtn = document.querySelector('.profile__edit-button');

const modal = document.querySelector('.modal');
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