import Root from './containers/Root/Root';
import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import { fetchItems } from './state/modules/items';

export const routes = [
    {
        component: Root,
        routes: [
            {
                path: '/',
                exact: true,
                component: Home,
                loadData: async (match, dispatch) => {
                    return dispatch(fetchItems());
                }
            },
            {
                path: '/login',
                component: Login
            }
        ]
    }
];
