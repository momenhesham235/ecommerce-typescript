import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler, type TLoginType, type TUser } from "@utils";

type TFormData = Required<TLoginType>;

type TResponse = {
  user: TUser;
  accessToken: string;
};

const actAuthLogin = createAsyncThunk(
  "auth/actAuthLogin",
  async (formData: TFormData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<TResponse>("/login", formData);

      return data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actAuthLogin;
