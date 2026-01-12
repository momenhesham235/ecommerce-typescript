import { memo } from "react";

import useProduct from "./hooks/useProduct";
import { LikeFillIcon, LikeIcon } from "@assets";
import ProductInfo from "../productInfo/ProductInfo";

import { Button, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
const { maximumNotice, wishList } = styles;

import type { TProduct } from "@utils";

const Product = ({
  id,
  title,
  price,
  img,
  max,
  quantity,
  isLiked,
}: TProduct) => {
  // hook useProduct
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
    <ProductInfo title={title} img={img} price={price}>
      <div className={wishList} onClick={handelLikeToggle}>
        {isAddingWishlist ? (
          <Spinner animation="border" size="sm" variant="primary" />
        ) : isLiked ? (
          <LikeFillIcon />
        ) : (
          <LikeIcon />
        )}
      </div>

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
    </ProductInfo>
  );
};

export default memo(Product);
