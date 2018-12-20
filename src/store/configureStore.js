import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import rootReducer from '../reducers';


export default function (initialState) {
  const middlewares = [
    thunk,
    ...typeof window !== 'undefined' ? [logger] : [],
  ];

  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  return store;
}