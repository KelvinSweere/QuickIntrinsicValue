import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({});

const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
  });

const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
