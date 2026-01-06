import { useNavigate } from "react-router-dom";

import styles from "./styles.module.css";
const { container, totalNum, pumpAnimate, iconWrapper } = styles;

type THeaderCounterProps = {
  totalQuantity: number;
  svgIcon: React.ReactNode;
  title: string;
  to: string;
};

const HeaderCounter = ({
  totalQuantity,
  svgIcon,
  title,
  to,
}: THeaderCounterProps) => {
  const navigate = useNavigate();

  return (
    <div className={container} onClick={() => navigate(to)}>
      <div className={iconWrapper}>
        {svgIcon}
        {totalQuantity > 0 && (
          <div key={totalQuantity} className={`${totalNum} ${pumpAnimate}`}>
            {totalQuantity}
          </div>
        )}
      </div>
      <h3>{title}</h3>
    </div>
  );
};

export default HeaderCounter;
