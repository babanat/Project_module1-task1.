// Генерация уникальных идентификаторов
function generateId(index) {
  return index + 1;
}

// Функция для генерации уникального URL для каждой фотографии
function generateUrl(index) {
  return `photos/${index + 1}.jpg`;
}

// Функция для генерации случайного описания фотографии
function generateDescription() {
  const descriptions = [
    "Момент который не забудешь.",
    "Крутые воспоминания.",
    "Новый iphone делает ветер)).",
    "Здесь был лучший момент!",
    "Это Чудо...))",
    "Моя любимая фотка.",
    "Настоящая магия кадра.",
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

// Функция для генерации случайного количества лайков (от 15 до 200)
function generateLikes(min = 15, max = 200) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция для генерации случайного ID комментария
function generateCommentId(min = 1, max = 1000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция для генерации случайного аватара
function generateAvatar(maxAvatars = 6) {
  const avatarNumber = Math.floor(Math.random() * maxAvatars) + 1;
  return `img/avatar-${avatarNumber}.svg`;
}

// Функция для генерации случайного текста комментария
function generateMessage() {
  const messages = [
    "Все отлично!",
    "В общем, все неплохо. Но не все.",
    "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
    "Моя бабушка случайно чихнула с фотоаппаратом в руках и у нее получилась фотография лучше.",
    "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота, и у меня получилась фотография лучше.",
    "Лица людей на фотке перекошены, словно их избивают. Как можно поймать такой неудачный момент?",
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

// Функция для генерации комментариев
function generateComments() {
  const commentsCount = Math.floor(Math.random() * 3) + 1; // Определяем количество комментариев (от 1 до 3)
  const comments = [];
  for (let i = 0; i < commentsCount; i++) {
    comments.push({
      id: generateCommentId(), // Уникальный ID для каждого комментария
      avatar: generateAvatar(),// Генерация пути к аватару
      message: generateMessage(),// Генерация текста комментария
      name: `User ${i + 1}`,// Пример имени пользователя для каждого комментария
    });
  }
  return comments;
}

// Функция для создания объекта описания фотографии
function createPhoto(index) {
  return {
    id: generateId(index),//Уникальный ID фотографии
    url: generateUrl(index),
    description: generateDescription(),// Описание фотографии
    likes: generateLikes(),
    comments: generateComments(),// Массив сгенерированных комментариев
  };
}
// Функция для генерации массива из 25 фотографий
function generatePhotos() {
  const photos = [];
  for (let i = 0; i < 25; i++) {
    photos.push(createPhoto(i));
  }
  return photos;
}
const photos = generatePhotos();
console.log(photos);



const pictureTemplate = document.querySelector('#picture').content.cloneNode(true)

console.log('11111',pictureTemplate.src= 'images/1.jpg')

function generetePhoto() {
return photos.map((e)=> {
  pictureTemplate.querySelector('img').src =e.url
  pictureTemplate.querySelector('.picture__comments').innerText = e.comments.length
  pictureTemplate.querySelector('.picture__likes').innerText= e.likes
  
}
)
}

const pictures= document.querySelector('.pictures')
const allPhotos = generetePhoto()

pictures.insertAdjacentHTML('beforeend', allPhotos);

