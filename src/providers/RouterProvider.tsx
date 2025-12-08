import App from "@/App";
import FarmsPage from "@/pages/Farms";
import FarmPage from "@/pages/Farm";
import NewFarmPage from "@/pages/NewFarm";
import PoolsPage from "@/pages/Pools";
import PoolPage from "@/pages/Pool";
import { createBrowserRouter, Navigate, RouterProvider as _RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate replace to="/farms" />,
    },
    {
        element: <App />,
        children: [
            {
                path: "farms",
                element: <FarmsPage />,
            },
            {
                path: "farms/:farm",
                element: <FarmPage />,
            },
            {
                path: "new-farm",
                element: <NewFarmPage />,
            },
            {
                path: "pools",
                element: <PoolsPage />,
            },
            {
                path: "pools/:pool",
                element: <PoolPage />,
            },
        ],
    },
]);

export default function RouterProvider() {
    return <_RouterProvider router={router} />;
}
