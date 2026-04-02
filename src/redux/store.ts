import { configureStore } from '@reduxjs/toolkit';
<<<<<<< HEAD
import transactionsReducer from './slices/transactionsSlice';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'vaultx-root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, transactionsReducer);

export const store = configureStore({
  reducer: {
    transactions: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

=======

export const store = configureStore({
  reducer: {
    // add reducers here later
  },
});

>>>>>>> 31c1ef512a3a26754c201f44fe62cdb10dbb2b1b
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;