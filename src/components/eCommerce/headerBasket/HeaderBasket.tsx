import Logo from "@assets/svg/cart.svg?react";
import { useNavigate } from "react-router-dom";

import { getCartTotalQuantitySelector } from "@store/cart/cartSlice";
import { useAppSelector } from "@store/hooks";
import styles from "./styles.module.css";

const { basketContainer, basketQuantity, pumpCartQuantity, basketCart } =
  styles;

const HeaderBasket = () => {
  const navigate = useNavigate();
  const totalQuantity = useAppSelector(getCartTotalQuantitySelector);

  const shouldAnimate = totalQuantity > 0;

  return (
    <div className={basketContainer} onClick={() => navigate("/cart")}>
      <div className={basketCart}>
        <Logo title="Basket logo" />
        <div
          key={totalQuantity}
          className={`${basketQuantity} ${shouldAnimate && pumpCartQuantity}`}
        >
          {totalQuantity}
        </div>
      </div>
      <h3>Cart</h3>
    </div>
  );
};

export default HeaderBasket;
