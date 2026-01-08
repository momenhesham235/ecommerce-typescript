// functions
import axiosErrorHandler from "@utils/func/axiosErrorHandler";

// types
import type { TProduct } from "@utils/types/product";
import type { TCategory } from "@utils/types/category";
import type { TLoadingStatus } from "@utils/types/shared";
import { isString } from "@utils/types/guards";

// constants
import ROUTES from "@utils/constants/routesPath";

// validation
import { registerSchema } from "@utils/validation/registerSchema";
import type { TRegisterType } from "@utils/validation/registerSchema";
import { loginSchema } from "@utils/validation/loginSchema";
import type { TLoginType } from "@utils/validation/loginSchema";

export { axiosErrorHandler, isString, ROUTES, registerSchema, loginSchema };

export type { TLoadingStatus, TProduct, TCategory, TRegisterType, TLoginType };
