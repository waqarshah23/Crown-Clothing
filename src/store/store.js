import { applyMiddleware, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { RootReducer } from './root-reducer';
import {customLogger} from './middleware/middleware';
//import thunk from 'redux-thunk';
import createSagaMiddleware from '@redux-saga/core';
import { rootSaga } from './root-saga';
import logger from 'redux-logger';

const persistConfig = {
    key: 'root',
    storage,
    blackList: ['user']
};

const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, RootReducer);
const middleware = [ process.env.NODE_ENV === 'development' && logger, sagaMiddleware].filter(
    Boolean
); //[customLogger, thunk,logger];
const componsedEnhancer = compose(applyMiddleware(...middleware));

export const store = createStore(persistedReducer, undefined, componsedEnhancer);
sagaMiddleware.run(rootSaga);
export const persistedStore = persistStore(store);