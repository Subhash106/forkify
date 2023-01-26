import { API_URL } from './config';
import { getJSON } from './helper';

export const state = {
  recipe: {},
  recipeList: []
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    const { recipe } = data;
    state.recipe = recipe;
  } catch (e) {
    throw e;
  }
};

export const loadRecipeList = async function (searchQuery) {
  try {
    const data = await getJSON(`${API_URL}?search=${searchQuery}`);
    const { recipes } = data;
    state.recipeList = recipes;
  } catch (e) {
    throw e;
  }
};
