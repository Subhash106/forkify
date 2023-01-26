import * as model from './model';
import icons from 'url:../img/icons.svg';
import recipeView from './views/recipe';
import { API_URL } from './config';
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2
// key: 2a8d8250-f86b-496b-8f36-5b77f8c2ba08

///////////////////////////////////////

async function showRecipe() {
  const id = window.location.hash.slice(1);
  if (!id) return;
  recipeView.renderSpinner();

  try {
    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
  } catch (e) {
    recipeView.renderError(e.message);
  }
}

const init = () => {
  recipeView.addHandlerRender(showRecipe);
};

init();

document
  .querySelector('.search__btn')
  .addEventListener('click', async function (e) {
    e.preventDefault();
    renderSpinner(results);
    try {
      const searchQuery = document.querySelector('.search__field').value;
      const response = await fetch(`${API_URL}?search=${searchQuery}`);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      const { recipes } = data.data;

      console.log('data', recipes);

      renderResults(recipes);
    } catch (e) {
      console.log(e.message);
    }
  });

function renderResults(recipes) {
  results.innerHTML = '';
  results.insertAdjacentHTML(
    'afterbegin',
    recipes.map(recipe => renderRecipeCard(recipe)).join('')
  );
}

function renderRecipeCard(recipe) {
  const { id, image_url, publisher, title } = recipe;
  const html = `
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

  return html;
}
