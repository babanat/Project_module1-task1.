export function addCommentTemplate() {
    const template = document.createElement('template');
    template.id = 'comment-template';
    template.innerHTML = `
      <li class="social__comment">
        <img class="social__picture" src="" alt="" width="35" height="35">
        <p class="social__text"></p>
      </li>
    `;
  
    document.body.appendChild(template);
  }
  