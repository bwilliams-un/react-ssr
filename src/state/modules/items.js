import axios from 'axios';

// Actions
export const ITEMS_REQUESTED = 'ITEMS_REQUESTED';
export const ITEMS_SUCCESS = 'ITEMS_SUCCESS';
export const ITEMS_FAILED = 'ITEMS_FAILED';

// Can add Action Creators here, for now we are skipping that and using objects directly

// NOTE: simple async receiving dispatch (replace with thunk or saga or other async module)
export async function fetchItems(dispatch) {
    try {
        await dispatch({
            type: ITEMS_REQUESTED
        });

        const { data } = await axios.get('http://localhost:8080/api/items/');
        return dispatch({
            type: ITEMS_SUCCESS,
            items: data
        });
    } catch (e) {
        return dispatch({
            type: ITEMS_FAILED
        });
    }
}

const initialState = {
    isLoading: true,
    list: []
};

// reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ITEMS_REQUESTED:
            return Object.assign({}, state, { isLoading: true });
        case ITEMS_SUCCESS:
            return Object.assign({}, state, { isLoading: false, list: action.items });
        case ITEMS_FAILED:
            return Object.assign({}, state, { isLoading: false, list: [] });
        default:
            return state;
    }
};

export default reducer;