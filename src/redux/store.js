  import { configureStore } from '@reduxjs/toolkit';
  import {
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
  import storage from 'redux-persist/lib/storage';
  import { carsReducer } from './carsReducer';
  import persistReducer from 'redux-persist/es/persistReducer';

  const authPersistConfig = {
    key: 'cars',
    storage,
    whitelist: ['favorites'],
  };

  export const store = configureStore({
    reducer: {
      cars: persistReducer(authPersistConfig, carsReducer),
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

  export const persistor = persistStore(store);
