import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetWishlist, wishlistCleanUp } from "@store/wishlist/wishlistSlice";

import type { TProduct } from "@utils";

import { GridList, Heading } from "@components/common";
import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";

const WishlistPage = () => {
  const dispatch = useAppDispatch();

  const { productsFullInfo, loading, error } = useAppSelector(
    (state) => state.wishlist
  );
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItems = useAppSelector((state) => state.wishlist.itemsId);

  useEffect(() => {
    dispatch(actGetWishlist());

    return () => {
      dispatch(wishlistCleanUp());
    };
  }, [dispatch]);

  const products = productsFullInfo.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: wishlistItems.includes(el.id),
  }));
  return (
    <>
      <Heading title="Your Wishlist" />
      <Loading loading={loading} error={error} type="product">
        <GridList<TProduct>
          records={products}
          renderItem={(record) => <Product {...record} />}
          emptyMessage="Your wishlist is empty"
        />
      </Loading>
    </>
  );
};

export default WishlistPage;
