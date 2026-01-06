import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler, type TProduct } from "@utils";

type TResponse = TProduct[];

const actGetWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async (_, { rejectWithValue, fulfillWithValue, signal }) => {
    try {
      const response = await axios.get<{ productId: number }[]>(
        `/wishlist?userId=1`,
        { signal }
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
