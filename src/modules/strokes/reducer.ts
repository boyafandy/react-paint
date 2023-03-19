// import { RootState } from "../../utils/types"
// import { Action, END_STROKE } from "./actions"

// export const reducer = (
//   state: RootState["strokes"] = [],
//   action: Action
// ) => {
//   switch (action.type) {
//     case END_STROKE: {
//       const { historyIndex, stroke } = action.payload
//       if (!stroke.points.length) {
//         return state
//       }
//       return [...state.slice(0, state.length - historyIndex), stroke]
//     }
//     default:
//       return state
//   }
// }

// export const strokesLengthSelector = (state: RootState) =>
//   state.strokes.length

// export const strokesSelector = (state: RootState) => state.strokes

//RTK
//import {createReducer} from "@reduxjs/toolkit";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../utils/types";
import { endStroke } from "../sharedAction";
import { getProject, newProject } from "./api";

const initialStrokes: RootState["strokes"] = [];

// export const reducer = createReducer(initialStrokes, (builder) => {
//   builder.addCase(endStroke, (state, action) => {
//     const { historyIndex, stroke } = action.payload;
//     if (historyIndex === 0) {
//       state.push(stroke);
//     } else {
//       state.splice(-historyIndex, historyIndex, stroke);
//     }
//   });
// });

export const loadProject = createAsyncThunk(
  "LOAD_PROJECT",
  async (projectId: string) => {
    try {
      const { project } = await getProject(projectId);
      return project.strokes;
    } catch (err) {
      console.log(err);
    }
  }
);

const strokes = createSlice({
  name: "strokes",
  initialState: initialStrokes,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(endStroke, (state, action) => {
      const { historyIndex, stroke } = action.payload;
      if (historyIndex === 0) {
        state.push(stroke);
      } else {
        state.splice(-historyIndex, historyIndex, stroke);
      }
    });
    builder.addCase(loadProject.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default strokes.reducer;

export const strokesLengthSelector = (state: RootState) => state.strokes.length;

export const strokesSelector = (state: RootState) => state.strokes;

type SaveProjectArg = {
  projectName: string;
  thumbnail: string;
};

export const saveProject = createAsyncThunk(
  "SAVE_PROJECT",
  async ({ projectName, thumbnail }: SaveProjectArg, { getState }) => {
    try {
      const response = await newProject(
        projectName,
        (getState() as RootState)?.strokes,
        thumbnail
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
);
