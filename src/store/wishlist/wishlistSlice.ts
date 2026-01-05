import { createSlice } from "@reduxjs/toolkit";
import type { TProduct } from "@utils/types/product";
import type { TLoadingStatus } from "@utils/types/shared";

import actLikeToggle from "@store/wishlist/act/actLikeToggle";
import actGetWishlist from "@store/wishlist/act/actGetWishlist";

interface IWishlistState {
  itemsId: number[];
  productsFullInfo: TProduct[];
  loading: TLoadingStatus;
  error: null | string;
}

const initialState: IWishlistState = {
  itemsId: [],
  productsFullInfo: [],
  loading: "idle",
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    clearWishlist(state) {
      state.itemsId = [];
      state.productsFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    // Wishlist
    builder.addCase(actLikeToggle.pending, (state) => {
      state.error = null;
    });
    builder.addCase(actLikeToggle.fulfilled, (state, action) => {
      if (action.payload.type === "add") {
        state.itemsId.push(action.payload.id);
      } else {
        state.itemsId = state.itemsId.filter((id) => id !== action.payload.id);
        state.productsFullInfo = state.productsFullInfo.filter(
          (el) => el.id !== action.payload.id
        );
      }
    });
    builder.addCase(actLikeToggle.rejected, (state, action) => {
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });

    // get wishlist
    builder.addCase(actGetWishlist.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetWishlist.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.productsFullInfo = action.payload;
    });
    builder.addCase(actGetWishlist.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export const { clearWishlist } = wishlistSlice.actions;
export { actLikeToggle, actGetWishlist };
export default wishlistSlice.reducer;
