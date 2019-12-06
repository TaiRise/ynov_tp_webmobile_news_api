import { AsyncStorage } from 'react-native';

export const SET_SELECTED_CATEGORIES = 'SET_SELECTED_CATEGORIES';
const STORAGE_KEY = 'SELECTED_CATEGORIES';

export const setSelectedCategories = selectedCategories => ({
  type: SET_SELECTED_CATEGORIES,
  selectedCategories
});

export const getStorageSelectedCategories = () => {
  return async dispatch => {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    const storageSelectedCategories = JSON.parse(data) || [];
    dispatch(setSelectedCategories(storageSelectedCategories));
  };
};

export const setStorageSelectedCategories = selectedCategories => {
  return async dispatch => {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    const storageSelectedCategories = JSON.parse(data) || [];
    storageSelectedCategories.push(selectedCategories);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(storageSelectedCategories));
    dispatch(setSelectedCategories(selectedCategories));
  };
};
