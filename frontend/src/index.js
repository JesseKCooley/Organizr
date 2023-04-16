import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ListsContextProvider} from './context/ListsContext';
import { AuthContextProvider } from './context/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <AuthContextProvider>
    <ListsContextProvider>
    <App />
    </ListsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


