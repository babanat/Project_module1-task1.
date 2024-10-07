import { renderPhotos, picturesContainer, photos } from "./main.js";

const imgFilters = document.querySelector(".img-filters");
const buttonFilterDefault = document.querySelector("#filter-default");
const buttonFilterRandom = document.querySelector("#filter-random");
const buttonFilterDiscussed = document.querySelector("#filter-discussed");

const clearPhotos = () => {
  picturesContainer.innerHTML = "";
};

const showFilters = () => {
  imgFilters.classList.remove("img-filters--inactive");
};

const filterButtons = [
  {
    id: buttonFilterDefault,
    handler: () => {
      clearPhotos();
      renderPhotos(photos);
    },
  },
  {
    id: buttonFilterRandom,
    handler: () => {
      clearPhotos();
      const randomPhotos = [...photos]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);
      renderPhotos(randomPhotos);
    },
  },
  {
    id: buttonFilterDiscussed,
    handler: () => {
      clearPhotos();
      const discussedPhotos = [...photos].sort(
        (a, b) => b.comments.length - a.comments.length
      );
      renderPhotos(discussedPhotos);
    },
  },
];

// Функция "debounce" для устранения дребезга
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

const initLoadFilters = () => {
  filterButtons.forEach(({ id, handler }) => {
    id.addEventListener("click", debounce(handler, 600));
  });
};

export { initLoadFilters, showFilters };
