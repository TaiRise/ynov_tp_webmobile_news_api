import { AsyncStorage } from 'react-native';

export const SET_READED_ARTICLES = 'SET_READED_ARTICLES';
const STORAGE_KEY = 'READED_ARTICLES';

export const setReadedArticles = readedArticles => ({
  type: SET_READED_ARTICLES,
  payload: readedArticles
});

export const getStorageReadedArticles = () => {
  return async dispatch => {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    const storageReadedArticles = JSON.parse(data) || [];
    dispatch(setReadedArticles(storageReadedArticles));
  };
};

export const setStorageReadedArticles = readedArticle => {
  return async dispatch => {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    const storageReadedArticles = JSON.parse(data) || [];
    storageReadedArticles.push(readedArticle);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(storageReadedArticles));
    dispatch(setReadedArticles(storageReadedArticles));
  };
};
