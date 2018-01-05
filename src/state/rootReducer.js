import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import itemsReducer from './modules/items';
import settingsReducer from './modules/settings';
import authReducer from './modules/auth';

const rootReducer = combineReducers({
    routerReducer,
    items: itemsReducer,
    settings: settingsReducer,
    auth: authReducer
});

export default rootReducer;