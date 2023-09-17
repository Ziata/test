import { api } from "@/services/api";
import rootReducer from "@/services/reducer";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
