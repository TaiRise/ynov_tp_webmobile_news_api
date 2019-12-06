import * as actionTypes from '../actions/categoriesActions';

let initialState = {
  selectedCategories: []
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SELECTED_CATEGORIES:
      return {
        ...state,
        selectedCategories: action.selectedCategories
      };

    default:
      return state;
  }
};

export default categoriesReducer;
