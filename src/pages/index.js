// Imports
import "./index.css";
import {
  resetValidation,
  enableValidation,
  settings,
  disableButton,
} from "../scripts/validation.js";
import { setBtnText } from "../utils/helpers.js";
import Api from "../utils/Api.js";

//Instantiated API Class
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "46747406-c2b0-48b7-b5f8-07dbde211dbd",
    "Content-Type": "application/json",
  },
});

// Profile Edit queries
const profileEditBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editFormEl = editProfileModal.querySelector(".modal__form");
const modalSubmitBtn = document.querySelector(".modal__btn");
const profileNameEl = document.querySelector(".profile__title");
const profileDescriptionEl = document.querySelector(".profile__description");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

// New Post queries
const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const addCardFormEl = newPostModal.querySelector(".modal__form");
const newPostCaptionInput = newPostModal.querySelector("#image-caption-input");
const newPostImageLinkInput = newPostModal.querySelector("#image-link-input");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

// Avatar queries
const avatarImgEl = document.querySelector(".profile__avatar");
const avatarEditForm = document.querySelector("#avatar-modal");
const avatarModalBtn = document.querySelector(".profile__avatar-btn");
const avatarModalCloseBtn = avatarEditForm.querySelector(".modal__close-btn");
const avatarModalSubmitBtn = avatarEditForm.querySelector(".modal__btn");
const avatarSrcInput = avatarEditForm.querySelector(".modal__input");

// Image Preview queries
const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewImageEl = previewModal.querySelector(".modal__image");
const previewCaptionEl = previewModal.querySelector(".modal__caption");

// Delete Modal queries
const deleteModal = document.querySelector("#delete-modal");
const deleteModalCloseBtn = deleteModal.querySelector(".modal__close-btn");
const deleteForm = deleteModal.querySelector(".modal__form");
const deleteCancelBtn = deleteForm.querySelector(
  ".modal__btn_type_cancel-delete"
);

// Card queries
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

// Card Variables
let selectedCard, selectedCardId;

// Open/Close Modal
function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscape);
  modal.addEventListener("click", handleOverlayClick);
}

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

avatarModalBtn.addEventListener("click", () => {
  openModal(avatarEditForm);
});

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscape);
  modal.removeEventListener("click", handleOverlayClick);
}

avatarModalCloseBtn.addEventListener("click", () => {
  closeModal(avatarEditForm);
});

deleteModalCloseBtn.addEventListener("click", () => {
  closeModal(deleteModal);
});

previewModalCloseBtn.addEventListener("click", function () {
  closeModal(previewModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

deleteCancelBtn.addEventListener("click", function () {
  closeModal(deleteModal);
});

// Handlers
function handleEscape(evt) {
  if (evt.key === "Escape") {
    const opnedModal = document.querySelector(".modal_is-opened");
    closeModal(opnedModal);
  }
}

function handleOverlayClick(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setBtnText(submitBtn, true, "Save", "Saving...");
  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((data) => {
      profileNameEl.textContent = data.name;
      profileDescriptionEl.textContent = data.about;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      setBtnText(submitBtn, false, "Save", "Saving...");
    });
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setBtnText(submitBtn, true, "Save", "Saving...");
  api
    .addNewCard({
      name: newPostCaptionInput.value,
      link: newPostImageLinkInput.value,
    })
    .then((newCard) => {
      cardsList.prepend(getCardElement(newCard)),
        closeModal(newPostModal),
        evt.target.reset(),
        disableButton(submitBtn, settings);
    })
    .catch(console.error)
    .finally(setBtnText(submitBtn, false, "Save", "Saving..."));
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setBtnText(submitBtn, true, "Save", "Saving...");
  api
    .editAvatarImg({ avatar: avatarSrcInput.value })
    .then((data) => {
      avatarImgEl.src = data.avatar;
      closeModal(avatarEditForm);
    })
    .catch(console.error)
    .finally(() => {
      setBtnText(submitBtn, false, "Save", "Saving...");
    });
}

function handleDeleteCard(cardEl, cardId) {
  selectedCard = cardEl;
  selectedCardId = cardId;
  openModal(deleteModal);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setBtnText(submitBtn, true, "Delete", "Deleting...");
  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      setBtnText(submitBtn, false, "Delete", "Deleting...");
    });
}

function handleLike(evt, data) {
  const isLiked = data.isLiked;
  api
    .handleLikeStatus(data._id, isLiked)
    .then((updatedCard) => {
      data.isLiked = updatedCard.isLiked;
      evt.target.classList.toggle("card__like-btn_active");
    })
    .catch(console.error);
}

api
  .getAppInfo()
  .then(([cards, users]) => {
    cards.forEach(function (item) {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });
    profileNameEl.innerText = users.name;
    profileDescriptionEl.innerText = users.about;
    avatarImgEl.src = users.avatar;
  })
  .catch((err) => {
    console.error(err);
  });

function getCardElement(data) {
  let cardEl = cardTemplate.cloneNode(true);
  const cardTitleEl = cardEl.querySelector(".card__title");
  const cardImageEl = cardEl.querySelector(".card__image");
  const cardDeleteBtnEl = cardEl.querySelector(".card__delete-btn");
  const cardLikeBtnEl = cardEl.querySelector(".card__like-btn");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  cardLikeBtnEl.addEventListener("click", (evt) => {
    handleLike(evt, data);
  });

  cardDeleteBtnEl.addEventListener("click", (evt) => {
    handleDeleteCard(cardEl, data._id);
  });

  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewCaptionEl.textContent = data.name;
    openModal(previewModal);
  });

  return cardEl;
}

// Event Listners
profileEditBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  const inputList = Array.from(
    editProfileModal.querySelectorAll(settings.inputSelector)
  );
  resetValidation(editProfileModal, inputList, settings);
  openModal(editProfileModal);
});

deleteForm.addEventListener("submit", handleDeleteSubmit);
editFormEl.addEventListener("submit", handleEditProfileSubmit);
addCardFormEl.addEventListener("submit", handleAddCardSubmit);
avatarEditForm.addEventListener("submit", handleAvatarSubmit);

enableValidation(settings);
