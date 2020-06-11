import rootReducer from './rootReducer';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const configureStore = () => {
  const store = createStore(
    rootReducer,
    //by all means not necessary to use compose
    //only matter of preference because usually I keep adding more middleware (devtools etc.) on the way.
    compose(applyMiddleware(thunk)),
  );
  return store;
};

export default configureStore;
