import { Link } from "react-router-dom";

import useCartPage from "./useCartPage";

import { Heading } from "@components/common";
import { Loading } from "@components/feedback";
import { CartItemList, CartSubtotalPrice } from "@components/eCommerce";
import { Button } from "react-bootstrap";

const Cart = () => {
  const { products, loading, error, changeQuantityHandler, removeItemHandler } =
    useCartPage();
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
