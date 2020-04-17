import { combineReducers } from 'redux';
import mainPage from './mainPage';
import products from './products';

const rootReducer = combineReducers({
    mainPage,products
});

export default rootReducer;