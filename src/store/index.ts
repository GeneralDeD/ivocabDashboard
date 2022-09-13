import { wordsApi } from "./../services/wordsService";
import adminReducer from "./reducers/adminSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authApi } from "../services/authService";
import { levelsApi } from "../services/levelsService";
import { uploadApi } from "../services/uploadService";

const rootReducer = combineReducers({
	[authApi.reducerPath]: authApi.reducer,
	[wordsApi.reducerPath]: wordsApi.reducer,
	[levelsApi.reducerPath]: levelsApi.reducer,
	[uploadApi.reducerPath]: uploadApi.reducer,
	admin: adminReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			authApi.middleware,
			wordsApi.middleware,
			levelsApi.middleware,
			uploadApi.middleware
		),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
