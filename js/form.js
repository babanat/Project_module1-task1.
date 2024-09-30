const formElement = document.querySelector('.img-upload__form');
const hashtagInput = formElement.querySelector('.text__hashtags');
const commentInput = formElement.querySelector('.text__description');

function validateHashtags() {
    const hashtags = hashtagInput.value.trim().split(/\s+/);
    const regex = /^#[a-zA-Zа-яА-Я0-9]{1,19}$/;

    const isValid = hashtags.every(tag => regex.test(tag));

    if (!isValid) {
        hashtagInput.setCustomValidity('Хэш-тег должен начинаться с # и быть длиной от 2 до 20 символов.');
        return false;
    }

    hashtagInput.setCustomValidity('');
    return true;
}

function validateComment() {
    if (commentInput.value.length > 140) {
        commentInput.setCustomValidity('Комментарий не должен превышать 140 символов.');
        return false;
    }
    commentInput.setCustomValidity('');
    return true;
}

formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (validateHashtags() && validateComment()) {
        formElement.submit();
    }
});

export { validateHashtags, validateComment };

