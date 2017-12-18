/**
 * Action types, action creators, and reducers in the same file
 * Import the reducer by default: import settingsReducer from './settings'
 * Import specific actions creators using destructuring: import { getSettings } from './settings'
 */

export const GET_SETTINGS = 'GET_SETTINGS';

export const getSettings = () => {
    return { type: GET_SETTINGS };
};

const initialState = {
    site: {
        id: null
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default reducer;