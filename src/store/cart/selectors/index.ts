import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@store/store";

/**
 * Selectors for cart
 * 1- likes useMemo and useCallback hooks memorize the result of the function
 * 2- listen up cart items changes if cart items changes the selector will re-run
 */
const getCartTotalQuantitySelector = createSelector(
  (state: RootState) => state.cart.items,
  (items) =>
    Object.values(items).reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    )
);

export { getCartTotalQuantitySelector };
