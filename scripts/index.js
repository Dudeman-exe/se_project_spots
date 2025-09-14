const initialCards = [
  {
    name: "5-0 grind",
    link: "https://unsplash.com/photos/person-doing-kick-flip-trick-eK_aInAXydw",
  },
  {
    name: "Mise en place",
    link: "https://unsplash.com/photos/person-slicing-vegetable-uB7q7aipU2o",
  },
  {
    name: "Rock Concert",
    link: "https://unsplash.com/photos/a-crowd-of-people-at-a-concert-with-their-hands-in-the-air--Ma-aFuivjs",
  },
  {
    name: "Dungeons and Dragons session",
    link: "https://unsplash.com/photos/red-dragon-action-figure-on-table-X-A-LJVAhzk",
  },
  {
    name: "Gaming PC setup",
    link: "https://unsplash.com/photos/black-flat-screen-computer-monitor-turned-on-beside-black-computer-keyboard-xxL1FavYOh0",
  },
  {
    name: "Mountain Hiking",
    link: "https://unsplash.com/photos/person-wearing-cap-across-mountains-5ErbZB4VY3M",
  },
];

const profileEditBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");

const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const addCardForm = newPostModal.querySelector(".modal__form");
const newPostCaptionInput = newPostModal.querySelector("#image-caption-input");
const newPostImageLinkInput = newPostModal.querySelector("#image-link-input");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const profileNameEl = document.querySelector(".profile__title");
const profileDescriptionEl = document.querySelector(".profile__description");

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

profileEditBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  console.log("submitting");
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  closeModal(editProfileModal);
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  console.log("submitting");
  console.log(newPostImageLinkInput.value, newPostCaptionInput.value);
  closeModal(newPostModal);
}

initialCards.forEach(function (item) {
  console.log(item.name);
  console.log(item.link);
});

addCardForm.addEventListener("submit", handleAddCardSubmit);
