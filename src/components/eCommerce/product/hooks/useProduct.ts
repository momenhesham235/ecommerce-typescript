import { useState } from "react";

import { useAppDispatch } from "@store/hooks";
import { actLikeToggle } from "@store/wishlist/wishlistSlice";
import { addToCart } from "@store/cart/cartSlice";
import type { TProduct } from "@utils";

/**
 * @description useProduct
 * @param {TProduct} { id, max, quantity }
 * @returns isLoading, isAddingWishlist, quantityReachedToMax, currentRemainingQuantity
 */
const useProduct = ({ id, max, quantity }: TProduct) => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isAddingWishlist, setIsAddingWishlist] = useState(false);

  const currentRemainingQuantity = max - (quantity ?? 0);
  const quantityReachedToMax = currentRemainingQuantity <= 0;

  const handleAddToCart = () => {
    if (isLoading) return;

    setIsLoading(true);
    dispatch(addToCart(id));

    setTimeout(() => setIsLoading(false), 300);
  };

  const handelLikeToggle = () => {
    if (!isAddingWishlist) {
      setIsAddingWishlist(true);
      dispatch(actLikeToggle(id))
        .unwrap()
        .then(() => setIsAddingWishlist(false))
        .catch(() => setIsAddingWishlist(false));
    }
  };
  return {
    isLoading,
    isAddingWishlist,
    quantityReachedToMax,
    currentRemainingQuantity,
    handleAddToCart,
    handelLikeToggle,
  };
};

export default useProduct;
