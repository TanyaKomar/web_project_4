// Initial Cards
const initialCards = [{
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
},
{
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
},
{
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
},
{
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
},
{
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
},
{
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
}
];
// Create New Card 
const cardPopup = document.querySelector(".popup.popup_type_card");
const popupCardImage = cardPopup.querySelector(".popup__image");
const popupCardTitle = cardPopup.querySelector(".popup__card-title");
const cardTemplate = document.querySelector("#card-template").content;
const gallery = document.querySelector(".gallery");
// Show Card Popup
const addNewCardButton = document.querySelector(".profile__btn-add");
const addNewCardPopup = document.querySelector(".popup.popup_type_add");
const cardForm = document.querySelector(".popup_type_add .popup__form");
const cardTitleInput = document.querySelector(".popup_input_title");
const cardLinkInput = document.querySelector(".popup_input_link");
// Edit Profile
const editProfileButton = document.querySelector(".profile__btn-edit");
const editProfilePopup = document.querySelector(".popup.popup_type_edit");
const profileForm = document.querySelector(".popup_type_edit .popup__form");
const profileNameInput = document.querySelector(".popup_input_name");
const profileJobInput = document.querySelector(".popup_input_job");
const nameProfile = document.querySelector(".profile__name");
const jobProfile = document.querySelector(".profile__job");

const likeCard = (evt) => {
    evt.target.classList.toggle("card__btn-like_active");
};
const deleteCard = (evt) => {
    const cardItem = evt.target.closest(".card");
    cardItem.remove();
};
const togglePopup = (modal) => {
    modal.classList.toggle("popup_open");
};
const closeButtons = document.querySelectorAll(".popup__close");
closeButtons.forEach((closeButton) => {
    const popup =  closeButton.closest(".popup");
    closeButton.addEventListener("click", () => togglePopup(popup));
});

const createCard = (link, title) => {
    const newCard = cardTemplate.cloneNode(true);
    const cardImage = newCard.querySelector(".card__image");
    const cardTitle = newCard.querySelector(".card__title");
    cardImage.src = link;
    cardImage.alt = title;
    cardTitle.textContent = title;

    // Like New Card
    const likeButton = newCard.querySelector(".card__btn-like");
    likeButton.addEventListener("click", likeCard);

    // Delete New Card
    const deleteButton = newCard.querySelector(".card__btn-delete");
    deleteButton.addEventListener("click", deleteCard);

    // Open Card Popup
    cardImage.addEventListener("click", ()=> {
        popupCardImage.src = link;
        popupCardImage.alt = title;
        popupCardTitle.textContent = title;
        
        togglePopup(cardPopup);
    });
    return newCard;
}
// ******************************************************************************************
// Append Initial Cards
initialCards.forEach((initCard) => {
const card = createCard(initCard.link, initCard.name);
gallery.append(card);
});
// ******************************************************************************************
//Open Creating Card Popup
addNewCardButton.addEventListener("click", () => {
    cardForm.reset();
    togglePopup(addNewCardPopup);
});
// Create New Card
cardForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const card = createCard(cardLinkInput.value, cardTitleInput.value);
    gallery.prepend(card);

    togglePopup(addNewCardPopup);
});
//************************************************************************
//Open Edit Profile Popup
editProfileButton.addEventListener("click", () => {
    profileNameInput.value = nameProfile.textContent;
    profileJobInput.value = jobProfile.textContent;
    togglePopup(editProfilePopup);
});
//Save New Profile
profileForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    // Update profile
    nameProfile.textContent = profileNameInput.value;
    jobProfile.textContent = profileJobInput.value;

    togglePopup(editProfilePopup);
});