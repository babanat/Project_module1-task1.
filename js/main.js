import { generatePhotos } from "./photo.js";

const picturesContainer = document.querySelector(".pictures");
const pictureTemplate = document.querySelector("#picture")
.content.querySelector(".picture");

function renderPhoto(photo) {
  const photoElement = pictureTemplate.cloneNode(true);

  photoElement.querySelector(".picture__img").src = photo.url;
  photoElement.querySelector(".picture__likes").textContent = photo.likes;
  photoElement.querySelector(".picture__comments").textContent =
    photo.comments.length;

  return photoElement;
}

function renderPhotos(photos) {
  const fragment = document.createDocumentFragment();
  const photoElements = photos.map((photo) => renderPhoto(photo));
  photoElements.forEach((photoElement) => {
    fragment.appendChild(photoElement);
  });
  picturesContainer.appendChild(fragment);
}

const photos = generatePhotos(25);
renderPhotos(photos);