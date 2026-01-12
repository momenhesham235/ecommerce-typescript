import { createSlice } from "@reduxjs/toolkit";
import { isString, type TOrderState } from "@utils";

import actPlaceOrder from "./act/actPlaceOrder";

const initialState: TOrderState = {
  records: [],
  loading: "idle",
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetOrderStatus: (state) => {
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actPlaceOrder.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actPlaceOrder.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(actPlaceOrder.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });
  },
});

export { actPlaceOrder };
export const { resetOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
