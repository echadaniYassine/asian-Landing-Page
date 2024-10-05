//Reducers/ storeCarte.js
import { createStore } from 'redux';
import rootReducer from './cartReducer'; // Assuming you've exported your rootReducer from a file named reducers.js

const store = createStore(rootReducer);

export default store;
