import icons from 'url:../../img/icons.svg';
import View from './View';

class RecipeList extends View {
  _parentElement = document.querySelector('.results');

  addHandlerRender(handler) {
    ['click'].forEach(ev =>
      document.querySelector('.search__btn').addEventListener(ev, handler)
    );
  }

  getQuery() {
    return document.querySelector('.search__field').value;
  }

  _generateMarkup() {
    return this._data.map(recipe => this._generateList(recipe)).join('');
  }

  _generateList(recipe) {
    const hashId = window.location.hash.slice(1);
    const { id, image_url, publisher, title } = recipe;
    return `
        <li class="preview">
        <a class="preview__link ${
          id === hashId ? 'preview__link--active' : ''
        }" href="#${id}">
            <figure class="preview__fig">
            <img src="${image_url}" alt="${title}" />
            </figure>
            <div class="preview__data">
            <h4 class="preview__title">${title}</h4>
            <p class="preview__publisher">${publisher}</p>
            <div class="preview__user-generated">
                <svg>
                <use href="${icons}#icon-user"></use>
                </svg>
            </div>
            </div>
        </a>
        </li>
    `;
  }
}

export default new RecipeList();
