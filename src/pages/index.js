import "./index.css";
import {
  resetValidation,
  enableValidation,
  settings,
  disableButton,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";

const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "5-0 grind",
    link: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.jpg",
  },
  {
    name: "Mise en place",
    link: "https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.jpg",
  },
  {
    name: "Rock Concert",
    link: "https://images.unsplash.com/photo-1692271931628-adc2b16670dd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.jpg",
  },
  {
    name: "Dungeons and Dragons session",
    link: "https://images.unsplash.com/photo-1549056572-75914d5d5fd4?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.jpg",
  },
  {
    name: "Gaming PC setup",
    link: "https://images.unsplash.com/photo-1626218174358-7769486c4b79?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.jpg",
  },
  {
    name: "Mountain Hiking",
    link: "https://images.unsplash.com/photo-1547203928-d8c7cc83e56f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.jpg",
  },
];

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

// Card queries
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

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
    .catch(console.error);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const cardElement = getCardElement({
    name: newPostCaptionInput.value,
    link: newPostImageLinkInput.value,
  });
  cardsList.prepend(cardElement);
  const newPostSubmitBtn = newPostModal.querySelector(".modal__btn");
  closeModal(newPostModal);
  evt.target.reset();
  disableButton(newPostSubmitBtn, settings);
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  api
    .editAvatarImg({ avatar: avatarSrcInput.value })
    .then((data) => {
      avatarImgEl.src = data.avatar;
    })
    .catch(console.error);
  closeModal(avatarEditForm);
}

//Instantiated API Class
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "46747406-c2b0-48b7-b5f8-07dbde211dbd",
    "Content-Type": "application/json",
  },
});

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

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  const cardLikeBtnEl = cardEl.querySelector(".card__like-btn");
  cardLikeBtnEl.addEventListener("click", () => {
    cardLikeBtnEl.classList.toggle("card__like-btn_active");
  });

  const cardDeleteBtnEl = cardEl.querySelector(".card__delete-btn");
  cardDeleteBtnEl.addEventListener("click", () => {
    openModal(deleteModal);
  });

  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewCaptionEl.textContent = data.name;
    openModal(previewModal);
  });

  return cardEl;
}

profileEditBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  const inputList = Array.from(
    editProfileModal.querySelectorAll(settings.inputSelector)
  );
  resetValidation(editProfileModal, inputList, settings);
  openModal(editProfileModal);
});

editFormEl.addEventListener("submit", handleEditProfileSubmit);
addCardFormEl.addEventListener("submit", handleAddCardSubmit);
avatarEditForm.addEventListener("submit", handleAvatarSubmit);

enableValidation(settings);
