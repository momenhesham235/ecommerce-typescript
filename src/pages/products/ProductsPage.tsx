import { useParams } from "react-router-dom";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetProductsByCatPrefix,
  productsCleanUp,
} from "@store/products/productsSlice";

import { Container, Row, Col } from "react-bootstrap";
import { Product } from "@components/eCommerce";

const ProductsPage = () => {
  const { prefix } = useParams();

  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(actGetProductsByCatPrefix(prefix as string));

    return () => {
      dispatch(productsCleanUp());
    };
  }, [dispatch, prefix]);

  const productsList =
    products.length > 0
      ? products.map((prod) => (
          <Col
            xs={6}
            md={3}
            className="d-flex justify-content-center mb-5 mt-2"
            key={prod.id}
          >
            <Product {...prod} />
          </Col>
        ))
      : "there are no categories";

  return (
    <Container>
      <Row>{productsList}</Row>
    </Container>
  );
};

export default ProductsPage;
