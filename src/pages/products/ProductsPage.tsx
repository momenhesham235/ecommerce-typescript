import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetProductsByCatPrefix,
  productsCleanUp,
} from "@store/products/productsSlice";

import { Container } from "react-bootstrap";
import { GridList } from "@components/common";
import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";

const ProductsPage = () => {
  const { prefix } = useParams();

  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(actGetProductsByCatPrefix(prefix as string));

    return () => {
      dispatch(productsCleanUp());
    };
  }, [dispatch, prefix]);

  return (
    <Container>
      <Loading loading={loading} error={error}>
        <GridList
          records={products}
          renderItem={(cat) => <Product {...cat} />}
        />
      </Loading>
    </Container>
  );
};

export default ProductsPage;
