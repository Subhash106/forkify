import { API_URL, BOOKMARKS, KEY, RECORDS_PER_PAGE } from './config';
import { getJSON, sendJSON } from './helper';

export const state = {
  recipe: {},
  search: {
    query: '',
    page: 1,
    recipeList: [],
    recordsPerPage: RECORDS_PER_PAGE
  },
  bookmarks: JSON.parse(localStorage.getItem(BOOKMARKS)) || []
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}?key=${KEY}`);
    const { recipe } = data;
    // check if recipe is bookmarked
    state.bookmarks.forEach(bookmark => {
      if (bookmark.id === recipe.id) {
        recipe.bookmarked = true;
      }
    });
    state.recipe = recipe;
  } catch (e) {
    throw e;
  }
};

/**
 *
 * @param {String} searchQuery
 */
export const loadRecipeList = async function (searchQuery) {
  state.search.query = searchQuery;
  try {
    const data = await getJSON(`${API_URL}?search=${searchQuery}&key=${KEY}`);
    const { recipes } = data;
    state.search.recipeList = recipes;
  } catch (e) {
    throw e;
  }
};

/**
 *
 * @param {Integer} page
 * @returns {Array}
 */
export const getRecordsForPage = page => {
  state.search.page = page;
  const start = (page - 1) * RECORDS_PER_PAGE;
  const end = page * RECORDS_PER_PAGE;

  return state.search.recipeList.slice(start, end);
};

export const updateServings = newServings => {
  const { ingredients, servings } = state.recipe;
  modifiedIngredients = ingredients.map(ingredient => ({
    ...ingredient,
    quantity: (ingredient.quantity / servings) * newServings
  }));

  state.recipe.ingredients = modifiedIngredients;
  state.recipe.servings = newServings;
};

export const bookmark = () => {
  state.bookmarks.push(state.recipe);
  state.recipe.bookmarked = true;

  localStorage.setItem(BOOKMARKS, JSON.stringify(state.bookmarks));
};

export const deleteBookmark = id => {
  const bookmarkIndex = state.bookmarks.findIndex(
    bookmark => bookmark.id === id
  );

  state.bookmarks.splice(bookmarkIndex, 1);
  state.recipe.bookmarked = false;

  localStorage.setItem(BOOKMARKS, JSON.stringify(state.bookmarks));
};

export const uploadRecipe = async newRecipe => {
  const data = Object.entries(newRecipe);

  const ingredients = data
    .filter(d => d[0].startsWith('ingredient-') && d[1] !== '')
    .map(ing => {
      const [quantity, unit, description] = ing[1]
        .replaceAll(' ', '')
        .split(',');
      return { quantity: quantity ? +quantity : null, unit, description };
    });

  const recipe = {
    ingredients,
    image_url: newRecipe.image,
    source_url: newRecipe.sourceUrl,
    publisher: newRecipe.publisher,
    servings: newRecipe.servings,
    title: newRecipe.title,
    cooking_time: newRecipe.cookingTime
  };

  try {
    await sendJSON(`${API_URL}?key=${KEY}`, recipe);
  } catch (e) {
    throw e;
  }
};
