import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetProductsByItems,
  cartItemChangeQuantity,
  cartItemRemove,
  CartsCleanUp,
} from "@store/cart/cartSlice";
import { Heading } from "@components/common";
import { Loading } from "@components/feedback";
import { CartItemList, CartSubtotalPrice } from "@components/eCommerce";
import { Button } from "react-bootstrap";

const Cart = () => {
  const dispatch = useAppDispatch();
  const { items, productsFullInfo, loading, error } = useAppSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(actGetProductsByItems());

    return () => {
      dispatch(CartsCleanUp());
    };
  }, [dispatch]);

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

  return (
    <>
      <Heading title="Your Cart" />
      <Loading loading={loading} error={error}>
        {products.length ? (
          <>
            <CartItemList
              products={products}
              onChangeQuantity={changeQuantityHandler}
              onRemoveItem={removeItemHandler}
            />
            <CartSubtotalPrice products={products} />
          </>
        ) : (
          <div>
            <p className="text-center">
              Start adding some products to your cart
            </p>
            <p className="text-center">👇</p>
            <Button variant="link" className="d-block mx-auto">
              <Link to="/categories" className="">
                Shop Now
              </Link>
            </Button>
          </div>
        )}
      </Loading>
    </>
  );
};

export default Cart;
