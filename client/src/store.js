import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer } from "./reducers/reducer";
import { initialState } from "./reducers/reducer";
const dataItemFromLocalStorage = localStorage.getItem("dataItems")
  ? JSON.parse(localStorage.getItem("dataItems"))
  : initialState;

const initialStoreState = {
  data: dataItemFromLocalStorage,
};

const middleware = [thunk];

const store = configureStore({
  reducer,
  middleware: middleware,
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: initialStoreState,
});

export default store;
