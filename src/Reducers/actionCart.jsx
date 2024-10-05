//Reducers/ actions.js
export const ADD_TO_CART = 'ADD_TO_CART';

export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

// actionCreators/notificationActions.js

export const setNotification = (message) => ({
  type: 'SET_NOTIFICATION',
  payload: message,
});
