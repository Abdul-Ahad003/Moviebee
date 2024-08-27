import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './assets/components/Home.jsx';
import Searchpage from './assets/components/Searchpage.jsx';
import Details from './assets/components/Details.jsx';
import Favorites from './assets/components/Favorites.jsx';
import { store } from './assets/redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/search",
    element: <Searchpage />,

  },
  {
    path: "/details",
    element: <Details />,
  },
  {
    path: "/favorites",
    element: <Favorites />
  }
]);

let persistor = persistStore(store);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} >
        <App />
      </RouterProvider>
    </PersistGate>
  </Provider>
  ,
)
