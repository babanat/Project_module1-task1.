const scale_step = 25;
const scale_min = 25;
const scale_max = 100;
const default_scale = 100;

const scaleValueInput = document.querySelector('.scale__control--value');
const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const imagePreview = document.querySelector('.img-upload__preview img');

let currentScale = default_scale;

function updateScale(newScale) {
  currentScale = newScale;
  scaleValueInput.value = `${newScale}%`;
  imagePreview.style.transform = `scale(${newScale / 100})`;
}

function onSmallerButtonClick() {
  if (currentScale > scale_min) {
    updateScale(currentScale - scale_step);
  }
}

function onBiggerButtonClick() {
  if (currentScale < scale_max) {
    updateScale(currentScale + scale_step);
  }
}

function resetScale() {
  updateScale(default_scale);
}

smallerButton.addEventListener('click', onSmallerButtonClick);
biggerButton.addEventListener('click', onBiggerButtonClick);

export { resetScale };  // сброса масшмаба
