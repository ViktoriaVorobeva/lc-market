import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { OrdersState, OrderStatus } from "../../types";

const initialState: OrdersState = {
  orders: [],
};

export const getOrdersData = createAsyncThunk(
  "orders/getOrdersData",
  async () => {
    try {
      const data = await fetch("http://localhost:3000/orders").then(
        (response) => response.json()
      );
      return data;
    } catch (error: any) {
      console.error(error?.response);
    }

    return initialState;
  }
);

export const getSortOrders = createAsyncThunk(
  "orders/getSortOrders",
  async (isReverse: boolean) => {
    try {
      const data = await fetch("http://localhost:3000/orders?_sort=price").then(
        (response) => response.json()
      );

      return isReverse ? data.reverse() : data;
    } catch (error: any) {
      console.error(error?.response);
    }

    return initialState;
  }
);

export const getOrdersByStatus = createAsyncThunk(
  "orders/getOrdersByStatus",
  async (status: typeof OrderStatus[keyof typeof OrderStatus]) => {
    console.log(status)
    try {
      const data = await fetch(`http://localhost:3000/orders?status=${status}`).then(
        (response) => response.json()
      );

      return data;
    } catch (error: any) {
      console.error(error?.response);
    }

    return initialState;
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    getOrdersList(state: OrdersState, action) {
      state.orders = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersData.fulfilled, (state: OrdersState, action) => {
        state.orders = action.payload;
      })
      .addCase(getSortOrders.fulfilled, (state: OrdersState, action) => {
        state.orders = action.payload;
      })
      .addCase(getOrdersByStatus.fulfilled, (state: OrdersState, action) => {
        state.orders = action.payload;
      });
  },
});

export const { getOrdersList } = ordersSlice.actions;
export default ordersSlice.reducer;
