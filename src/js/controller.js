import * as model from './model';
import recipeView from './views/recipe';
import recipeListView from './views/recipeList';
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

async function showRecipeList() {
  try {
    const searchQuery = recipeListView.getQuery();

    if (!searchQuery) return;
    recipeListView.renderSpinner();

    await model.loadRecipeList(searchQuery);

    recipeListView.render(model.state.recipeList);
  } catch (e) {
    recipeListView.renderError(e.message);
  }
}

const init = () => {
  recipeView.addHandlerRender(showRecipe);
  recipeListView.addHandlerRender(showRecipeList);
};

init();
