import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from './features/loading/loadingSlice';
import toolReducer from './features/tool/toolSlice';

export const store = configureStore({
    reducer: {
        loading: loadingReducer,
        tool: toolReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
