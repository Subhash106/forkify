import icons from 'url:../../img/icons.svg';

class RecipeList {
  _data;
  _parentElement = document.querySelector('.results');

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

  renderSpinner() {
    const spinner = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
  `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', spinner);
  }

  addHandlerRender(handler) {
    ['click'].forEach(ev =>
      document.querySelector('.search__btn').addEventListener(ev, handler)
    );
  }

  renderError(error) {
    const markup = `
        <div class="error">
            <div>
            <svg>
                <use href="${icons}#icon-alert-triangle"></use>
            </svg>
            </div>
            <p>${error}. Please try again!</p>
        </div>
        `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  getQuery() {
    return document.querySelector('.search__field').value;
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  _generateMarkup() {
    return this._data.map(recipe => this._generateList(recipe)).join('');
  }

  _generateList(recipe) {
    const { id, image_url, publisher, title } = recipe;
    return `
        <li class="preview">
        <a class="preview__link preview__link--active" href="#${id}">
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
