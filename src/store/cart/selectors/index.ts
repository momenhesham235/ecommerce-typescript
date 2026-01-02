import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@store/store";

const getCartTotalQuantitySelector = createSelector(
  (state: RootState) => state.cart.items,
  (items) =>
    Object.values(items).reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    )
);

export { getCartTotalQuantitySelector };
