// import { composeWithDevTools } from "redux-devtools-extension";
// import { applyMiddleware, createStore, combineReducers } from "redux";

// import { reducer as historyIndex } from "./modules/historyIndex/reducer";
// import { reducer as strokes } from "./modules/strokes/reducer";

import historyIndex from "./modules/historyIndex/reducer";
import strokes from './modules/strokes/reducer'
// import { modalVisible } from "./modules/modals/slice"
import  currentStroke from "./modules/currentStroke/reducer";

import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { modalVisible } from "./modules/modals/slice";
import { RootState } from "./utils/types";
import { projectsList } from "./modules/projectList/slice";

//redux
// export const store = createStore(
//   combineReducers({historyIndex,currentStroke,strokes}),
//   composeWithDevTools(applyMiddleware(logger))
// );
// store.dispatch({type: "TEST_ACTION"})

//redux toolkit
export const store = configureStore({
  reducer: {
    historyIndex,
    strokes,
    currentStroke,
    modalVisible,
    projectsList
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>
