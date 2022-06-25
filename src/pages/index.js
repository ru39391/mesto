import { Api } from '../components/Api.js';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { UserPic } from '../components/UserPic.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';

import { forms, profileForm, userpicForm, btns, items, modalConfig, formConfig, userConfig, access } from '../utils/constants.js';

let userDataId;

/* api */
const api = new Api(access);

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
      cardRemoveModal.open(data);
    },
    setLikes: (data) => {
      if(data.isLiked) {
        api.likeCard(data)
          .then((res) => {
            card.refreshLikesCounter(res.likes.length);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api.unlikeCard(data)
          .then((res) => {
            card.refreshLikesCounter(res.likes.length);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, tpl);
  return card.createCard();
}

/* add elements & set user data */
const userAvatar = new UserPic(userConfig.avatarSelector);
const userInfo = new UserInfo({
  userTitleSelector: userConfig.titleSelector,
  userSubtitleSelector: userConfig.subtitleSelector
});

const initialCardList = new Section({
  renderer: (item) => {
    initialCardList.addItem(returnCard(item, userDataId, items.tplSelector));
  }
}, items.parentSelector);

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userDataId = userData._id;
    userInfo.setUserInfo(userData.name, userData.about);
    userAvatar.setUserPic(userData.avatar);

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
        validators.cardFormValidator.renderLoading(false);
      });
  }
}, modalConfig.targetAddCardSelector);
cardFormModal.setEventListeners();

btns.targetAddCard.addEventListener('click', () => {
  validators.cardFormValidator.checkValidation();
  cardFormModal.open();
});

/* remove card */
const cardRemoveModal = new PopupWithConfirmation({
  renderer: (item) => {
    api.removeCard(item)
      .then((res) => {
        res.card.remove();
        res.card = null;
        cardRemoveModal.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}, modalConfig.targetRemoveCardSelector);
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
        validators.profileFormValidator.renderLoading(false);
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
        userAvatar.setUserPic(res.avatar);
        userpicFormModal.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        validators.userpicFormValidator.renderLoading(false);
      });
  }
}, modalConfig.targetUpdateUserpicSelector);
userpicFormModal.setEventListeners();

btns.targetUpdateUserpic.addEventListener('click', () => {
  const userPic = userAvatar.getUserPic();
  userpicForm.link.value = userPic;
  validators.userpicFormValidator.checkValidation();
  userpicFormModal.open();
});

/* validation */
Object.values(validators).forEach(validatorsEl => {
  validatorsEl.enableValidation();
});
