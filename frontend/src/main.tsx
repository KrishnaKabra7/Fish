import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import './index.css'
import RootLayout from './pages/RootLayout';
import Home from './pages/home/Home';
import Game from './pages/game/Game';
import Rules from './pages/rules/Rules';


const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      {
        path: "/game",
        Component: Game,
      },
      {
        path: "/rules",
        Component: Rules,
      }
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
