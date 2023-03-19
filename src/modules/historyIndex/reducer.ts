// import { RootState } from "../../utils/types";
// import { HistoryIndexAction, UNDO, REDO, END_STROKE } from "./actions";

// export const reducer = (state: RootState['historyIndex'] =0, action: HistoryIndexAction) => {
//   switch (action.type){
//     case END_STROKE: {
//       return 0
//     }
//     case UNDO: {
//       return Math.min(state+1, action.payload)
//     }
//     case REDO : {
//       return Math.max(state-1, 0)
//     }
//     default: {
//       return state
//     }
//   }
// }

// export const historyIndexSelector = (state: RootState ) => {
//   return state.historyIndex
// }

//rtk
// import { undo, redo } from "./actions";
//import {createReducer}from "@reduxjs/toolkit";

import { endStroke } from "../sharedAction";
import { RootState } from "../../utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// const initialState: RootState["historyIndex"] = 0;

// export const reducer = createReducer(initialState, (builder) => {
//   builder.addCase(undo, (state, action) => {
//     return Math.min(state + 1, action.payload);
//   });

//   builder.addCase(redo, (state, action) => {
//     return Math.max(state - 1, 0);
//   });

//   builder.addCase(endStroke, (state, action) => {
//     return 0;
//   });
// });

export const historyIndex = createSlice({
  name: "historyIndex",
  initialState: 0,
  reducers: {
    undo: (state, action: PayloadAction<number>) => {
      return Math.min(state + 1, action.payload);
    },
    redo: (state) => {
      return Math.max(state - 1, 0);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(endStroke, () => {
      return 0;
    });
  },
});

export default historyIndex.reducer
export const { undo, redo } = historyIndex.actions

export const historyIndexSelector = (state: RootState) => {
  return state.historyIndex;
};
