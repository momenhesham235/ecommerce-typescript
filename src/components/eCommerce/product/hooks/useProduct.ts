import { useState } from "react";

import { useAppDispatch } from "@store/hooks";
import { actLikeToggle } from "@store/wishlist/wishlistSlice";
import { addToCart } from "@store/cart/cartSlice";
import { addToast } from "@store/toasts/toastsSlice";
import type { TProduct } from "@utils";
import { useAuthAction } from "@hooks/useAuthAction";

const useProduct = ({ id, max, quantity, isLiked, title }: TProduct) => {
  const dispatch = useAppDispatch();
  const { requireAuth } = useAuthAction();

  const [isLoading, setIsLoading] = useState(false);
  const [isAddingWishlist, setIsAddingWishlist] = useState(false);

  const currentRemainingQuantity = max - (quantity ?? 0);
  const quantityReachedToMax = currentRemainingQuantity <= 0;

  const handleAddToCart = () => {
    if (isLoading) return;

    setIsLoading(true);

    dispatch(addToCart(id));

    // show success toast
    dispatch(
      addToast({
        type: "success",
        title: "add to cart",
        message: `Product "${title}" added to cart successfully!`,
      })
    );

    // reached to maximum show warning after success toast
    if (currentRemainingQuantity - 1 <= 0) {
      dispatch(
        addToast({
          type: "warning",
          title: "add to cart",
          message: `Product "${title}" is out of stock!`,
          delayAnimation: true,
        })
      );
    }

    setTimeout(() => setIsLoading(false), 300);
  };

  const handelLikeToggle = () => {
    requireAuth(async () => {
      if (isAddingWishlist) return;

      setIsAddingWishlist(true);

      try {
        await dispatch(actLikeToggle(id)).unwrap();

        dispatch(
          addToast({
            type: isLiked ? "warning" : "success",
            title: "wishlist",
            message: isLiked
              ? `Product "${title}" removed from wishlist!`
              : `Product "${title}" added to wishlist!`,
          })
        );
      } catch {
        dispatch(
          addToast({
            type: "danger",
            title: "wishlist",
            message: "Something went wrong, please try again.",
          })
        );
      } finally {
        setIsAddingWishlist(false);
      }
    });
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
