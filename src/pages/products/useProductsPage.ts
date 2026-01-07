import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetProductsByCatPrefix,
  productsCleanUp,
} from "@store/products/productsSlice";
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";

const useProductsPage = () => {
  const prefix = useLoaderData() as string;

  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector((state) => state.products);
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItems = useAppSelector((state) => state.wishlist.itemsId);

  const productsFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: wishlistItems.includes(el.id),
  }));

  useEffect(() => {
    const promise = dispatch(actGetProductsByCatPrefix(prefix));

    return () => {
      promise.abort();
      dispatch(productsCleanUp());
    };
  }, [dispatch, prefix]);

  return { productsFullInfo, loading, error, prefix };
};

export default useProductsPage;
