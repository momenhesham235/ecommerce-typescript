import { createSlice } from "@reduxjs/toolkit";
import actGetProductsByCatPrefix from "@store/products/act/actGetProductsByCatPrefix";
import type { TProduct } from "@utils/types/product";
import type { TLoadingStatus } from "@utils/types/shared";
interface IProductsState {
  products: TProduct[];
  loading: TLoadingStatus;
  error: string | null;
}

const initialState: IProductsState = {
  products: [],
  loading: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsCleanUp: (state) => {
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProductsByCatPrefix.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductsByCatPrefix.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.products = action.payload;
    });
    builder.addCase(actGetProductsByCatPrefix.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export const { productsCleanUp } = productsSlice.actions;
export { actGetProductsByCatPrefix };
export default productsSlice.reducer;
