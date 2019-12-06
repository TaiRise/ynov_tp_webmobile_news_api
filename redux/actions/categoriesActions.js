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

<<<<<<< HEAD
export const setStorageSelectedCategories = selectedCategory => {
=======
export const setStorageSelectedCategories = selectedCategories => {
>>>>>>> 7dd080624a8f9e28e05a8be20ebab672a743b115
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
