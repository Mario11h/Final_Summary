import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './features/projectSlice';
import alertReducer from './features/AlertSlice'
const store = configureStore({
  reducer: {
    projects: projectReducer,
    alert: alertReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;