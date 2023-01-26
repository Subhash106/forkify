import View from './View';
import icons from 'url:../../img/icons.svg';

class Pagination extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', e => {
      const target = e.target.closest('.btn--inline');

      if (!target) return;

      handler(+target.dataset.page);
    });
  }

  _generateMarkup() {
    const numOfPages = Math.ceil(
      this._data.recipeList.length / this._data.recordsPerPage
    );

    const currentPage = this._data.page;
    const nextPage = currentPage + 1;
    const prevPage = currentPage - 1;

    if (numOfPages === 1) {
      return '';
    }

    if (numOfPages > 1 && currentPage === 1) {
      return `
        <button class="btn--inline pagination__btn--next" data-page="${nextPage}">
            <span>Page ${nextPage}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        `;
    }

    if (numOfPages === currentPage) {
      return `
        <button class="btn--inline pagination__btn--prev" data-page="${prevPage}">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${prevPage}</span>
        </button>
        `;
    }

    return `
        <button class="btn--inline pagination__btn--prev" data-page="${prevPage}">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${prevPage}</span>
        </button>
        <button class="btn--inline pagination__btn--next" data-page="${nextPage}">
            <span>Page ${nextPage}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        `;
  }
}

export default new Pagination();
