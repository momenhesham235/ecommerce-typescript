import { useNavigate } from "react-router-dom";

import { useAppSelector } from "@store/hooks";

import { WishList } from "@assets/index";
import styles from "./styles.module.css";
const { container, totalNum, pumpAnimate, iconWrapper } = styles;

const HeaderWishList = () => {
  const navigate = useNavigate();
  const totalQuantity = useAppSelector(
    (state) => state.wishlist.itemsId.length
  );

  const shouldAnimate = totalQuantity > 0;

  return (
    <div className={container} onClick={() => navigate("/wishlist")}>
      <div className={iconWrapper}>
        <WishList title="Wishlist logo" />
        {totalQuantity > 0 && (
          <div
            key={totalQuantity}
            className={`${totalNum} ${shouldAnimate && pumpAnimate}`}
          >
            {totalQuantity}
          </div>
        )}
      </div>
      <h3>Wishlist</h3>
    </div>
  );
};

export default HeaderWishList;
