import { memo } from "react";
import { Form, Button } from "react-bootstrap";
import styles from "./styles.module.css";
import type { TProduct } from "@utils";

const { cartItem, product, productImg, productInfo, cartItemSelection } =
  styles;

type TCartItemProps = TProduct & {
  onChangeQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
};

const CartItem = ({
  id,
  title,
  price,
  img,
  max,
  quantity,
  onChangeQuantity,
  onRemoveItem,
}: TCartItemProps) => {
  // render options
  const renderOptions = Array.from({ length: max }, (_, i) => {
    const quantity = i + 1;
    return (
      <option key={quantity} value={quantity}>
        {quantity}
      </option>
    );
  });

  // handle quantity
  const handleQuantityChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newQuantity = parseInt(event.target.value, 10);
    onChangeQuantity(id, newQuantity);
  };

  return (
    <section className={cartItem}>
      <div className={product}>
        <div className={productImg}>
          <img src={img} alt={title} />
        </div>
        <div className={productInfo}>
          <h2>{title}</h2>
          <h3>{price.toFixed(2)} EGP</h3>
          <Button
            variant="secondary"
            style={{ color: "white", width: "100px" }}
            className="mt-auto"
            onClick={() => onRemoveItem(id)}
          >
            Remove
          </Button>
        </div>
      </div>

      <div className={cartItemSelection}>
        <span className="d-block mb-1">Quantity</span>
        <Form.Select value={quantity} onChange={handleQuantityChange}>
          {renderOptions}
        </Form.Select>
      </div>
    </section>
  );
};

export default memo(CartItem);
