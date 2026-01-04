import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@store/store";
import axios from "axios";
import type { TProduct } from "@utils/types/product";

type TResponse = TProduct[];

const actGetProductsByItems = createAsyncThunk(
  "cart/actGetProductsByItems",
  async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, getState } = thunkAPI;
    const { cart } = getState() as RootState;

    const itemsIds = Object.keys(cart.items).map(Number);

    if (!itemsIds.length) {
      return fulfillWithValue([]);
    }

    try {
      const concatenatedItemsId = itemsIds.map((el) => `id=${el}`).join("&");

      const response = await axios.get<TResponse>(
        `/products?${concatenatedItemsId}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        return rejectWithValue("An unexpected error");
      }
    }
  }
);

export default actGetProductsByItems;
