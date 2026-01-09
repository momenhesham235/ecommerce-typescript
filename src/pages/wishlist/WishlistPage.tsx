import useWishlistPage from "./useWishlistPage";

import { GridList, Heading } from "@components/common";
import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import type { TProduct } from "@utils/index";

const WishlistPage = () => {
  const { products, loading, error } = useWishlistPage();
  return (
    <>
      <Heading title="Your Wishlist" />
      <Loading loading={loading} error={error} type="product">
        <GridList<TProduct>
          records={products}
          renderItem={(record) => <Product {...record} />}
          emptyMessage="Your wishlist is empty"
        />
      </Loading>
    </>
  );
};

export default WishlistPage;
