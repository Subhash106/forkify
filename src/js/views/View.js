import icons from 'url:../../img/icons.svg';

export default class View {
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

  _clear() {
    this._parentElement.innerHTML = '';
  }
}
