import { isString } from "@utils";
import type { AsyncThunk } from "@reduxjs/toolkit";

const createEntityInitialState = <T>(): IEntityState<T> => ({
  itemsId: [],
  records: [],
  loading: "idle",
  error: null,
});

export const createEntityExtraReducers = <T>(
  builder: any,
  asyncThunk: AsyncThunk<T[], any, any>
) => {
  builder
    .addCase(asyncThunk.pending, (state: IEntityState<T>) => {
      state.loading = "pending";
      state.error = null;
    })
    .addCase(asyncThunk.fulfilled, (state: IEntityState<T>, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    })
    .addCase(asyncThunk.rejected, (state: IEntityState<T>, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
};
