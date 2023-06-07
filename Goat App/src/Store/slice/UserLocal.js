import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MessageShow, showResponseError } from "../../utils/Constant";
import MainService from "../services/MainServices";
import { loaderVisibility } from "./LoaderSlice";

const initialState = {
  FavProduct: [],
  CartProduct: {},
  OneClickBuy: {},
  LocalAddress: [],
};

export const handleFavProduct = createAsyncThunk(
  "handleFavProduct",
  async (body, thunk) => {
    try {
      thunk.dispatch(UserLocal.actions.gethandleFavProduct(body));
      MessageShow("success", "WishList Updated");
      return thunk.fulfillWithValue("done");
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);

export const handleCartProduct = createAsyncThunk(
  "handleCartProduct",
  async (body, thunk) => {
    try {
      thunk.dispatch(UserLocal.actions.gethandleCartProduct(body));
      MessageShow("success", "Card Updated");
      return thunk.fulfillWithValue("done");
    } catch (error) {
      thunk.dispatch(loaderVisibility(false));
      return thunk.rejectWithValue(error);
    }
  }
);
export const getOneClikedBuy = createAsyncThunk(
  "getOneClikedBuy",
  async (body, thunk) => {
    try {
      thunk.dispatch(UserLocal.actions.getOneClikedBuy(body));
      return thunk.fulfillWithValue("done");
    } catch (error) {
      thunk.dispatch(loaderVisibility(false));
      return thunk.rejectWithValue(error);
    }
  }
);

export const addLocalAddress = createAsyncThunk(
  "addLocalAddress",
  async (body, thunk) => {
    try {
      thunk.dispatch(UserLocal.actions.addLocalAddress(body));
      MessageShow("success", "Address Updated");
      return thunk.fulfillWithValue("done");
    } catch (error) {
      thunk.dispatch(loaderVisibility(false));
      return thunk.rejectWithValue(error);
    }
  }
);
export const UserLocal = createSlice({
  name: "UserLocal",
  initialState: initialState,
  reducers: {
    gethandleFavProduct: (state, action) => {
      console.log(state.FavProduct, action);
      let payload = action.payload;
      state.FavProduct = payload;
    },
    gethandleCartProduct: (state, action) => {
      let payload = action.payload;
      state.CartProduct = payload;
    },
    getOneClikedBuy: (state, action) => {
      let payload = action.payload;
      state.OneClickBuy = payload;
    },
    addLocalAddress: (state, action) => {
      let payload = action.payload;
      state.LocalAddress = payload;
    },
  },
});

// export const { handleFavProduct, handleCartProduct } = UserLocal.actions;
export default UserLocal.reducer;
