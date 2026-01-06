import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler, type TCategory } from "@utils";

const actGetCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, { rejectWithValue, signal }) => {
    try {
      const response = await axios.get<TCategory[]>("/categories", { signal });
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetCategories;
