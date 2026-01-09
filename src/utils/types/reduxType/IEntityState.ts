import type { TCategory, TLoadingStatus, TProduct } from "@utils";

export type IEntityState<T> = {
  records: T[];
  loading: TLoadingStatus;
  error: string | null;
};

export type TCategoriesState = IEntityState<TCategory>;

export type TProductsState = IEntityState<TProduct>;
