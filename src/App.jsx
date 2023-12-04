import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Create from "./components/Create";
import Read from "./components/Read";
import User from "./components/User";

const UsersData = () => {
  return (
    <div className="container">
      <h1>Users List</h1>
      <Create />
      <Read />
    </div>
  );
};

const routes = createBrowserRouter([
  {
    path: "/",
    element: <UsersData />,
  },
  {
    path: "/:id",
    element: <User />,
  },
]);

const App = () => <RouterProvider router={routes} />;

export default App;
