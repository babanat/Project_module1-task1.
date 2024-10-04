import { closeButton } from './form.js';
const image = document.querySelector('.img-upload__preview img');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectRadios = document.querySelectorAll('.effects__radio');


const effects = {
  'none': {
    filter: '',
    range: [0, 100],
    start: 100,
    step: 1, 
    unit: ''
  },
  'chrome': {
    filter: 'grayscale',
    range: [0, 1],
    start: 1,
    step: 0.1,
    unit: ''
  }, 
  'sepia': {
    filter: 'sepia',
    range: [0, 1],
    start: 1,
    step: 0.1,
    unit: ''
  },
  'marvin': {
    filter: 'invert',
    range: [0, 100],
    start: 100,
    step: 1,
    unit: '%'
  },
  'phobos': {
    filter: 'blur',
    range: [0, 3],
    start: 3,
    step: 0.1,
    unit: 'px'
  },
  'heat': {
    filter: 'brightness',
    range: [1, 3],
    start: 3,
    step: 0.1,
    unit: ''
  }
};
// Функция для инициализации слайдера
function initSlider() {
    // Проверяем, был ли уже инициализирован слайдер
    if (sliderElement.noUiSlider) {
      // Уничтожаем предыдущий слайдер, если он уже существует
      sliderElement.noUiSlider.destroy();
    }
    
    // Инициализируем новый слайдер
    noUiSlider.create(sliderElement, {
      start: 100,
      tooltips: true,
      range: {
        'min': 0,
        'max': 100
      },
      step: 1,
      format: {
        to: function (value) {
          return parseFloat(value).toFixed(2);
        },
        from: function (value) {
          return parseFloat(value);
        }
      }
    });
  }
  
// // Функция для инициализации слайдера
// function initSlider() {
//   noUiSlider.create(sliderElement, {
//     start: 100,
//     tooltips: true,
//     range: {
//       'min': 0,
//       'max': 100
//     },
//     step: 1,
//     format: {
//       to: function (value) {
//         return parseFloat(value).toFixed(2);
//       },
//       from: function (value) {
//         return parseFloat(value);
//       }
//     }
//   });
// }

function updateSliderOptions(effect) {
  const effectSettings = effects[effect];
  sliderElement.noUiSlider.updateOptions({
    range: {
      'min': effectSettings.range[0],
      'max': effectSettings.range[1]
    },
    start: effectSettings.start,
    step: effectSettings.step
  });
}


function updateImageFilter(effect, value) {
  const effectSettings = effects[effect];
  effectLevelValue.value = value; 
  image.style.filter = `${effectSettings.filter}(${value}${effectSettings.unit})`; 
}


function applyEffect(effect) {
  if (effect === 'none') {
    sliderElement.classList.add('hidden'); 
    image.style.filter = ''; 
    effectLevelValue.value = ''; 
  } else {
    sliderElement.classList.remove('hidden'); 
    updateSliderOptions(effect);

  
    sliderElement.noUiSlider.on('update', function (values, handle) {
      const value = values[handle];
      updateImageFilter(effect, value);
    });
  }
}


function handleEffectChange() {
  effectRadios.forEach((radio) => {
    radio.addEventListener('change', function () {
      const selectedEffect = this.value;
      applyEffect(selectedEffect);
    });
  });
}

function resetEffects() {
  applyEffect('none'); 
}

function init() {
  initSlider(); 
  handleEffectChange(); 
  applyEffect('none'); 

  
  closeButton.addEventListener('click', resetEffects);
}

init(); // Запуск
export { init };

