import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetWishlist, clearWishlist } from "@store/wishlist/wishlistSlice";

import type { TProduct } from "@utils/types/product";

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
      dispatch(clearWishlist());
    };
  }, [dispatch]);

  console.log(productsFullInfo);

  const products = productsFullInfo.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: wishlistItems.includes(el.id),
  }));
  return (
    <>
      <Heading>
        <span>Your</span> Wishlist
      </Heading>
      <Loading loading={loading} error={error}>
        <GridList<TProduct>
          records={products}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  );
};

export default WishlistPage;
