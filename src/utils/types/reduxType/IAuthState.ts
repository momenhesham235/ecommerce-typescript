import type { TLoadingStatus } from "@utils";
import type { TUser } from "@utils";

export interface IAuthState {
  user: TUser | null;
  accessToken: string | null;
  loading: TLoadingStatus;
  error: string | null;
}
