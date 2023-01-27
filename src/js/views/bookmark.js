import View from './View';

class Bookmark extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _message = 'No bookmarks yet. Find a nice recipe and bookmark it :)';

  _generateMarkup() {
    return this._data.map(
      ({ id, image_url, title, publisher }) => `<li class="preview">
    <a class="preview__link" href="#${id}">
      <figure class="preview__fig">
        <img src="${image_url}" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__name">
          ${title}
        </h4>
        <p class="preview__publisher">${publisher}</p>
      </div>
    </a>
  </li>`
    );
  }
}

export default new Bookmark();
