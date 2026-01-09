import { createSlice } from "@reduxjs/toolkit";
import type { TLoadingStatus } from "@utils/index";

import actAuthRegister from "./act/actAuthRegister";

interface IAuthState {
  loading: TLoadingStatus;
  error: string | null;
}

const initialState: IAuthState = {
  loading: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: () => {},
});

export { actAuthRegister };
export default authSlice.reducer;
