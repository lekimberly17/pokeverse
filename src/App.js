import React from ‘react’;
import { createBrowserRouter, RouterProvider } from ‘react-router-dom’;
import { Home } from ‘../src/routes/Home’;
import { PokemonDetails } from ‘../src/routes/PokemonDetails’;
import { Layout } from ‘../src/routes/Layout’;
import { FavoritesProvider } from ‘./FavoritesProvider’;
import { Favorites } from ‘./routes/Favorites’;
const router = createBrowserRouter([
  {
    path: ‘/’,
    element: <Layout />,
    children: [
      { path: ‘/’, element: <Home /> },
      { path: ‘/favorites’, element: <Favorites /> },
      { path: ‘/:name’, element: <PokemonDetails /> },
    ],
  },
]);
function App() {
  return (
    <FavoritesProvider>
      <RouterProvider router={router} />
    </FavoritesProvider>
  );
}
export { App };