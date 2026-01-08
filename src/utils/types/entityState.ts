import type { TLoadingStatus } from "./shared";

export interface IEntityState<T> {
  records: T[];
  loading: TLoadingStatus;
  error: string | null;
}
