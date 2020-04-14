import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore } from 'redux-persist';

import rootReducer from './reducers'


export const initializeStore = preloadedState => {
    let store;
    const isClient = typeof window !== 'undefined';
    if (isClient) {
        const { persistReducer } = require('redux-persist');
        const storage = require('redux-persist/lib/storage').default;
        const persistConfig = {
            key: 'root',
            storage
        };
        store = createStore(
            persistReducer(persistConfig, rootReducer),
            preloadedState,
            composeWithDevTools(applyMiddleware())
        );
        store.__PERSISTOR = persistStore(store);
    } else {
        store = createStore(
            rootReducer,
            preloadedState,
            composeWithDevTools(applyMiddleware())
        );
    }
    return store;
}
