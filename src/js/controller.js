import * as model from './model';
import recipeView from './views/recipe';
import recipeListView from './views/recipeList';
import paginationView from './views/pagination';
import bookmarkView from './views/bookmark';
import addRecipeView from './views/add';
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

async function showRecipe() {
  const id = window.location.hash.slice(1);
  if (!id) return;
  recipeView.renderSpinner();

  try {
    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
    recipeView.addHandlerClick(controlServings);
    recipeView.addHandlerBookmark(controlBookmark);
    recipeListView.update(model.getRecordsForPage(model.state.search.page));
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

    paginationHandler(1);

    paginationView.addHandlerClick(paginationHandler);
  } catch (e) {
    recipeListView.renderError(e.message);
  }
}

function paginationHandler(page) {
  recipeListView.render(model.getRecordsForPage(page));
  paginationView.render(model.state.search);
}

function controlServings(newServings) {
  model.updateServings(newServings);

  // when use render, we have to add the event listenr
  // recipeView.render(model.state.recipe);
  // recipeView.addHandlerClick(controlServings);

  // while we use update i.e. partial update, we don't require to attach the event listener again
  recipeView.update(model.state.recipe);
}

function controlBookmark() {
  if (model.state.recipe.bookmarked) {
    model.deleteBookmark();
  } else {
    model.bookmark();
  }
  recipeView.update(model.state.recipe);
  bookmarkView.render(model.state.bookmarks);
}

async function controlAddRecipe(data) {
  try {
    await model.uploadRecipe(data);
  } catch (e) {
    addRecipeView.renderError(e.message);
  }
}

const init = () => {
  recipeView.addHandlerRender(showRecipe);
  recipeListView.addHandlerRender(showRecipeList);
  bookmarkView.render(model.state.bookmarks);
  addRecipeView.addHandlerClick();
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
