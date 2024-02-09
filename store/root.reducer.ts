import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "@/store/api/auth";
import { userApi } from "./api/user";
import { marriageDataApi } from "./api/marriageData";

export const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [marriageDataApi.reducerPath]: marriageDataApi.reducer,
});