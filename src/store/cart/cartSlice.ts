import { createSlice } from "@reduxjs/toolkit";
import { getCartTotalQuantitySelector } from "@store/cart/selectors";
import type { TProduct } from "@utils/types/product";

interface ICartState {
  items: { [key: number]: number }; // productId: quantity => index signature
  productsFullInfo: TProduct[];
}

const initialState: ICartState = {
  items: {},
  productsFullInfo: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { productId } = action.payload;
      if (state.items[productId]) {
        state.items[productId]++;
      } else {
        state.items[productId] = 1;
      }
    },
  },
});

/**
 * Selectors for cart
 * 1- likes useMemo and useCallback hooks memorize the result of the function
 * 2- listen up cart items changes if cart items changes the selector will re-run
 */

export { getCartTotalQuantitySelector };
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
