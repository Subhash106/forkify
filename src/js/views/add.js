import View from './View';

class Add extends View {
  _parentElement = document.querySelector('.upload');
  _openModal = document.querySelector('.nav__btn--add-recipe');
  _closeModal = document.querySelector('.btn--close-modal');
  _overlay = document.querySelector('.overlay');
  _modal = document.querySelector('.add-recipe-window');

  toggleModal() {
    this._overlay.classList.toggle('hidden');
    this._modal.classList.toggle('hidden');
  }

  addHandlerClick() {
    this._openModal.addEventListener('click', this.toggleModal.bind(this));
    this._closeModal.addEventListener('click', this.toggleModal.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      const data = [...new FormData(this)];

      handler(Object.fromEntries(data));
    });
  }
}

export default new Add();
