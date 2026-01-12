import type { TProduct } from "@utils";

export type TOrderItem = {
  id: number;
  userId: number;
  items: TProduct[];
  subtotal: number;
};
