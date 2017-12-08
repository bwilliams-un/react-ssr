import Root from './containers/Root';
import Home from './components/Home';
import ItemDetail from './components/ItemDetail';

export const routes = [
    {
        component: Root,
        routes: [
            {
                path: '/',
                exact: true,
                component: Home
            },
            {
                path: '/item/:id',
                component: ItemDetail
            }
        ]
    }
];
