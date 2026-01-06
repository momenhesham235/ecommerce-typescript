import { memo } from "react";

import useProduct from "./hooks/useProduct";
import { LikeFillIcon, LikeIcon } from "@assets";

import { Button, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
const { product, productImg, maximumNotice, wishList } = styles;

import type { TProduct } from "@utils/types/product";

const Product = ({
  id,
  title,
  price,
  img,
  max,
  quantity,
  isLiked,
}: TProduct) => {
  // Logic & Hooks
  const {
    isLoading,
    isAddingWishlist,
    quantityReachedToMax,
    currentRemainingQuantity,
    handleAddToCart,
    handelLikeToggle,
  } = useProduct({
    id,
    max,
    quantity,
  } as TProduct);

  return (
    <div className={product}>
      <div className={wishList} onClick={handelLikeToggle}>
        {isAddingWishlist ? (
          <Spinner animation="border" size="sm" variant="primary" />
        ) : isLiked ? (
          <LikeFillIcon />
        ) : (
          <LikeIcon />
        )}
      </div>

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
