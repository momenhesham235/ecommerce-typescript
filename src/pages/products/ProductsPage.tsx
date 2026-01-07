import useProductsPage from "./useProductsPage";

import { GridList, Heading } from "@components/common";
import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import type { TProduct } from "@utils";

const Products = () => {
  const { productsFullInfo, loading, error, prefix } = useProductsPage();
  return (
    <>
      <Heading title={`${prefix} products`} />
      <Loading loading={loading} error={error} type="product">
        <GridList<TProduct>
          records={productsFullInfo}
          renderItem={(record) => <Product {...record} />}
          emptyMessage="Your product list is empty"
        />
      </Loading>
    </>
  );
};

export default Products;
