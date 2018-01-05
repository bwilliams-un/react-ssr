import axios from 'axios';

export const AUTH_REQUESTED = 'AUTH_REQUESTED';
export const AUTH_RECEIVED = 'AUTH_RECEIVED';
export const AUTH_FAILED = 'AUTH_FAILED';

export const authenticateUser = (username, password) => async (dispatch, getState) => {
    if (isFetching(getState())) {
        return;
    }

    try {
        dispatch({
            type: AUTH_REQUESTED,
            isLoading: true
        });

        /** Nested destructuring:
         * response = func(); { token, user } = response.data;
         * or
         * { data } = func(); { token, user } = data;
         * nested shorthand:
         * { data: { token, user } } = func()
         */
        const { data: { token, username: user } } = await axios.post('http://localhost:8080/api/tokens/', { username, password });
        if (localStorage !== null) {
            localStorage.setItem('api-token', token);
        }
        return dispatch({
            type: AUTH_RECEIVED,
            username: user,
            token
        });
    } catch (e) {
        // If there's a response object then error from the server, if not it's an internal failure default error object
        const error = (e.response) ? e.response.data.error : e.message;
        return dispatch({
            type: AUTH_FAILED,
            error: error
        });
    }
};

export const isFetching = (state) => {
    return state.isLoading;
};

const initialState = {
    isLoading: false,
    isAuthenticated: false,
    error: null,
    username: null,
    token: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_REQUESTED:
            return Object.assign({}, state, { isLoading: true });
        case AUTH_RECEIVED:
            return Object.assign({}, state, { isLoading: false, isAuthenticated: true, username: action.username, token: action.token, error: null });
        case AUTH_FAILED:
            return Object.assign({}, state, { isLoading: false, isAuthenticated: false, username: null, token: null, error: action.error });
        default:
            return state;
    }
};

export default reducer;