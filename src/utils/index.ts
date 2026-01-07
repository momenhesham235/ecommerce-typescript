// functions
import axiosErrorHandler from "@utils/func/axiosErrorHandler";

// types
import type { TProduct } from "@utils/types/product";
import type { TCategory } from "@utils/types/category";
import type { TLoadingStatus } from "@utils/types/shared";

// guards
import { isString } from "@utils/types/guards";

// Routes
import ROUTES from "@utils/constants/routesPath";

export { axiosErrorHandler, isString, ROUTES };
export type { TLoadingStatus, TProduct, TCategory };
