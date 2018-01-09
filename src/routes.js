import Root from './containers/Root/Root';
import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import User from './containers/User/User';
import { fetchItems } from './state/modules/items';
import { withAuthentication } from './containers/Auth';

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
            },
            {
                path: '/user',
                component: withAuthentication(User)
            }
        ]
    }
];
