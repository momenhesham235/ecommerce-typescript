import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import { type TToast } from "@utils";

interface IToastState {
  records: TToast[];
}

const initialState: IToastState = {
  records: [],
};

const toastSlice = createSlice({
  name: "toasts",
  initialState,
  reducers: {
    removeToast: (state, action) => {
      state.records = state.records.filter((el) => el.id !== action.payload);
    },
    addToast: (state, action: PayloadAction<TToast>) => {
      state.records.push({
        id: nanoid(),
        title: action.payload.title || action.payload.type,
        type: action.payload.type,
        message: action.payload.message,
        delayAnimation: action.payload.delayAnimation || false,
        onCloseToast: action.payload.onCloseToast,
      });
    },
    stopDelayAnimation: (state, action) => {
      state.records.map((el) => {
        if (el.id === action.payload) {
          return (el.delayAnimation = false);
        }
        return el;
      });
    },
  },
});
export const { removeToast, addToast, stopDelayAnimation } = toastSlice.actions;
export default toastSlice.reducer;
