// import {
//   Action,
//   UPDATE_STROKE,
//   BEGIN_STROKE,
//   END_STROKE,
//   SET_STROKE_COLOR
// } from "./actions"
// import { RootState } from "../../utils/types"

// const initialState: RootState["currentStroke"] = {
//   points: [],
//   color: "#000"
// }

// export const reducer = (
//   state: RootState["currentStroke"] = initialState,
//   action: Action
// ) => {
//   switch (action.type) {
//     case BEGIN_STROKE: {
//       return { ...state, points: [action.payload] }
//     }
//     case UPDATE_STROKE: {
//       return {
//         ...state,
//         points: [...state.points, action.payload]
//       }
//     }
//     case SET_STROKE_COLOR: {
//       return {
//         ...state,
//         color: action.payload
//       }
//     }
//     case END_STROKE: {
//       return {
//         ...state,
//         points: []
//       }
//     }
//     default:
//       return state
//   }
// }

// export const currentStrokeSelector = (state: RootState) =>
//   state.currentStroke

//RTK
// import { createReducer } from "@reduxjs/toolkit";
// import {  updateStroke, beginStroke, setStrokeColor } from "./actions";
import { Point, RootState } from "../../utils/types";
import { endStroke } from "../sharedAction";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: RootState["currentStroke"] = {
  points: [],
  color: "#000",
};

// export const reducer = createReducer(initialState, (builder) => {
//   builder.addCase(setStrokeColor, (state, action) => {
//     state.color = action.payload
//   })

//   builder.addCase(beginStroke, (state, action) => {
//     state.points = [action.payload]
//   })

//   builder.addCase(updateStroke, (state, action) => {
//     state.points.push(action.payload)
//   })

//   builder.addCase(endStroke, (state) => {
//     state.points = []
//   })

// })

const currentStroke = createSlice({
  name: "currentStroke",
  initialState: initialState,
  reducers: {
    setStrokeColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
    beginStroke: (state, action: PayloadAction<Point>) => {
      state.points = [action.payload]
    },
    updateStroke: (state, action: PayloadAction<Point>) => {
      state.points.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(endStroke, (state) => {
      state.points = [];
    });
  },
});

export default currentStroke.reducer
export const { beginStroke, updateStroke, setStrokeColor } = currentStroke.actions

export const currentStrokeSelector = (state: RootState) => state.currentStroke;
