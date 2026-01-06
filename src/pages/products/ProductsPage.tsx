import useProductsPage from "./useProductsPage";

import { GridList, Heading } from "@components/common";
import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import type { TProduct } from "@utils/types/product";

const Products = () => {
  const { productsFullInfo, loading, error, params } = useProductsPage();
  return (
    <>
      <Heading title={`${params.prefix} products`} />
      <Loading loading={loading} error={error}>
        <GridList<TProduct>
          records={productsFullInfo}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  );
};

export default Products;
