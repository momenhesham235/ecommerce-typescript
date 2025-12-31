import type { TCategory } from "@utils/types/category";
import { Link } from "react-router-dom";

import styles from "./styles.module.css";
const { category, categoryImg, categoryTitle } = styles;

const Category = ({ title, prefix, img }: TCategory) => {
  return (
    <div className={category}>
      <Link to={`products/${prefix}`}>
        <div className={categoryImg}>
          <img src={img} alt={title} />
        </div>
        <div className={categoryTitle}>{title}</div>
      </Link>
    </div>
  );
};

export default Category;
