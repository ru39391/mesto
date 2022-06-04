import {FormValidator} from '../components/FormValidator.js';
import {Card} from '../components/Card.js';
import {Section} from '../components/Section.js';
import {UserInfo} from '../components/UserInfo.js';
import {PopupWithForm} from '../components/PopupWithForm.js';

import {forms, profileForm, btns, items, modalConfig, formConfig, userConfig, initialCards} from '../utils/constants.js';

/* validators */
const validators = {
  profileFormValidator: new FormValidator(formConfig, forms.profile),
  cardFormValidator: new FormValidator(formConfig, forms.card)
};

function returnCard(data, tpl) {
  const card = new Card(data, tpl);
  return card.createCard();
}

/* add elements */
const initialCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    initialCardList.addItem(returnCard(item, items.tplSelector));
  }
}, items.parentSelector);
initialCardList.renderData();

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
const userData = new UserInfo({
  userTitleSelector: userConfig.titleSelector,
  userSubtitleSelector: userConfig.subtitleSelector
});

const profileFormModal = new PopupWithForm({
  renderer: (data) => {
    userData.setUserInfo(data.title,data.subtitle);
    profileFormModal.close();
  }
}, modalConfig.targetEditProfileSelector);
profileFormModal.setEventListeners();

btns.targetEditProfile.addEventListener('click', () => {
  profileForm.title.value = userData.getUserInfo().title;
  profileForm.subtitle.value = userData.getUserInfo().subtitle;
  validators.profileFormValidator.checkValidation();
  profileFormModal.open();
});

/* validation */
Object.values(validators).forEach(validatorsEl => {
  validatorsEl.enableValidation();
});
