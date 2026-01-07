import { Link } from "react-router-dom";

import useCartPage from "./useCartPage";

import { Heading } from "@components/common";
import { Loading, LottieHandler } from "@components/feedback";
import { CartItemList, CartSubtotalPrice } from "@components/eCommerce";
import { Button } from "react-bootstrap";

import { ROUTES } from "@utils";

const Cart = () => {
  const { products, loading, error, changeQuantityHandler, removeItemHandler } =
    useCartPage();
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
        ) : (
          <section className="d-flex flex-column align-items-center">
            <LottieHandler type="empty" message="Your cart is empty" />
            <Link to={ROUTES.CATEGORIES}>
              <Button variant="primary" className="my-2">
                Shop Now
              </Button>
            </Link>
          </section>
        )}
      </Loading>
    </>
  );
};

export default Cart;
