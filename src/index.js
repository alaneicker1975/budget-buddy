import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import todosReducer from './reducers';

import ExpenseGroupDetail from './components/expense-group-detail';
import ExpenseGroupsPreview from './components/expense-groups-preview';

import '@alaneicker/atomik-ui/dist/styles/main.min.css';
import './styles/main.scss';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(todosReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

const App = () => {
  return (
    <main className="layout">
      <div className="layout__sidebar"></div>
      <div className="layout__main">
        <Router>
          <Route path="/" exact component={ExpenseGroupsPreview} />
          <Route path="/expense-group/:id" component={ExpenseGroupDetail} />
        </Router>
      </div>
    </main>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root'),
);
