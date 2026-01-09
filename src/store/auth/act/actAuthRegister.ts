import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "@utils";
import type { TRegisterType } from "@utils";

type TFormData = Required<Omit<TRegisterType, "confirmPassword">>;

const actAuthRegister = createAsyncThunk(
  "auth/actAuthRegister",
  async (data: TFormData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/register", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actAuthRegister;
