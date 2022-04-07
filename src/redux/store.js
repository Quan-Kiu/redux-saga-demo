import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxSaga from 'redux-saga';
import rootSaga from './saga';
import reducer from './reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const sagaMiddleware = reduxSaga();

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['auth'],
};

const pReducer = persistReducer(persistConfig, reducer);

const store = createStore(pReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export default store;
