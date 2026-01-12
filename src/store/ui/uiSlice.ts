import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IUiState {
  authModalOpen: boolean;
  redirectAfterLogin: string | null;
}

const initialState: IUiState = {
  authModalOpen: false,
  redirectAfterLogin: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openAuthModal: (state, action: PayloadAction<string | undefined>) => {
      state.authModalOpen = true;
      state.redirectAfterLogin = action.payload ?? null;
    },
    closeAuthModal: (state) => {
      state.authModalOpen = false;
    },

    clearRedirectAfterLogin: (state) => {
      state.redirectAfterLogin = null;
    },
  },
});

export const { openAuthModal, closeAuthModal, clearRedirectAfterLogin } =
  uiSlice.actions;
export default uiSlice.reducer;
