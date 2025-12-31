import { createSlice } from "@reduxjs/toolkit";
import actGetCategories from "@store/categories/act/actGetCategories";
import type { TCategory } from "@utils/types/category";
import type { TLoadingStatus } from "@utils/types/shared";

interface ICategoriesState {
  categories: TCategory[];
  loading: TLoadingStatus;
  error: null | string;
}

const initialState: ICategoriesState = {
  categories: [],
  loading: "idle",
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actGetCategories.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetCategories.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.categories = action.payload;
      })
      .addCase(actGetCategories.rejected, (state, action) => {
        state.loading = "failed";
        if (action.payload && typeof action.payload === "string")
          state.error = action.payload;
      });
  },
});

export { actGetCategories };
export default categoriesSlice.reducer;
