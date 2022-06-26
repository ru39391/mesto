(()=>{"use strict";var e={};function t(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}e.p="";var r=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._baseUrl=t.baseUrl,this._headers=t.headers}var r,n;return r=e,(n=[{key:"_responseRenderer",value:function(e,t){return e.ok?e.json():Promise.reject("".concat(t,": ").concat(e.status))}},{key:"getInitialCards",value:function(){var e=this;return fetch("".concat(this._baseUrl,"/cards"),{headers:this._headers}).then((function(t){return e._responseRenderer(t,"Ошибка при загрузке карточек")}))}},{key:"addCard",value:function(e){var t=this;return fetch("".concat(this._baseUrl,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:e.name,link:e.link})}).then((function(e){return t._responseRenderer(e,"Ошибка при добавление новой карточки")}))}},{key:"removeCard",value:function(e){var t=this;return fetch("".concat(this._baseUrl,"/cards/").concat(e.id),{method:"DELETE",headers:this._headers}).then((function(e){return t._responseRenderer(e,"Ошибка при удалении карточки")}))}},{key:"likeCard",value:function(e){var t=this;return fetch("".concat(this._baseUrl,"/cards/").concat(e.id,"/likes"),{method:"PUT",headers:this._headers}).then((function(e){return t._responseRenderer(e,"Ошибка при добавлении в избранное")}))}},{key:"unlikeCard",value:function(e){var t=this;return fetch("".concat(this._baseUrl,"/cards/").concat(e.id,"/likes"),{method:"DELETE",headers:this._headers}).then((function(e){return t._responseRenderer(e,"Ошибка при удалении из избранного")}))}},{key:"getUserData",value:function(){var e=this;return fetch("".concat(this._baseUrl,"/users/me"),{headers:this._headers}).then((function(t){return e._responseRenderer(t,"Ошибка при получении данных пользователя")}))}},{key:"setUserData",value:function(e){var t=this;return fetch("".concat(this._baseUrl,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e.name,about:e.about})}).then((function(e){return t._responseRenderer(e,"Ошибка при обновлении данных пользователя")}))}},{key:"setUserPic",value:function(e){var t=this;return fetch("".concat(this._baseUrl,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e.link})}).then((function(e){return t._responseRenderer(e,"Ошибка при обновлении изображения пользователя")}))}}])&&t(r.prototype,n),Object.defineProperty(r,"prototype",{writable:!1}),e}();function n(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var o=function(){function e(t,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._formSelector=t.formSelector,this._inputSelector=t.inputSelector,this._submitBtnSelector=t.submitBtnSelector,this._inactiveBtnClass=t.inactiveBtnClass,this._inputErrorClass=t.inputErrorClass,this._errorClass=t.errorClass,this._formEl=r,this._btnEl=this._formEl.querySelector(this._submitBtnSelector),this._fieldsArr=Array.from(this._formEl.querySelectorAll(this._inputSelector))}var t,r;return t=e,(r=[{key:"_hasInvalidInput",value:function(){return this._fieldsArr.some((function(e){return!e.validity.valid}))}},{key:"_showInputError",value:function(e){var t=this._formEl.querySelector(".".concat(e.name,"-error"));e.classList.add(this._inputErrorClass),t.textContent=e.validationMessage,t.classList.add(this._errorClass)}},{key:"_hideInputError",value:function(e){var t=this._formEl.querySelector(".".concat(e.name,"-error"));e.classList.remove(this._inputErrorClass),t.classList.remove(this._errorClass),t.textContent=""}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e)}},{key:"_toggleBtnState",value:function(){this._hasInvalidInput()?(this._btnEl.classList.add(this._inactiveBtnClass),this._btnEl.disabled=!0):(this._btnEl.classList.remove(this._inactiveBtnClass),this._btnEl.disabled=!1)}},{key:"_setEvtListeners",value:function(){var e=this;this._formEl.addEventListener("submit",(function(e){e.preventDefault()})),this._fieldsArr.forEach((function(t){t.addEventListener("input",(function(t){e._checkInputValidity(t.target),e._toggleBtnState()}))}))}},{key:"enableValidation",value:function(){this._setEvtListeners(),this._toggleBtnState()}},{key:"checkValidation",value:function(){var e=this;this._fieldsArr.forEach((function(t){t.value?e._checkInputValidity(t):e._hideInputError(t)})),this._toggleBtnState()}}])&&n(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function i(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var a=function(){function e(t,r){var n=t.data,o=t.currentOwner,i=t.revealPhoto,a=t.revealRemoveConfirmation,s=t.setLikes;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._id=n._id,this._name=n.name,this._link=n.link,this._owner=n.owner._id,this._likes=n.likes,this._isLiked=!1,this._currentOwner=o,this._revealPhoto=i,this._revealRemoveConfirmation=a,this._setLikes=s,this._cardSelector=r,this._cardPhotoHolder=null,this._cardPhoto=null,this._cardTitle=null,this._cardLikes=null,this._buttonLike=null,this._buttonRemove=null}var t,r;return t=e,(r=[{key:"_removeEl",value:function(e){e.remove(),e=null}},{key:"_setLikeActiveClass",value:function(e){var t=[];e.forEach((function(e){t.push(e._id)})),-1!=t.indexOf(this._currentOwner)?(this._isLiked=!0,this._buttonLike.classList.add("photo-wrap__like-button_active")):(this._isLiked=!1,this._buttonLike.classList.remove("photo-wrap__like-button_active"))}},{key:"_refreshLikesCounter",value:function(e){this._cardLikes.textContent=e}},{key:"_setEventListeners",value:function(){var e=this;this._cardPhotoHolder.addEventListener("click",(function(){e._revealPhoto({name:e._name,link:e._link})})),this._buttonLike.addEventListener("click",(function(){e._setLikes({id:e._id,isLiked:e._isLiked})})),this._owner==this._currentOwner&&this._buttonRemove.addEventListener("click",(function(){e._revealRemoveConfirmation({id:e._id})}))}},{key:"setCardLikes",value:function(e){this._setLikeActiveClass(e),this._refreshLikesCounter(e.length)}},{key:"removeCardEl",value:function(){this._removeEl(this._card)}},{key:"createCardEl",value:function(){return this._card=document.querySelector(this._cardSelector).content.querySelector(".photo-wrap").cloneNode(!0),this._cardPhotoHolder=this._card.querySelector(".photo-wrap__photo-holder"),this._buttonLike=this._card.querySelector(".photo-wrap__like-button"),this._cardLikes=this._card.querySelector(".photo-wrap__likes-counter"),this._cardPhoto=this._card.querySelector(".photo-wrap__picture"),this._cardTitle=this._card.querySelector(".photo-wrap__title"),this._cardTitle.textContent=this._name,this._cardPhoto.src=this._link,this._cardPhoto.alt=this._name,this._owner==this._currentOwner&&(this._buttonRemove=this._card.querySelector(".photo-wrap__remove-button")),this._buttonRemove||this._removeEl(this._card.querySelector(".photo-wrap__remove-button")),this.setCardLikes(this._likes),this._setEventListeners(),this._card}}])&&i(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function s(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var c=function(){function e(t,r){var n=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=n,this._parent=document.querySelector(r)}var t,r;return t=e,(r=[{key:"addItem",value:function(e){this._parent.prepend(e)}},{key:"renderData",value:function(e){var t=this;e.forEach((function(e){t._renderer(e)}))}}])&&s(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function l(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var u=function(){function e(t){var r=t.userTitleSelector,n=t.userSubtitleSelector,o=t.userAvatarSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._userTitle=document.querySelector(r),this._userSubtitle=document.querySelector(n),this._userAvatar=document.querySelector(o)}var t,r;return t=e,(r=[{key:"getUserInfo",value:function(){return{name:this._userTitle.textContent,about:this._userSubtitle.textContent,avatar:this._userAvatar.src}}},{key:"setUserInfo",value:function(e,t){this._userTitle.textContent=e,this._userSubtitle.textContent=t}},{key:"setUserPic",value:function(e){this._userAvatar.src=e}}])&&l(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}(),f={profile:document.forms.editProfile,userpic:document.forms.updateUserpic,cardNew:document.forms.addCard,cardRemove:document.forms.removeCard},h={name:f.profile.elements.name,about:f.profile.elements.about},d={link:f.userpic.elements.link},p=(f.cardNew.elements.name,f.cardNew.elements.link,{targetEditProfile:document.querySelector(".profile__edit-button"),targetUpdateUserpic:document.querySelector(".profile__avatar-button"),targetAddCard:document.querySelector(".profile__add-button")}),_=".card-template",y="modal_visible",v={defaultSelector:".form",inputSelector:".form__field",submitBtnSelector:".form__button",inactiveBtnClass:"form__button_disabled",inputErrorClass:"form__field_type_error",errorClass:"form__error_visible"};function b(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var m=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t),this._handleEscClose=this._handleEscClose.bind(this)}var t,r;return t=e,(r=[{key:"_handleEscClose",value:function(e){"Escape"==e.key&&this.close()}},{key:"setEventListeners",value:function(){var e=this;this._popup.addEventListener("click",(function(t){(t.target.classList.contains("modal__close")||t.target.classList.contains("modal"))&&e.close()}))}},{key:"open",value:function(){this._popup.classList.add(y),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove(y),document.removeEventListener("keydown",this._handleEscClose)}}])&&b(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function k(e){return k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},k(e)}function w(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function E(){return E="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,r){var n=g(e,t);if(n){var o=Object.getOwnPropertyDescriptor(n,t);return o.get?o.get.call(arguments.length<3?e:r):o.value}},E.apply(this,arguments)}function g(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=P(e)););return e}function S(e,t){return S=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},S(e,t)}function O(e,t){if(t&&("object"===k(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function P(e){return P=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},P(e)}var C=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&S(e,t)}(a,e);var t,r,n,o,i=(n=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=P(n);if(o){var r=P(this).constructor;e=Reflect.construct(t,arguments,r)}else e=t.apply(this,arguments);return O(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._modalPhoto=t._popup.querySelector(".modal__photo"),t._modalPhotoCaption=t._popup.querySelector(".modal__photo-caption"),t}return t=a,(r=[{key:"open",value:function(e){this._modalPhotoCaption.textContent=e.name,this._modalPhoto.src=e.link,this._modalPhoto.alt=e.name,E(P(a.prototype),"open",this).call(this)}}])&&w(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),a}(m);function L(e){return L="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},L(e)}function j(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function R(){return R="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,r){var n=U(e,t);if(n){var o=Object.getOwnPropertyDescriptor(n,t);return o.get?o.get.call(arguments.length<3?e:r):o.value}},R.apply(this,arguments)}function U(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=I(e)););return e}function T(e,t){return T=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},T(e,t)}function q(e,t){if(t&&("object"===L(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function I(e){return I=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},I(e)}var A=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&T(e,t)}(a,e);var t,r,n,o,i=(n=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=I(n);if(o){var r=I(this).constructor;e=Reflect.construct(t,arguments,r)}else e=t.apply(this,arguments);return q(this,e)});function a(e,t){var r,n=e.renderer;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(r=i.call(this,t))._renderer=n,r._formEl=r._popup.querySelector(v.defaultSelector),r._fieldsArr=Array.from(r._popup.querySelectorAll(v.inputSelector)),r._btnCaptionEl=r._formEl.querySelector(".form__button-caption"),r._btnPreloaderEl=r._formEl.querySelector(".form__button-loading"),r}return t=a,(r=[{key:"_getInputValues",value:function(){var e={};return this._fieldsArr.forEach((function(t){e[t.name]=t.value})),e}},{key:"_submitForm",value:function(e){e.preventDefault(),this._renderer(this._getInputValues())}},{key:"renderLoading",value:function(e){e?(this._btnCaptionEl.style.display="none",this._btnPreloaderEl.style.display="block",this._btnPreloaderEl.textContent="Сохранение..."):(this._btnCaptionEl.style.display="block",this._btnPreloaderEl.style.display="none",this._btnPreloaderEl.textContent="")}},{key:"setEventListeners",value:function(){var e=this;R(I(a.prototype),"setEventListeners",this).call(this),this._formEl.addEventListener("submit",(function(t){e._submitForm(t),e.renderLoading(!0)}))}},{key:"close",value:function(){R(I(a.prototype),"close",this).call(this),this._formEl.reset()}}])&&j(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),a}(m);function x(e){return x="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},x(e)}function B(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function D(){return D="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,r){var n=V(e,t);if(n){var o=Object.getOwnPropertyDescriptor(n,t);return o.get?o.get.call(arguments.length<3?e:r):o.value}},D.apply(this,arguments)}function V(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=H(e)););return e}function F(e,t){return F=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},F(e,t)}function N(e,t){if(t&&("object"===x(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function H(e){return H=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},H(e)}var J,M=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&F(e,t)}(a,e);var t,r,n,o,i=(n=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=H(n);if(o){var r=H(this).constructor;e=Reflect.construct(t,arguments,r)}else e=t.apply(this,arguments);return N(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._formEl=t._popup.querySelector(v.defaultSelector),t}return t=a,(r=[{key:"submitForm",value:function(e){this._formRenderer=e}},{key:"setEventListeners",value:function(){var e=this;D(H(a.prototype),"setEventListeners",this).call(this),this._formEl.addEventListener("submit",(function(t){t.preventDefault(),e._formRenderer()}))}}])&&B(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),a}(m);function z(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var $=new r({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-43",headers:{authorization:"bee12215-09da-441f-9f38-f7f695bca43f","Content-Type":"application/json"}}),G={profileFormValidator:new o(v,f.profile),userpicFormValidator:new o(v,f.userpic),cardFormValidator:new o(v,f.cardNew)};function K(e,t,r){var n=new a({data:e,currentOwner:t,revealPhoto:function(e){Z.open(e)},revealRemoveConfirmation:function(e){Y.open(),Y.submitForm((function(){$.removeCard(e).then((function(e){n.removeCardEl(),Y.close()})).catch((function(e){console.log(e)}))}))},setLikes:function(e){e.isLiked?$.unlikeCard(e).then((function(e){n.setCardLikes(e.likes)})).catch((function(e){console.log(e)})):$.likeCard(e).then((function(e){n.setCardLikes(e.likes)})).catch((function(e){console.log(e)}))}},r);return n.createCardEl()}var Q=new u({userTitleSelector:".profile__title",userSubtitleSelector:".profile__subtitle",userAvatarSelector:".profile__avatar"}),W=new c({renderer:function(e){W.addItem(K(e,J,_))}},".elements");Promise.all([$.getUserData(),$.getInitialCards()]).then((function(e){var t,r,n=(r=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,i=[],a=!0,s=!1;try{for(r=r.call(e);!(a=(n=r.next()).done)&&(i.push(n.value),!t||i.length!==t);a=!0);}catch(e){s=!0,o=e}finally{try{a||null==r.return||r.return()}finally{if(s)throw o}}return i}}(t,r)||function(e,t){if(e){if("string"==typeof e)return z(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?z(e,t):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=n[0],i=n[1];J=o._id,Q.setUserPic(o.avatar),Q.setUserInfo(o.name,o.about),W.renderData(i)})).catch((function(e){console.log(e)}));var X=new A({renderer:function(e){$.addCard(e).then((function(e){W.addItem(K(e,J,_)),X.close()})).catch((function(e){console.log(e)})).finally((function(){X.renderLoading(!1)}))}},".modal_target_add-card");X.setEventListeners(),p.targetAddCard.addEventListener("click",(function(){G.cardFormValidator.checkValidation(),X.open()}));var Y=new M(".modal_target_remove-card");Y.setEventListeners();var Z=new C(".modal_target_reveal-photo");Z.setEventListeners();var ee=new A({renderer:function(e){$.setUserData(e).then((function(e){Q.setUserInfo(e.name,e.about),ee.close()})).catch((function(e){console.log(e)})).finally((function(){ee.renderLoading(!1)}))}},".modal_target_edit-profile");ee.setEventListeners(),p.targetEditProfile.addEventListener("click",(function(){var e=Q.getUserInfo();h.name.value=e.name,h.about.value=e.about,G.profileFormValidator.checkValidation(),ee.open()}));var te=new A({renderer:function(e){$.setUserPic(e).then((function(e){Q.setUserPic(e.avatar),te.close()})).catch((function(e){console.log(e)})).finally((function(){te.renderLoading(!1)}))}},".modal_target_update-userpic");te.setEventListeners(),p.targetUpdateUserpic.addEventListener("click",(function(){var e=Q.getUserInfo();d.link.value=e.avatar,G.userpicFormValidator.checkValidation(),te.open()})),Object.values(G).forEach((function(e){e.enableValidation()})),e.p,e.p,e.p,e.p,e.p,e.p,e.p})();