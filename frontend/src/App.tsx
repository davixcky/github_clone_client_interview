import React from 'react';
import './App.css';
import { Login, Signup } from './components/pages';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <Signup />
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
