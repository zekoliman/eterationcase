import {configureStore} from '@reduxjs/toolkit';
import globalLoadSlice from './slices/globalLoadState';

const store = configureStore({
  reducer: {
    globalLoad: globalLoadSlice.reducer,
  },
});

export default store;

export const {dispatch: storeDispatch} = store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
