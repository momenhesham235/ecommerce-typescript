import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetProductsByCatPrefix,
  productsCleanUp,
} from "@store/products/productsSlice";

import { Container } from "react-bootstrap";
import { GridList, Heading } from "@components/common";
import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";

const ProductsPage = () => {
  const { prefix } = useParams();

  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(
    (state) => state.products
  );

  const cartItems = useAppSelector((state) => state.cart.items);

  const productFullInfo = products.map((prod) => ({
    ...prod,
    quantity: cartItems[prod.id] || 0,
  }));

  useEffect(() => {
    dispatch(actGetProductsByCatPrefix(prefix as string));

    return () => {
      dispatch(productsCleanUp());
    };
  }, [dispatch, prefix]);

  return (
    <Container>
      <Heading>
        <span className="text-capitalize text-info-emphasis">{prefix}</span> Products
      </Heading>
      <Loading loading={loading} error={error}>
        <GridList
          records={productFullInfo}
          renderItem={(prod) => <Product {...prod} />}
        />
      </Loading>
    </Container>
  );
};

export default ProductsPage;
