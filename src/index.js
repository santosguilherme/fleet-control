import 'babel-polyfill';

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import App from './app/containers/App';
import configureStore from './app/store/configureStore';
import {initialCharge} from './app/util';

import 'bootstrap/dist/css/bootstrap.css';
import './index.scss';

const store = configureStore();

initialCharge();

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
