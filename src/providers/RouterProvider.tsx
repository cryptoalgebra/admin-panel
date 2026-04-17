import App from "@/App";
import FarmsPage from "@/pages/Farms";
import FarmPage from "@/pages/Farm";
import NewFarmPage from "@/pages/NewFarm";
import PoolsPage from "@/pages/Pools";
import PoolPage from "@/pages/Pool";
import { createBrowserRouter, Navigate, RouterProvider as _RouterProvider, RouteObject } from "react-router-dom";
import GaugesPage from "@/pages/Gauges";
import NewGaugePage from "@/pages/NewGauge";
import GaugePage from "@/pages/Gauge";
import { enabledModules } from "config/app-modules";
import PredictionsPage from "@/pages/Predictions";
import PredictionMarketPage from "@/pages/PredictionMarket";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate replace to="/pools" />,
    },
    {
        element: <App />,
        children: [
            {
                path: "pools",
                element: <PoolsPage />,
            },
            {
                path: "pools/:pool",
                element: <PoolPage />,
            },

            ...(enabledModules.FarmingModule
                ? [
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
                  ]
                : []),

            ...(enabledModules.Ve33Module
                ? [
                      {
                          path: "gauges",
                          element: <GaugesPage />,
                      },
                      {
                          path: "gauges/:gauge",
                          element: <GaugePage />,
                      },
                      {
                          path: "new-gauge",
                          element: <NewGaugePage />,
                      },
                  ]
                : []),

            ...(enabledModules.PredictionModule
                ? [
                      {
                          path: "predictions",
                          element: <PredictionsPage />,
                      },
                      {
                          path: "predictions/:market",
                          element: <PredictionMarketPage />,
                      },
                  ]
                : []),
        ].filter(Boolean) as RouteObject[],
    },
]);

export default function RouterProvider() {
    return <_RouterProvider router={router} />;
}
