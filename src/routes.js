import Root from './containers/Root/Root';
import Home from './containers/Home/Home';
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
            }
        ]
    }
];
