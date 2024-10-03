// scale.js

const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const DEFAULT_SCALE = 100;

const scaleValueInput = document.querySelector('.scale__control--value');
const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const imagePreview = document.querySelector('.img-upload__preview img');

let currentScale = DEFAULT_SCALE;

function updateScale(newScale) {
  currentScale = newScale;
  scaleValueInput.value = `${newScale}%`;
  imagePreview.style.transform = `scale(${newScale / 100})`;
}

function onSmallerButtonClick() {
  if (currentScale > SCALE_MIN) {
    updateScale(currentScale - SCALE_STEP);
  }
}

function onBiggerButtonClick() {
  if (currentScale < SCALE_MAX) {
    updateScale(currentScale + SCALE_STEP);
  }
}

function resetScale() {
  updateScale(DEFAULT_SCALE);
}

smallerButton.addEventListener('click', onSmallerButtonClick);
biggerButton.addEventListener('click', onBiggerButtonClick);

export { resetScale };  // сброса масшмаба
