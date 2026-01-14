# React E-commerce Advanced Template

**React + TypeScript + Redux + Axios + Toast Notifications + Protected/Guest Routes + Design Patterns**

---

## 📂 Folder Structure

src/
├─ api/ # Axios API requests
│ └─ axiosInstance.ts
├─ assets/ # Images, icons, fonts, styles
├─ components/ # Reusable components
│ ├─ toast/
│ │ ├─ ToastContainer.tsx
│ │ └─ ToastItem.tsx
│ └─ ...others
├─ hooks/ # Custom hooks
│ └─ useAuthAction.ts
├─ pages/ # Page components
│ ├─ Home.tsx
│ ├─ Login.tsx
│ └─ ...others
├─ routes/ # React Router routes
│ ├─ AppRouter.tsx
│ ├─ ProtectedRoute.tsx
│ └─ GuestRoute.tsx
├─ store/ # Redux Toolkit
│ ├─ index.ts # configureStore
│ ├─ slices/
│ │ ├─ cartSlice.ts
│ │ ├─ wishlistSlice.ts
│ │ └─ toastsSlice.ts
│ └─ selectors/
│ ├─ cartSelectors.ts
│ └─ wishlistSelectors.ts
├─ types/ # TypeScript types
│ └─ index.ts
├─ utils/ # Helpers, constants
│ └─ index.ts
├─ App.tsx
└─ main.tsx 


---

## ⚡ Features

- ✅ **Redux Toolkit** with:
  - Slices
  - Selectors
  - Persisted state (`redux-persist`)
- ✅ **Axios** global instance for API requests
- ✅ **Protected Routes** & **Guest Routes**
- ✅ **Toast Notifications System**
- ✅ **TypeScript** support
- ✅ **React Design Patterns**:
  - Compose Components
  - Render Props
  - Dynamic Components
- ✅ **Responsive and reusable UI components**

---

## 🛠️ Installation

```bash
git clone <repo-url>
cd project
npm install
npm run dev

🏗️ Redux Example

Slice: toastsSlice.ts

import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import type { TToast } from "@types";

interface IToastState {
  records: TToast[];
}

const initialState: IToastState = { records: [] };

const toastSlice = createSlice({
  name: "toasts",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<TToast>) => {
      state.records.push({
        id: nanoid(),
        ...action.payload,
      });
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.records = state.records.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;

