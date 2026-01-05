import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { TProduct } from "@utils/types/product";

type TResponse = TProduct[];

const actGetWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await axios.get<{ productId: number }[]>(
        `/wishlist?userId=1`
      );

      console.log(response.data);

      if (!response.data.length) {
        return fulfillWithValue([]);
      }

      const concatenatedItemsId = response.data.map(
        (el) => `id=${el.productId}`
      );

      console.log(concatenatedItemsId);

      const response2 = await axios.get<TResponse>(
        `/products?${concatenatedItemsId.join("&")}`
      );

      return response2.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        return rejectWithValue("Something went wrong");
      }
    }
  }
);

export default actGetWishlist;
