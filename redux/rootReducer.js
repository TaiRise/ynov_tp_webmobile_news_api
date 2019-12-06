import { combineReducers } from 'redux';
import articlesReducer from './reducers/articlesReducer';
import categoriesReducer from './reducers/categoriesReducer';

const reducers = combineReducers({ articlesReducer, categoriesReducer });

export default reducers;
