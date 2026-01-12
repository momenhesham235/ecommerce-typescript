// functions
import axiosErrorHandler from "@utils/func/axiosErrorHandler";

// types
import type { IAuthState } from "@utils/types/reduxType/IAuthState";
import type { TUser } from "@utils/types/user.type";
import type { TProduct } from "@utils/types/product.type";
import type { TCategory } from "@utils/types/category.type";
import type { TOrderItem } from "@utils/types/order.type";
import type { TLoadingStatus } from "@utils/types/shared.type";
// types -> Redux types
import type {
  ICartState,
  IWishlistState,
} from "@utils/types/reduxType/IProductsBaseState";
import type {
  TCategoriesState,
  TProductsState,
  TOrderState,
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
  TOrderItem,
  TLoadingStatus,
  ICartState,
  IWishlistState,
  TCategoriesState,
  TProductsState,
  TOrderState,
  TRegisterType,
  TLoginType,
};
export { axiosErrorHandler, isString, ROUTES, registerSchema, loginSchema };
