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
let currentCommentIndex = 0;  
let commentsData = [];       

function showBigPicture(photo) {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  bigPictureImg.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  descriptionElement.textContent = photo.description;

  currentCommentIndex = 0;
  commentsData = photo.comments;

  commentsContainer.innerHTML = '';  
  loadMoreComments();  
  checkCommentsCount(commentsData); 
  toggleCommentLoadButton();  

  document.addEventListener('keydown', onDocumentKeyDown);
}


function loadMoreComments() {
  const commentsToLoad = commentsData.slice(currentCommentIndex, currentCommentIndex + commentsPerLoad);
  currentCommentIndex += commentsPerLoad;  
  renderComments(commentsToLoad);
   
   checkCommentsCount(commentsData);
   toggleCommentLoadButton();  
}


function toggleCommentLoadButton() {
  if (currentCommentIndex >= commentsData.length) {
    loadMoreButton.classList.add('hidden');  
  } else {
    loadMoreButton.classList.remove('hidden');  
  }
}


function renderComments(comments) {
  const fragment = document.createDocumentFragment();
  comments.forEach(comment => {
    const commentElement = createCommentElement(comment);
    fragment.appendChild(commentElement);
  });
  commentsContainer.appendChild(fragment);
}


function createCommentElement(comment) {
  const commentTemplate = document.querySelector('#comment-template').content.querySelector('.social__comment');
  const commentElement = commentTemplate.cloneNode(true);

  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;

  return commentElement;
}


function closeBigPicture() {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
}

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

loadMoreButton.addEventListener('click', loadMoreComments);

closeButton.addEventListener('click', closeBigPicture);

export { showBigPicture };

