import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import allReducers from './reducers';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistCombineReducers(persistConfig, allReducers);
const sagaMiddleware = createSagaMiddleware();
const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
const persistor = persistStore(store);

export { store, persistor, sagaMiddleware };
