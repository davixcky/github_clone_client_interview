import React from 'react';
import './App.css';
import { Login, Profile, Signup } from './components/pages';
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
    },
    {
      path: '/profile',
      element: <Profile />
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
