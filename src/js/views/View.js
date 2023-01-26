import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  _message = 'No recipe found. Please try again later';

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(markup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const currentElements = Array.from(
      this._parentElement.querySelectorAll('*')
    );

    newElements.forEach((newEl, i) => {
      const currentEl = currentElements[i];
      //  console.log(currentEl, newEl.isEqualNode(currentEl));

      // Update changed text
      if (
        !newEl.isEqualNode(currentEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        currentEl.textContent = newEl.textContent;
      }

      // Update changed attributes
      if (!newEl.isEqualNode(currentEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          currentEl.setAttribute(attr.name, attr.value)
        );
      }
    });
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

  renderError(error = this._message) {
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
