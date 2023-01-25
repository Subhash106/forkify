import icons from 'url:../img/icons.svg';
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');
const results = document.querySelector('.results');
const spinner = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
  `;

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2
// key: 2a8d8250-f86b-496b-8f36-5b77f8c2ba08

///////////////////////////////////////

async function showRecipe() {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    renderSpinner(recipeContainer);
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const {
      data: { recipe },
    } = await response.json();

    console.log('data', recipe);
    renderRecipe(recipe);
  } catch (e) {
    console.log(e.message);
  }
}

function renderSpinner(parentEl) {
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', spinner);
}

function renderIngredient(ingredient) {
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

function renderRecipe(recipe) {
  const {
    image_url,
    title,
    cooking_time,
    ingredients,
    publisher,
    servings,
    source_url,
  } = recipe;

  const html = `
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
              <button class="btn--tiny btn--increase-servings">
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
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${ingredients
              .map(ingredient => renderIngredient(ingredient))
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

  recipeContainer.innerHTML = '';
  recipeContainer.insertAdjacentHTML('beforeend', html);
}

['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe));
document
  .querySelector('.search__btn')
  .addEventListener('click', async function (e) {
    e.preventDefault();
    renderSpinner(results);
    try {
      const searchQuery = document.querySelector('.search__field').value;
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchQuery}`
      );

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
