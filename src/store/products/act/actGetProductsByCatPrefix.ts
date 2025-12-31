import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { TProduct } from "@utils/types/product";

const actGetProductsByCatPrefix = createAsyncThunk<
  TProduct[],
  string,
  { rejectValue: string }
>(
  "products/getProductsByCatPrefix",
  async (catPrefix: string, { rejectWithValue }) => {
    try {
      const response = await axios.get<TProduct[]>(
        `http://localhost:8080/products?cat_prefix=${catPrefix}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        return rejectWithValue("Something went wrong");
      }
    }
  }
);

export default actGetProductsByCatPrefix;
