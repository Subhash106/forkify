import icons from 'url:../../img/icons.svg';
import View from './View';

class Recipe extends View {
  _parentElement = document.querySelector('.recipe');

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerClick(handler) {
    this._parentElement
      .querySelector('.recipe__info-buttons')
      .addEventListener('click', e => {
        const target = e.target.closest('.btn--tiny');
        if (!target) return;

        const currentServings = +this._parentElement.querySelector(
          '.recipe__info-data--people'
        ).textContent;

        console.log('currentServings', currentServings);

        if (target.classList.contains('btn--decrease-servings')) {
          if (currentServings - 1 > 0) handler(currentServings - 1);
        }

        if (target.classList.contains('btn--increase-servings')) {
          handler(currentServings + 1);
        }
      });
  }

  addHandlerBookmark(handler) {
    document.querySelector('.btn--round').addEventListener('click', handler);
  }

  _renderIngredient(ingredient) {
    const { quantity, unit, description } = ingredient;

    return `<li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${quantity || ''}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${unit}</span>
                  ${description}
              </div>
            </li>`;
  }

  _generateMarkup() {
    const {
      image_url,
      title,
      cooking_time,
      ingredients,
      publisher,
      servings,
      source_url
    } = this._data;

    return `
          <figure class="recipe__fig">
            <img src="${image_url}" alt="Tomato" class="recipe__img" />
            <h1 class="recipe__title">
              <span>${title}</span>
            </h1>
          </figure>
  
          <div class="recipe__details">
            <div class="recipe__info">
              <svg class="recipe__info-icon">
                <use href="${icons}#icon-clock"></use>
              </svg>
              <span class="recipe__info-data recipe__info-data--minutes">${cooking_time}</span>
              <span class="recipe__info-text">minutes</span>
            </div>
            <div class="recipe__info">
              <svg class="recipe__info-icon">
                <use href="${icons}#icon-users"></use>
              </svg>
              <span class="recipe__info-data recipe__info-data--people">${servings}</span>
              <span class="recipe__info-text">servings</span>
  
              <div class="recipe__info-buttons">
                <button class="btn--tiny btn--decrease-servings">
                  <svg>
                    <use href="${icons}#icon-minus-circle"></use>
                  </svg>
                </button>
                <button class="btn--tiny btn--increase-servings">
                  <svg>
                    <use href="${icons}#icon-plus-circle"></use>
                  </svg>
                </button>
              </div>
            </div>
  
            <div class="recipe__user-generated">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
            <button class="btn--round">
              <svg class="">
                <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
              </svg>
            </button>
          </div>
  
          <div class="recipe__ingredients">
            <h2 class="heading--2">Recipe ingredients</h2>
            <ul class="recipe__ingredient-list">
              ${ingredients
                .map(ingredient => this._renderIngredient(ingredient))
                .join('')}
            </ul>
          </div>
  
          <div class="recipe__directions">
            <h2 class="heading--2">How to cook it</h2>
            <p class="recipe__directions-text">
              This recipe was carefully designed and tested by
              <span class="recipe__publisher">${publisher}</span>. Please check out
              directions at their website.
            </p>
            <a
              class="btn--small recipe__btn"
              href="${source_url}"
              target="_blank"
            >
              <span>Directions</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
            </a>
          </div>
  `;
  }
}

export default new Recipe();
