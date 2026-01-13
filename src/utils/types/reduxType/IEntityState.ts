import type { TCategory, TProduct, TOrder, TLoadingStatus } from "@utils";

export type IEntityState<T> = {
  records: T[];
  loading: TLoadingStatus;
  error: string | null;
};

export type TCategoriesState = IEntityState<TCategory>;

export type TProductsState = IEntityState<TProduct>;

export type TOrderState = IEntityState<TOrder>;
