import axios from 'axios';

// Actions
export const ITEMS_REQUESTED = 'ITEMS_REQUESTED';
export const ITEMS_RECEIVED = 'ITEMS_RECEIVED';
export const ITEMS_FAILED = 'ITEMS_FAILED';

export const fetchItems = () => async (dispatch, getState) => {
    if (isFetching(getState())) {
        return Promise.resolve();
    }

    try {
        dispatch({
            type: ITEMS_REQUESTED
        });

        const {data} = await axios.get('http://localhost:8080/api/items/');
        return dispatch({
            type: ITEMS_RECEIVED,
            items: data
        });
    } catch (e) {
        return dispatch({
            type: ITEMS_FAILED
        });
    }
};

export const isFetching = (state) => {
    return state.isLoading;
};

const initialState = {
    isLoading: true,
    list: []
};

// reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ITEMS_REQUESTED:
            return Object.assign({}, state, { isLoading: true });
        case ITEMS_RECEIVED:
            return Object.assign({}, state, { isLoading: false, list: action.items });
        case ITEMS_FAILED:
            return Object.assign({}, state, { isLoading: false, list: [] });
        default:
            return state;
    }
};

export default reducer;