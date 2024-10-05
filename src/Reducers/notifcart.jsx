// reducers/notifcart.jsx

const initialState = {
    message: '+1', // Initial notification message
  };
  
  const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return {
          ...state,
          message: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default notificationReducer;
  