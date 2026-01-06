import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "@utils";
import type { TProduct } from "@utils/index";

type TResponse = TProduct[];

const actGetWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await axios.get<{ productId: number }[]>(
        `/wishlist?userId=1`
      );

      if (!response.data.length) {
        return fulfillWithValue([]);
      }

      const concatenatedItemsId = response.data.map(
        (el) => `id=${el.productId}`
      );

      const response2 = await axios.get<TResponse>(
        `/products?${concatenatedItemsId.join("&")}`
      );

      return response2.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetWishlist;
