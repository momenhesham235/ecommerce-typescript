import type { TProduct, TLoadingStatus } from "@utils";

interface IProductsBaseState {
  productsFullInfo: TProduct[];
  loading: TLoadingStatus;
  error: null | string;
}

export interface ICartState extends IProductsBaseState {
  items: Record<number, number>;
}

export interface IWishlistState extends IProductsBaseState {
  itemsId: number[];
}
