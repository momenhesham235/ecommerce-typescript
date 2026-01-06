import CartItem from "@components/eCommerce/cartItem/CartItem";

import type { TProduct } from "@utils";

type TCartItemListProps = {
  products: TProduct[];
  onChangeQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
};

const CartItemList = ({
  products,
  onChangeQuantity,
  onRemoveItem,
}: TCartItemListProps) => {
  const renderList = products.map((prod) => (
    <CartItem
      key={prod.id}
      {...prod}
      onChangeQuantity={onChangeQuantity}
      onRemoveItem={onRemoveItem}
    />
  ));

  return <>{renderList}</>;
};

export default CartItemList;
