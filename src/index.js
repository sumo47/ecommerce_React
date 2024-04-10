import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from './components/context/AppContext';
import { FilterProvider } from './components/context/Filter_Context';
import { CartProvider } from './components/context/cartContext'
import { Auth0Provider } from '@auth0/auth0-react';


const root = ReactDOM.createRoot(document.getElementById('root'));
const domain = process.env.REACT_APP_AUTH_DOMAIN
const client_id = process.env.REACT_APP_CLIENT_ID
console.log(domain + client_id)

root.render(

  <Auth0Provider
    domain={domain}
    clientId={client_id}
    redirectUri={window.location.origin}>
    <AppProvider>
      <FilterProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </FilterProvider>
    </AppProvider>
  </Auth0Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
