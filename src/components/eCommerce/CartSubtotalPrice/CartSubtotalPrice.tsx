import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actPlaceOrder } from "@store/orders/ordersSlice";
import { cartsCleanUpAfterPlaceOrder } from "@store/cart/cartSlice";

import { useAuthAction } from "@hooks/useAuthAction";
import { Button, Modal, Spinner } from "react-bootstrap";
import type { TProduct } from "@utils";
import styles from "./styles.module.css";

type TCartSubtotalProps = {
  products: TProduct[];
};

const CartSubtotalPrice = ({ products }: TCartSubtotalProps) => {
  const dispatch = useAppDispatch();
  const { requireAuth } = useAuthAction();

  const { loading, error } = useAppSelector((state) => state.orders);
  const [showModal, setShowModal] = useState(false);

  const subtotal = products.reduce((acc, product) => {
    if (product.quantity && typeof product.quantity === "number") {
      return acc + product.price * product.quantity;
    }
    return acc;
  }, 0);

  const openConfirmModal = () => {
    requireAuth(() => {
      setShowModal(true);
    });
  };

  const closeConfirmModal = () => {
    setShowModal(false);
  };

  const placeOrderHandler = () => {
    dispatch(actPlaceOrder(subtotal))
      .unwrap()
      .then(() => {
        dispatch(cartsCleanUpAfterPlaceOrder());
      });

    closeConfirmModal();
  };

  return (
    <>
      <Modal show={showModal} onHide={closeConfirmModal} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Placing Order</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Are you sure you want to place order with Subtotal:
          {subtotal.toFixed(2)} EGP
          {!loading && error && (
            <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeConfirmModal}>
            Close
          </Button>
          <Button
            variant="info"
            style={{ color: "white" }}
            onClick={placeOrderHandler}
            disabled={loading === "pending"}
          >
            {loading === "pending" ? (
              <>
                <Spinner animation="border" size="sm" /> Loading...
              </>
            ) : (
              "Confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <section className={styles.container}>
        <span>Subtotal:</span>
        <span> {subtotal.toFixed(2)} EGP</span>
      </section>

      <section className={styles.container}>
        <span></span>
        <span>
          <Button
            variant="primary"
            style={{ color: "white" }}
            onClick={openConfirmModal}
          >
            Place Order
          </Button>
        </span>
      </section>
    </>
  );
};

export default CartSubtotalPrice;
