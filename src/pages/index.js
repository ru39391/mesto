import {FormValidator} from '../components/FormValidator.js';
import {Card} from '../components/Card.js';
import {Section} from '../components/Section.js';
import {UserInfo} from '../components/UserInfo.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';

import {forms, profileForm, btns, items, modalConfig, formConfig, userConfig, initialCards} from '../utils/constants.js';

/* validators */
const validators = {
  profileFormValidator: new FormValidator(formConfig, forms.profile),
  cardFormValidator: new FormValidator(formConfig, forms.card)
};

function returnCard(data, tpl) {
  const card = new Card({
    data: data,
    revealPhoto: (data) => {
      modalPhoto.open(data);
    }
  }, tpl);
  return card.createCard();
}

/* reveal photo */
const modalPhoto = new PopupWithImage(modalConfig.targetPhotoSelector);
modalPhoto.setEventListeners();

/* add elements */
const initialCardList = new Section({
  renderer: (item) => {
    initialCardList.addItem(returnCard(item, items.tplSelector));
  }
}, items.parentSelector);
initialCardList.renderData(initialCards);

/* add card */
const cardFormModal = new PopupWithForm({
  renderer: (item) => {
    initialCardList.addItem(returnCard(item, items.tplSelector));
    cardFormModal.close();
  }
}, modalConfig.targetAddCardSelector);
cardFormModal.setEventListeners();

btns.targetAddCard.addEventListener('click', () => {
  validators.cardFormValidator.checkValidation();
  cardFormModal.open();
});

/* edit profile */
const userInfo = new UserInfo({
  userTitleSelector: userConfig.titleSelector,
  userSubtitleSelector: userConfig.subtitleSelector
});

const profileFormModal = new PopupWithForm({
  renderer: (data) => {
    userInfo.setUserInfo(data.title,data.subtitle);
    profileFormModal.close();
  }
}, modalConfig.targetEditProfileSelector);
profileFormModal.setEventListeners();

btns.targetEditProfile.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  profileForm.title.value = userData.title;
  profileForm.subtitle.value = userData.subtitle;
  validators.profileFormValidator.checkValidation();
  profileFormModal.open();
});

/* validation */
Object.values(validators).forEach(validatorsEl => {
  validatorsEl.enableValidation();
});
