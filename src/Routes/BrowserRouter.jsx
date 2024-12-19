import React from "react";
import { createBrowserRouter, createHashRouter } from "react-router-dom";
import Dashboard from "../Components/Dashboard.jsx";
import Notifications from "../Components/Notifications.jsx";
import Folder from "../Components/Folder.jsx";
import Billing from "../Components/Billing.jsx";
import MyLibrary from "../Components/MyLibrary.jsx";
import Sidebar from "../Components/Common/Sidebar.jsx";

const error = (
  <div>
    <h1>404</h1>
  </div>
);

const Router = createHashRouter([
  {
    element: <Sidebar />,

    children: [
      {
        path: "/",
        errorElement: error,
        element: <Dashboard />,
      },
      {
        path: "/mylibrary",
        errorElement: error,
        element: <MyLibrary />,
        children: [
          {
            path: "/folders/:id",
            element: <Folder />,
          },
        ],
      },
      {
        path: "/notifications",
        errorElement: error,
        element: <Notifications />,
      },
      {
        path: "/billing",
        errorElement: error,
        element: <Billing />,
      },
    ],
  },
]);

export default Router;