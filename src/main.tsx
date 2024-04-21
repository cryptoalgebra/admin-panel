import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
    Navigate,
    RouterProvider,
    createBrowserRouter,
} from 'react-router-dom';
import FarmsPage from './pages/Farms/index.tsx';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import LayoutApp from './App.tsx';
import FarmPage from './pages/Farm/index.tsx';
import NewFarmPage from './pages/NewFarm/index.tsx';
import PoolsPage from './pages/Pools/index.tsx';
import PoolPage from './pages/Pool/index.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate replace to={'/farms'} />,
    },
    {
        path: '/farms',
        element: (
            <LayoutApp>
                <FarmsPage />{' '}
            </LayoutApp>
        ),
    },
    {
        path: '/farms/:farm',
        element: (
            <LayoutApp>
                <FarmPage />{' '}
            </LayoutApp>
        ),
    },
    {
        path: '/new-farm',
        element: (
            <LayoutApp>
                <NewFarmPage />{' '}
            </LayoutApp>
        ),
    },
    {
        path: '/pools',
        element: (
            <LayoutApp>
                <PoolsPage />{' '}
            </LayoutApp>
        ),
    },
    {
        path: '/pools/:pool',
        element: (
            <LayoutApp>
                <PoolPage />{' '}
            </LayoutApp>
        ),
    },
]);

const client = new ApolloClient({
    uri: import.meta.env.VITE_INFO_GRAPH,
    cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <RouterProvider router={router} />
        </ApolloProvider>
    </React.StrictMode>
);
