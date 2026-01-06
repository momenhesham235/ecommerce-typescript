import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler, type TProduct } from "@utils";

const actGetProductsByCatPrefix = createAsyncThunk(
  "products/getProductsByCatPrefix",
  async (catPrefix: string, { rejectWithValue, signal }) => {
    try {
      const response = await axios.get<TProduct[]>(
        `/products?cat_prefix=${catPrefix}`,
        { signal }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetProductsByCatPrefix;
