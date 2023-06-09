// import { AnyAction } from "redux";
// import { Point, Stroke } from "../../utils/types";

// export const BEGIN_STROKE = "BEGIN_STROKE";
// export const UPDATE_STROKE = "UPDATE_STROKE";
// export const SET_STROKE_COLOR = "SET_STROKE_COLOR";
// export const END_STROKE = "END_STROKE";

// export type Action =
//   | AnyAction
//   | {
//       type: typeof BEGIN_STROKE;
//       payload: Point;
//     }
//   | {
//       type: typeof UPDATE_STROKE;
//       payload: Point;
//     }
//   | {
//       type: typeof SET_STROKE_COLOR;
//       payload: string;
//     }
//   | {
//       type: typeof END_STROKE;
//       payload: { stroke: Stroke; historyIndex: number };
//     };

// export const beginStroke = (x: number, y: number) => {
//   return { type: BEGIN_STROKE, payload: { x, y } };
// };

// export const updateStroke = (x: number, y: number) => {
//   return { type: UPDATE_STROKE, payload: { x, y } };
// };

// export const setStrokeColor = (color: string) => {
//   return { type: SET_STROKE_COLOR, payload: color };
// };

// export const endStroke = (historyIndex: number, stroke: Stroke) => {
//   return { type: END_STROKE, payload: { historyIndex, stroke } };
// };

//rtk
import { AnyAction, createAction } from "@reduxjs/toolkit";
import { Point } from "../../utils/types";

export type Action =
  | AnyAction
  | ReturnType<typeof beginStroke>
  | ReturnType<typeof updateStroke>
  | ReturnType<typeof setStrokeColor>;

export const beginStroke = createAction<Point>("BEGIN_STROKE")
export const updateStroke = createAction<Point>("UPDATE_STROKE")
export const setStrokeColor = createAction<string>("SET_STROKE_COLOR")