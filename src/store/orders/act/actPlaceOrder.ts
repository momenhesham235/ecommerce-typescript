import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "@utils";
import { type RootState } from "@store/store";

const actGetOrders = createAsyncThunk(
  "order/actPlaceOrder",
  async (subtotal: number, { rejectWithValue, getState }) => {
    const { auth, cart } = getState() as RootState;

    const orderItems = cart.productsFullInfo.map((el) => ({
      id: el.id,
      title: el.title,
      price: el.price,
      img: el.img,
      quantity: cart.items[el.id],
    }));

    try {
      const response = await axios.post("/orders", {
        userId: auth.user?.id,
        subtotal: subtotal,
        items: orderItems,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetOrders;
