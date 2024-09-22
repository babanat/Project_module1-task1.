import { descriptionsPhoto, messagesComment, minLikes, maxLikes, maxComments, maxAvatars } from './constants.js';
import { randomNumber } from './randomFunction.js';

export function generateId(index) {
  return index + 1;
}

export function generateUrl(index) {
  return `photos/${index + 1}.jpg`;
}

export function generateDescription() {
  return descriptionsPhoto[randomNumber(0, descriptionsPhoto.length - 1)];
}

export function generateLikes() {
  return randomNumber(minLikes, maxLikes);
}

export function generateCommentId() {
  return randomNumber(1, 1000);
}

export function generateAvatar() {
  return `img/avatar-${randomNumber(1, maxAvatars)}.svg`;
}

export function generateMessage() {
  return messagesComment[randomNumber(0, messagesComment.length - 1)];
}

export function createComment(index) {
    return {
      id: generateCommentId(),
      avatar: generateAvatar(),
      message: generateMessage(),
      name: `User ${index + 1}`,
    };
  }
  
  export function generateComments() {
    const commentsCount = randomNumber(1, maxComments);
    return Array.from({ length: commentsCount }, (item, index) => createComment(index));
  }

export function createPhoto(index) {
  return {
    id: generateId(index),
    url: generateUrl(index),
    description: generateDescription(),
    likes: generateLikes(),
    comments: generateComments(),
  };
}

export function generatePhotos(count = 25) {
    return Array.from({ length: count }, (item, index) => createPhoto(index));
  }