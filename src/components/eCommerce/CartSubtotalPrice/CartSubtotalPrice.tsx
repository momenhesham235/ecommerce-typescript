import type { TProduct } from "@utils/types/product";
import styles from "./styles.module.css";

type TCartSubtotalProps = {
  products: TProduct[];
};

const CartSubtotalPrice = ({ products }: TCartSubtotalProps) => {
  const subtotal = products.reduce((acc, product) => {
    if (product.quantity && typeof product.quantity === "number") {
      return acc + product.price * product.quantity;
    }
    return acc;
  }, 0);

  return (
    <div className={styles.container}>
      <span>Subtotal:</span>
      <span> {subtotal.toFixed(2)} EGP</span>
    </div>
  );
};

export default CartSubtotalPrice;
