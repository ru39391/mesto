export const modals = document.querySelectorAll('.modal');
export const modalTargetEditProfile = document.querySelector('.modal_target_edit-profile');
export const modalTargetPhoto = document.querySelector('.modal_target_reveal-photo');
export const modalTargetAddCard = document.querySelector('.modal_target_add-card');
export const modalPhoto = modalTargetPhoto.querySelector('.modal__photo');
export const modalCaption = modalTargetPhoto.querySelector('.modal__photo-caption');

function hideModalByEsc(e) {
  if(e.key == 'Escape') {
    const modal = document.querySelector('.modal_visible');
    hideModal(modal);
  };
};

export function showModal(modal) {
  modal.classList.add('modal_visible');
  document.addEventListener('keydown', hideModalByEsc);
}

export function hideModal(modal) {
  modal.classList.remove('modal_visible');
  document.removeEventListener('keydown', hideModalByEsc);
}
