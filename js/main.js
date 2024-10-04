import { generatePhotos } from './photo.js';
import { showBigPicture } from './bigPicture.js';
import { addCommentTemplate } from './template.js';
import { allValidation, closeButton } from './form.js';
import { resetScale } from './scale.js'; 
import { init } from './imageEffects.js';


const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

addCommentTemplate();

function renderPhoto(photo) {
  const photoElement = pictureTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

  photoElement.addEventListener('click', () => showBigPicture(photo));
  return photoElement;
}

function renderPhotos(photos) {
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const photoElement = renderPhoto(photo);
    fragment.appendChild(photoElement);
  });

  picturesContainer.appendChild(fragment);
}

const photos = generatePhotos(25);
renderPhotos(photos);

const formElement = document.querySelector('.img-upload__form');
formElement.addEventListener('input', allValidation);

closeButton.addEventListener('click', () => {
  formElement.reset();
  resetScale();
  init(); // Сбрасываем эффект при закрытии формы
});

