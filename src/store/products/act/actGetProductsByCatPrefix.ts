import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "@utils";
import type { TProduct } from "@utils";

const actGetProductsByCatPrefix = createAsyncThunk(
  "products/getProductsByCatPrefix",
  async (catPrefix: string, { rejectWithValue }) => {
    try {
      const response = await axios.get<TProduct[]>(
        `/products?cat_prefix=${catPrefix}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetProductsByCatPrefix;
