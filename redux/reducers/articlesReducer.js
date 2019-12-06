import * as actionTypes from '../actions/articlesActions';

let initialState = {
  readedArticles: []
};

const ArticlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_READED_ARTICLES:
      return {
        ...state,
        readedArticles: action.payload
      };
    default:
      return state;
  }
};

export default ArticlesReducer;
