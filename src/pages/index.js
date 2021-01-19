import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Card from "../components/Card.js";
import { FormValidator, validationSettings } from "../components/FormValidator.js";
import { initialCards } from "../utils/constants.js"
import UserInfo from "../components/UserInfo.js";
import "./index.css";

const gallerySelector = ".gallery";
const popupSelector = ".popup.popup_type_card";
const popupEditSelector = ".popup.popup_type_edit"
const editProfileButton = document.querySelector(".profile__btn-edit");
const profileForm = document.querySelector(".popup_type_edit .popup__form");
const profileNameInput = document.querySelector("#name-input");
const profileJobInput = document.querySelector("#job-input");

const addNewCardButton = document.querySelector(".profile__btn-add");
const cardForm = document.querySelector(".popup_type_add .popup__form");
const popupAddCardSelector = ".popup.popup_type_add";

const userInfo = new UserInfo({ nameSelector: ".profile__name", jobSelector: ".profile__job" });
const popupWithImage = new PopupWithImage(popupSelector);
popupWithImage.setEventListeners();

const popupEditForm = new PopupWithForm(popupEditSelector, (formInputs) => {
  userInfo.setUserInfo(formInputs.name, formInputs.job);
});
popupEditForm.setEventListeners();

const poopupCardForm = new PopupWithForm(popupAddCardSelector, (formInputs) => {
  const card = new Card({
    link: formInputs.link,
    title: formInputs.title
  }, "#card-template", (link, title) => {
    popupWithImage.open(link, title);
  });
  const cardElement = card.generateCard();
  cardList.prependItem(cardElement);
})
poopupCardForm.setEventListeners();

const profileFormValidator = new FormValidator(validationSettings, profileForm);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(validationSettings, cardForm);
cardFormValidator.enableValidation();

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, "#card-template", (link, title) => {
      popupWithImage.open(link, title);
    });

    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, gallerySelector);

cardList.renderItems();

editProfileButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  evt.stopPropagation();
  const profileInfo = userInfo.getUserInfo();
  profileNameInput.value = profileInfo.name;
  profileJobInput.value = profileInfo.job;
  profileFormValidator.resetFormValidation(false);
  popupEditForm.open();
});

addNewCardButton.addEventListener("click", (evt) => {
  cardForm.reset();
  evt.preventDefault()
  evt.stopPropagation()
  cardFormValidator.resetFormValidation(true);
  poopupCardForm.open();
});