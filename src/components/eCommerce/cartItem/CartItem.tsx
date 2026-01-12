import { memo } from "react";
import ProductInfo from "../productInfo/ProductInfo";
import { Form, Button } from "react-bootstrap";
import styles from "./styles.module.css";
import type { TProduct } from "@utils";

const { cartItem, cartItemSelection } = styles;

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
      <ProductInfo title={title} img={img} price={price} direction="column">
        <Button
          variant="secondary"
          style={{ color: "white", width: "100px" }}
          className="mt-auto"
          onClick={() => onRemoveItem(id)}
        >
          Remove
        </Button>
      </ProductInfo>

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
