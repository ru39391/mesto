import {Api} from '../components/Api.js';
import {FormValidator} from '../components/FormValidator.js';
import {Card} from '../components/Card.js';
import {Section} from '../components/Section.js';
import {UserInfo} from '../components/UserInfo.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';

import {forms, profileForm, btns, items, modalConfig, formConfig, userConfig, access} from '../utils/constants.js';

/* api */
const api = new Api(access);

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
api.getInitialCards()
  .then((data) => {
    initialCardList.renderData(data);
  })
  .catch((err) => {
    console.log(err);
  });

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
api.getUserData()
  .then((data) => {
    userInfo.setUserInfo(data.name,data.about);
  })
  .catch((err) => {
    console.log(err);
  });

const profileFormModal = new PopupWithForm({
  renderer: (data) => {
    api.setUserData(data)
      .then((res) => {
        userInfo.setUserInfo(res.name,res.about);
        profileFormModal.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}, modalConfig.targetEditProfileSelector);
profileFormModal.setEventListeners();

btns.targetEditProfile.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  profileForm.name.value = userData.name;
  profileForm.about.value = userData.about;
  validators.profileFormValidator.checkValidation();
  profileFormModal.open();
});

/* validation */
Object.values(validators).forEach(validatorsEl => {
  validatorsEl.enableValidation();
});
