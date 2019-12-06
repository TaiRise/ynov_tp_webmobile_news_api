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

export const setStorageSelectedCategories = selectedCategory => {
  return async dispatch => {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    const storageSelectedCategories = JSON.parse(data) || [];
    const alreadyExist = storageSelectedCategories.find(category => category === selectedCategory);
    if (alreadyExist) {
      return;
    }
    storageSelectedCategories.push(selectedCategory);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(storageSelectedCategories));
    dispatch(setSelectedCategories(storageSelectedCategories));
  };
};

export const removeStorageSelectedCategories = toRemoveCategory => {
  return async dispatch => {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    const storageSelectedCategories = JSON.parse(data) || [];
    const newSelectedCategories = storageSelectedCategories.filter(category => category !== toRemoveCategory);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newSelectedCategories));
    dispatch(setSelectedCategories(newSelectedCategories));
  };
};
