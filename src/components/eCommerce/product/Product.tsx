import { useState, memo } from "react";

import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/cart/cartSlice";

import { Button, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
const { product, productImg, maximumNotice } = styles;

import type { TProduct } from "@utils/types/product";

const Product = ({ id, title, price, img, max, quantity }: TProduct) => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const currentRemainingQuantity = max - (quantity ?? 0);
  const quantityReachedToMax = currentRemainingQuantity <= 0;

  const handleAddToCart = () => {
    if (isLoading) return;

    setIsLoading(true);
    dispatch(addToCart(id));

    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <div className={product}>
      <div className={productImg}>
        <img src={img} alt={title} />
      </div>
      <h2>{title}</h2>
      <h3>{price.toFixed(2)} EGP</h3>
      <p className={maximumNotice}>
        {quantityReachedToMax
          ? "You reach to the limit"
          : `You can add ${currentRemainingQuantity} item(s)`}
      </p>
      <Button
        variant="info"
        style={{ color: "white" }}
        onClick={handleAddToCart}
        disabled={isLoading || quantityReachedToMax}
      >
        {isLoading ? (
          <>
            <Spinner animation="border" size="sm" /> Loading...
          </>
        ) : (
          "Add to cart"
        )}
      </Button>
    </div>
  );
};

export default memo(Product);
