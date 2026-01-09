import { createSlice } from "@reduxjs/toolkit";
import actGetCategories from "@store/categories/act/actGetCategories";
import { type TCategoriesState, isString } from "@utils";

const initialState: TCategoriesState = {
  records: [],
  loading: "idle",
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    categoriesCleanUp: (state) => {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetCategories.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetCategories.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(actGetCategories.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });
  },
});

export { actGetCategories };
export const { categoriesCleanUp } = categoriesSlice.actions;
export default categoriesSlice.reducer;
