import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Home from './Pages/Home.jsx';
import Root from './Components/Root.jsx';
import Create from './Pages/Create.jsx';
import Single from './Pages/Single.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: "/create",
        element: <Create/>,
      },
      {
        path: "/single/:id", 
        element: <Single/>,
      },

    ]
  },
  {
    path: "/createss",
    element: <div>Dashboard</div>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
