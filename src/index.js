import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import todosReducer from './reducers';
import '@alaneicker/atomik-ui/dist/styles/main.min.css';
import './styles/main.scss';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(todosReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

const App = () => {
  return <>Budget Buddy</>;
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root'),
);
