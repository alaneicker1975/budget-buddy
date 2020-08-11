import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { store, persistor, sagaMiddleware } from './store';
import rootSaga from './sagas';
import App from './App';

import './styles/main.scss';
import '@alaneicker/atomik-ui/dist/styles/main.min.css';

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </Router>,
  document.querySelector('#root'),
);
