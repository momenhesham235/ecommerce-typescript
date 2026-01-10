// functions
import axiosErrorHandler from "@utils/func/axiosErrorHandler";

// types
import type { IAuthState } from "@utils/types/reduxType/IAuthState";
import type { TUser } from "@utils/types/user";
import type { TProduct } from "@utils/types/product";
import type { TCategory } from "@utils/types/category";
import type { TLoadingStatus } from "@utils/types/shared";
import type {
  ICartState,
  IWishlistState,
} from "@utils/types/reduxType/IProductsBaseState";
import type {
  TCategoriesState,
  TProductsState,
} from "@utils/types/reduxType/IEntityState";
import { isString } from "@utils/types/guards";

// constants
import ROUTES from "@utils/constants/routesPath";

// validation
import { registerSchema } from "@utils/validation/registerSchema";
import type { TRegisterType } from "@utils/validation/registerSchema";
import { loginSchema } from "@utils/validation/loginSchema";
import type { TLoginType } from "@utils/validation/loginSchema";

export type {
  IAuthState,
  TUser,
  TProduct,
  TCategory,
  TLoadingStatus,
  ICartState,
  IWishlistState,
  TCategoriesState,
  TProductsState,
  TRegisterType,
  TLoginType,
};
export { axiosErrorHandler, isString, ROUTES, registerSchema, loginSchema };
