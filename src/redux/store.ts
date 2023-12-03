import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistedReducer} from './persistConfig';
import globalLoadSlice from './slices/globalLoadState';
import productsSlice from './slices/productsSlice';
import cartSlice from './slices/cartSlice';

const rootReducer = combineReducers({
  globalLoad: globalLoadSlice.reducer,
  products: productsSlice.reducer,
  cart: cartSlice,
});

const store = configureStore({
  reducer: persistedReducer(rootReducer),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export const {dispatch: storeDispatch} = store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
