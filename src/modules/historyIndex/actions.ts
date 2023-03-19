//redux
// import { Stroke } from "../../utils/types";
// export const UNDO = "UNDO";
// export const REDO = "REDO";

// export const END_STROKE = "END_STROKE";

// export type HistoryIndexAction =
//   | {
//       type: typeof END_STROKE;
//       payload: { stroke: Stroke; historyIndex: number };
//     }
//   | { type: typeof UNDO; payload: number }
//   | { type: typeof REDO };

// export const undo = (undoLimit:number): HistoryIndexAction => {
//   return { type: UNDO, payload: undoLimit};
// };

// export const redo = (): HistoryIndexAction => {
//   return { type: REDO };
// };

//rtk
import { AnyAction, createAction } from "@reduxjs/toolkit";

export type Action =
  | AnyAction
  | ReturnType<typeof undo>
  | ReturnType<typeof redo>;

export const undo = createAction<number>("UNDO");
export const redo = createAction("REDO");