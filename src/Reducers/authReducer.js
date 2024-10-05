// authReducer.js

const initialState = {
    isAuthenticated: false,
    // other authentication-related state properties
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          isAuthenticated: true,
          // update other state properties as needed
        };
      case 'LOGOUT':
        return {
          ...state,
          isAuthenticated: false,
          // update other state properties as needed
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  