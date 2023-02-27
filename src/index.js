import React from 'react';
import ReactDOM from 'react-dom/client';
import AccountCreation from './createAccount';
import Loginpage from './loginpage';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element : <AccountCreation/>,


  },
  {
    path:"/Login",
    element: <Loginpage/>
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>
);
