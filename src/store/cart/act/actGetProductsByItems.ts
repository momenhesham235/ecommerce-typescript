import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "@utils";

import type { RootState } from "@store/store";
import type { TProduct } from "@utils";

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
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetProductsByItems;
