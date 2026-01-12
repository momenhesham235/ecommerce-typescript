import { Link } from "react-router-dom";

import useCartPage from "./useCartPage";

import { Heading } from "@components/common";
import { Loading, LottieHandler } from "@components/feedback";
import { CartItemList, CartSubtotalPrice } from "@components/eCommerce";
import { Button } from "react-bootstrap";

import { ROUTES } from "@utils";

const Cart = () => {
  const {
    products,
    loading,
    error,
    placeOrderStatus,
    changeQuantityHandler,
    removeItemHandler,
  } = useCartPage();
  return (
    <>
      <Heading title="Your Cart" />
      <Loading loading={loading} error={error} type="cart">
        {products.length ? (
          <>
            <CartItemList
              products={products}
              onChangeQuantity={changeQuantityHandler}
              onRemoveItem={removeItemHandler}
            />
            <CartSubtotalPrice products={products} />
          </>
        ) : placeOrderStatus === "succeeded" ? (
          <LottieHandler type="success" message="Order Placed Successfully!" />
        ) : (
          <>
            <LottieHandler type="empty" message="Your cart is empty" />
            <Link
              to={ROUTES.CATEGORIES}
              className="d-flex justify-content-center"
            >
              <Button variant="primary" className="my-2">
                Shop Now
              </Button>
            </Link>
          </>
        )}
      </Loading>
    </>
  );
};

export default Cart;
