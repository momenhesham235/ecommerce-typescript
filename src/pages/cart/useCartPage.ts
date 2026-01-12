import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetProductsByItems,
  cartItemChangeQuantity,
  cartItemRemove,
  CartsCleanUp,
} from "@store/cart/cartSlice";
import { resetOrderStatus } from "@store/orders/ordersSlice";

const useCartPage = () => {
  const dispatch = useAppDispatch();

  const { items, productsFullInfo, loading, error } = useAppSelector(
    (state) => state.cart
  );

  const placeOrderStatus = useAppSelector((state) => state.orders.loading);

  const products = productsFullInfo.map((el) => ({
    ...el,
    quantity: items[el.id],
  }));

  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      dispatch(cartItemChangeQuantity({ id, quantity }));
    },
    [dispatch]
  );

  const removeItemHandler = useCallback(
    (id: number) => {
      dispatch(cartItemRemove(id));
    },
    [dispatch]
  );

  useEffect(() => {
    const promise = dispatch(actGetProductsByItems());

    return () => {
      promise.abort();
      dispatch(CartsCleanUp());
      dispatch(resetOrderStatus());
    };
  }, [dispatch]);
  return {
    products,
    loading,
    error,
    placeOrderStatus,
    changeQuantityHandler,
    removeItemHandler,
  };
};

export default useCartPage;
