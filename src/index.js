import './pages/index.js';

import './pages/index.css';

import header__logo from './images/header/header__logo.svg';
import profile__avatar from './images/profile/profile__avatar.png';
import profile__edit from './images/profile/profile__edit-button.svg';
import profile__add from './images/profile/profile__add-button.svg';
import modal__close from './images/modal/modal__close.svg';
import photo__remove from './images/photo-wrap/photo-wrap__remove-button.svg';
import photo__like from './images/photo-wrap/photo-wrap__like-button.svg';

const pictures = [
  { name: 'Место', image: header__logo },
  { name: 'Жак-Ив Кусто', image: profile__avatar },
  { name: 'Редактировать профиль', image: profile__edit },
  { name: 'Добавть фото', image: profile__add },
  { name: 'Закрыть всплывающее окно', image: modal__close },
  { name: 'Удалить', image: photo__remove },
  { name: 'Добавить в избранное', image: photo__like },
];
