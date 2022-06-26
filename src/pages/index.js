import { Api } from '../components/Api.js';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';

import { forms, profileForm, userpicForm, btns, items, modalConfig, formConfig, userConfig, access } from '../utils/constants.js';

let userDataId;

/* api */
const api = new Api({
  baseUrl: access.baseUrl,
  headers: {
    authorization: access.token,
    'Content-Type': 'application/json'
  }
});

/* validators */
const validators = {
  profileFormValidator: new FormValidator(formConfig, forms.profile),
  userpicFormValidator: new FormValidator(formConfig, forms.userpic),
  cardFormValidator: new FormValidator(formConfig, forms.cardNew)
};

/* card creation */
function returnCard(item, currentUserId, tpl) {
  const card = new Card({
    data: item,
    currentOwner: currentUserId,
    revealPhoto: (data) => {
      modalPhoto.open(data);
    },
    revealRemoveConfirmation: (data) => {
      cardRemoveModal.open();
      cardRemoveModal.submitForm(() => {
        api.removeCard(data)
          .then((res) => {
            card.removeCardEl();
            cardRemoveModal.close();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    setLikes: (data) => {
      if(data.isLiked) {
        api.unlikeCard(data)
          .then((res) => {
            card.setCardLikes(res.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api.likeCard(data)
          .then((res) => {
            card.setCardLikes(res.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, tpl);
  return card.createCardEl();
}

/* add elements & set user data */
const userInfo = new UserInfo({
  userTitleSelector: userConfig.titleSelector,
  userSubtitleSelector: userConfig.subtitleSelector,
  userAvatarSelector: userConfig.avatarSelector
});

const initialCardList = new Section({
  renderer: (item) => {
    initialCardList.addItem(returnCard(item, userDataId, items.tplSelector));
  }
}, items.parentSelector);

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userDataId = userData._id;
    userInfo.setUserPic(userData.avatar);
    userInfo.setUserInfo(userData.name, userData.about);
    initialCardList.renderData(initialCards);
  })
  .catch((err) => {
    console.log(err);
  });

/* add card */
const cardFormModal = new PopupWithForm({
  renderer: (item) => {
    api.addCard(item)
      .then((res) => {
        initialCardList.addItem(returnCard(res, userDataId, items.tplSelector));
        cardFormModal.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        cardFormModal.renderLoading(false);
      });
  }
}, modalConfig.targetAddCardSelector);
cardFormModal.setEventListeners();

btns.targetAddCard.addEventListener('click', () => {
  validators.cardFormValidator.checkValidation();
  cardFormModal.open();
});

/* reveal confirmation */
const cardRemoveModal = new PopupWithConfirmation(modalConfig.targetRemoveCardSelector);
cardRemoveModal.setEventListeners();

/* reveal photo */
const modalPhoto = new PopupWithImage(modalConfig.targetPhotoSelector);
modalPhoto.setEventListeners();

/* edit profile */
const profileFormModal = new PopupWithForm({
  renderer: (data) => {
    api.setUserData(data)
      .then((res) => {
        userInfo.setUserInfo(res.name, res.about);
        profileFormModal.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        profileFormModal.renderLoading(false);
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

/* update userpic */
const userpicFormModal = new PopupWithForm({
  renderer: (data) => {
    api.setUserPic(data)
      .then((res) => {
        userInfo.setUserPic(res.avatar);
        userpicFormModal.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        userpicFormModal.renderLoading(false);
      });
  }
}, modalConfig.targetUpdateUserpicSelector);
userpicFormModal.setEventListeners();

btns.targetUpdateUserpic.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  userpicForm.link.value = userData.avatar;
  validators.userpicFormValidator.checkValidation();
  userpicFormModal.open();
});

/* validation */
Object.values(validators).forEach(validatorsEl => {
  validatorsEl.enableValidation();
});
