import { commentsPerLoad } from './constants.js';

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImg = bigPictureElement.querySelector('.big-picture__img img');
const likesCount = bigPictureElement.querySelector('.likes-count');
const commentsCount = bigPictureElement.querySelector('.comments-count');
const commentsContainer = bigPictureElement.querySelector('.social__comments');
const commentsCountContainer = bigPictureElement.querySelector('.social__comment-count');
const descriptionElement = bigPictureElement.querySelector('.social__caption');
const bodyElement = document.querySelector('body');
const closeButton = bigPictureElement.querySelector('.big-picture__cancel');
const loadMoreButton = bigPictureElement.querySelector('.comments-loader');
let currentCommentIndex = 0;  // Индекс первого неотображённого комментария
let commentsData = [];        // Массив комментариев фотографии

// Функция для показа большого изображения
function showBigPicture(photo) {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  bigPictureImg.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  descriptionElement.textContent = photo.description;

  // Инициализация комментариев
  currentCommentIndex = 0;
  commentsData = photo.comments;

  commentsContainer.innerHTML = '';  // Очищаем старые комментарии
  loadMoreComments();  // Загружаем первые 5 комментариев
  checkCommentsCount(commentsData); // Добавляем проверку комментариев при открытии
  toggleCommentLoadButton();  // Проверяем, нужно ли показывать кнопку "Загрузить ещё"

  document.addEventListener('keydown', onDocumentKeyDown);
}

// Функция для загрузки комментариев по 5 штук
function loadMoreComments() {
  const commentsToLoad = commentsData.slice(currentCommentIndex, currentCommentIndex + commentsPerLoad);
  currentCommentIndex += commentsPerLoad;  // Увеличиваем индекс для следующей порции
  renderComments(commentsToLoad);
   // Обновляем состояние строки с количеством комментариев
   checkCommentsCount(commentsData);
   toggleCommentLoadButton();  // Обновляем состояние кнопки загрузки комментариев
}

// Функция для управления кнопкой "Загрузить ещё"
function toggleCommentLoadButton() {
  if (currentCommentIndex >= commentsData.length) {
    loadMoreButton.classList.add('hidden');  // Скрыть кнопку, если все комментарии загружены
  } else {
    loadMoreButton.classList.remove('hidden');  // Показать кнопку, если есть ещё комментарии
  }
}

// Функция для рендеринга комментариев
function renderComments(comments) {
  const fragment = document.createDocumentFragment();
  comments.forEach(comment => {
    const commentElement = createCommentElement(comment);
    fragment.appendChild(commentElement);
  });
  commentsContainer.appendChild(fragment);
}

// Функция для создания DOM-элемента комментария
function createCommentElement(comment) {
  const commentTemplate = document.querySelector('#comment-template').content.querySelector('.social__comment');
  const commentElement = commentTemplate.cloneNode(true);

  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;

  return commentElement;
}

// Функция для закрытия большого изображения
function closeBigPicture() {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
}

// Обработчик закрытия окна по клавише Esc
function onDocumentKeyDown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}

function checkCommentsCount(comments) {
  const totalCommentsCount = comments.length;
  const visibleCommentsCount = Math.min(currentCommentIndex, totalCommentsCount);

  if (totalCommentsCount <= 5) {
    commentsCountContainer.classList.add('hidden');
  } else {
    commentsCountContainer.classList.remove('hidden');
    commentsCountContainer.textContent = `${visibleCommentsCount} из ${totalCommentsCount} комментариев`;
  }
}

// Обработчик на кнопку "Загрузить ещё"
loadMoreButton.addEventListener('click', loadMoreComments);

// Обработчик на кнопку закрытия большого фото
closeButton.addEventListener('click', closeBigPicture);

export { showBigPicture };





