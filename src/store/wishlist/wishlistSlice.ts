import { createSlice } from "@reduxjs/toolkit";
import { isString, type IWishlistState } from "@utils";

import actLikeToggle from "@store/wishlist/act/actLikeToggle";
import actGetWishlist from "@store/wishlist/act/actGetWishlist";

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
    wishlistCleanUp(state) {
      state.productsFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    // Wishlist
    builder.addCase(actLikeToggle.pending, (state) => {
      state.error = null;
    });
    builder.addCase(actLikeToggle.fulfilled, (state, action) => {
      const { id, type } = action.payload;

      if (type === "add" && !state.itemsId.includes(id)) {
        state.itemsId.push(id);
      } else {
        // remove from itemsId
        state.itemsId = state.itemsId.filter((el) => el !== id);

        // remove from productsFullInfo
        state.productsFullInfo = state.productsFullInfo.filter(
          (el) => el.id !== id
        );
      }
    });

    builder.addCase(actLikeToggle.rejected, (state, action) => {
      if (isString(action.payload)) {
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
      if (isString(action.payload)) state.error = action.payload;
    });
  },
});

export const { wishlistCleanUp } = wishlistSlice.actions;
export { actLikeToggle, actGetWishlist };
export default wishlistSlice.reducer;
