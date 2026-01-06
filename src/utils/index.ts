// functions
import axiosErrorHandler from "@utils/func/axiosErrorHandler";

// types
import type { TProduct } from "@utils/types/product";
import type { TCategory } from "@utils/types/category";
import type { TLoadingStatus } from "@utils/types/shared";

// guards
import { isString } from "@utils/types/guards";

export { axiosErrorHandler, isString };
export type { TLoadingStatus, TProduct, TCategory };
