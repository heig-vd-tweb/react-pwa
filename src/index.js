import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './components/App';
import configureStore from './store/configureStore';
import * as serviceWorker from './serviceWorker';

const initialState = {};

const store = configureStore(initialState);

const render = process.env.NODE_ENV === 'production'
  ? ReactDOM.hydrate
  : ReactDOM.render;

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
