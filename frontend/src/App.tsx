import React from 'react';
import './App.css';
import { Home, Login, Profile, ProfileWithToken, Signup } from './components/pages';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  HttpLink,
  InMemoryCache
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

function App() {
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('github_access_token');
    return {
      headers: {
        ...headers,
        authorization: token ? 'Token ' + token : ''
      }
    };
  });

  const httpLinks = createHttpLink({
    uri: 'https://api.github.com/graphql'
  });

  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLinks)
  });

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
    },
    {
      path: '/profile/:accessToken/:user',
      element: <ProfileWithToken />
    },
    {
      path: '/home',
      element: <Home />
    }
  ]);

  return (
    <ApolloProvider client={apolloClient}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}

export default App;
