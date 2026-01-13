import type { TProduct } from "@utils";

export type TOrder = {
  id: number;
  items: TProduct[];
  subtotal: number;
};
