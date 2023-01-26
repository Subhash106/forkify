import { API_URL } from './config';
import { getJSON } from './helper';

export const state = {
  recipe: {}
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
