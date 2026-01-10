import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetWishlist, wishlistCleanUp } from "@store/wishlist/wishlistSlice";

const useWishlistPage = () => {
  const dispatch = useAppDispatch();

  const { productsFullInfo, loading, error } = useAppSelector(
    (state) => state.wishlist
  );
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItems = useAppSelector((state) => state.wishlist.itemsId);

  useEffect(() => {
    dispatch(actGetWishlist("productsFullInfo"));

    return () => {
      dispatch(wishlistCleanUp());
    };
  }, [dispatch]);

  const products = productsFullInfo.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: wishlistItems.includes(el.id),
  }));
  return { products, loading, error };
};

export default useWishlistPage;
