import { combineReducers } from 'redux';
import { modalReducer, modalTypeReducer } from './modal.reducer';
import { homeReducer } from './home/home.reducer'

import errorsReducer from './errorsReducer';


export default combineReducers({
    modalReducer,
    modalTypeReducer,
    homeReducer,
    
    
    errors : errorsReducer
});