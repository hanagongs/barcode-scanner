import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';

import App from './App';
import './index.css';
import fetchBarcodeData from './services/fetchBarcodeData';
import * as serviceWorker from './serviceWorker';

const store = configureStore();
fetchBarcodeData(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
