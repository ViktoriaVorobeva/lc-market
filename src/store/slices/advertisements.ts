import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Advertisment, AdvertismentsState, newAdvertisment } from "../../types";
import { saveResultInLocalStorage } from "../../utils/localStorage";

const initialState: AdvertismentsState = {
  allAdvertisements: [],
};

export const getAdvertismentsData = createAsyncThunk(
  "orders/getAdvertismentsData",
  async () => {
    try {
      const data = await fetch("http://localhost:3000/advertisements").then(
        (response) => response.json()
      );
      return data;
    } catch (error: any) {
      console.error(error?.response);
    }

    return initialState;
  }
);

export const createNewAdvertisment = createAsyncThunk(
  "advertisements/createNewAdvertisment",
  async (form: newAdvertisment) => {
    try {
      const data = (await fetch("http://localhost:3000/advertisements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ ...form, createdAt: new Date() }),
      }).then((response) => response.json())) as Advertisment[];
      console.log(data);
      return data;
    } catch (error: any) {
      console.error(error?.response);
    }

    return initialState;
  }
);

export const editCurrentAdvertisment = createAsyncThunk(
  "advertisements/editAdvertisment",
  async (form: Advertisment) => {
    try {
      const data = (await fetch(
        `http://localhost:3000/advertisements/${form.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({ ...form }),
        }
      ).then((response) => response.json())) as Advertisment[];
      return data;
    } catch (error: any) {
      console.error(error?.response);
    }

    return initialState;
  }
);

const advertisementsSlice = createSlice({
  name: "advertisements",
  initialState,
  reducers: {
    getAdvertisementsList(state: AdvertismentsState, action) {
      state.allAdvertisements = action.payload;
    },
    addAdvertisment(state: AdvertismentsState, action) {
      const newState = state.allAdvertisements.slice();
      newState.push(action.payload);
      console.log(newState);
      state.allAdvertisements = newState;
      saveResultInLocalStorage("advertisements", newState);
    },
    editAdvertisment(state: AdvertismentsState, action) {
      const index = state.allAdvertisements.findIndex(
        (advertisement) => advertisement.id === action.payload.id
      );
      const newState = state.allAdvertisements.slice();
      newState[index] = action.payload.card;
      state.allAdvertisements = newState;
      saveResultInLocalStorage("advertisements", newState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getAdvertismentsData.fulfilled,
      (state: AdvertismentsState, action) => {
        state.allAdvertisements = action.payload;
      }
    )
  },
});

export const { getAdvertisementsList, addAdvertisment, editAdvertisment } =
  advertisementsSlice.actions;
export default advertisementsSlice.reducer;
