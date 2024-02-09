import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { rootReducer } from "@/store/root.reducer";
import { authApi } from "@/store/api/auth";
import { userApi } from "./api/user";
import { marriageDataApi } from "./api/marriageData";

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(marriageDataApi.middleware)
})

export default store;

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export const appDispatch = store.dispatch
export type AppStore = ReturnType<typeof store.getState>