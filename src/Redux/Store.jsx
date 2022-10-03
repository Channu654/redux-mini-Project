import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
import { reducer } from './Reducer';


const rootreducer = combineReducers({ reducer});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootreducer,
  composeEnhancers(applyMiddleware(thunk))
);
