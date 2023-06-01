import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MessageShow, showResponseError } from "../../utils/Constant";
import MainService from "../services/MainServices";
import { loaderVisibility } from "./LoaderSlice";

const initialState = {
  ProductList: [],
  ProductDetail: {},
  OrderList: [],
  address: [],
};

export const getProductList = createAsyncThunk(
  "ProductList",
  async (body, thunk) => {
    try {
      const response = await MainService.ProductList();
      console.log(response, "response");
      thunk.dispatch(HomeSlice.actions.getProductList(response.data.products));
      return thunk.fulfillWithValue(response);
    } catch (error) {
      let err = MessageShow("error", "Error", showResponseError(error));
      return thunk.rejectWithValue(err);
    }
  }
);

export const getProductDetails = createAsyncThunk(
  "ProductDetails",
  async (body, thunk) => {
    try {
      thunk.dispatch(loaderVisibility(true));
      const response = await MainService.ProductDetails(body);
      console.log(response, "response");
      thunk.dispatch(HomeSlice.actions.getProductDetails(response.data));
      thunk.dispatch(loaderVisibility(false));
      return thunk.fulfillWithValue(response);
    } catch (error) {
      let err = MessageShow("error", "Error", showResponseError(error));
      thunk.dispatch(loaderVisibility(false));
      return thunk.rejectWithValue(err);
    }
  }
);

export const getPlaceOrder = createAsyncThunk(
  "getPlaceOrder",
  async (body, thunk) => {
    try {
      thunk.dispatch(loaderVisibility(true));
      const response = await MainService.PlaceOrder(body);
      MessageShow("success", response.message);
      thunk.dispatch(loaderVisibility(false));
      return thunk.fulfillWithValue(response);
    } catch (error) {
      let err = MessageShow("error", "Error", showResponseError(error));
      thunk.dispatch(loaderVisibility(false));
      return thunk.rejectWithValue(err);
    }
  }
);

export const postClaimBottel = createAsyncThunk(
  "ClaimBottel",
  async (body, thunk) => {
    try {
      thunk.dispatch(loaderVisibility(true));
      const response = await MainService.OrderBottelClaim(body);
      console.log(response, "response");
      MessageShow("success", response.message);
      thunk.dispatch(loaderVisibility(false));
      return thunk.fulfillWithValue(response);
    } catch (error) {
      let err = MessageShow("error", "Error", showResponseError(error));
      thunk.dispatch(loaderVisibility(false));
      return thunk.rejectWithValue(err);
    }
  }
);

export const getOrders = createAsyncThunk("getOrders", async (body, thunk) => {
  try {
    const response = await MainService.OrderList();
    console.log(response, "response");
    thunk.dispatch(HomeSlice.actions.getOrders(response.data.products));
    return thunk.fulfillWithValue(response);
  } catch (error) {
    console.log(error);
    let err = MessageShow("error", "Error", showResponseError(error));
    return thunk.rejectWithValue(err);
  }
});

export const getAddress = createAsyncThunk("Address", async (body, thunk) => {
  try {
    const response = await MainService.Address(body);
    console.log(response, "response");
    thunk.dispatch(HomeSlice.actions.address(response.data.addresses));
    return thunk.fulfillWithValue(response);
  } catch (error) {
    let err = MessageShow("error", "Error", showResponseError(error));
    return thunk.rejectWithValue(err);
  }
});
export const HomeSlice = createSlice({
  name: "Home",
  initialState: initialState,
  reducers: {
    getProductList: (state, action) => {
      let payload = action.payload;
      state.ProductList = payload;
    },
    getProductDetails: (state, action) => {
      let payload = action.payload;
      state.ProductDetail = payload;
    },
    getOrders: (state, action) => {
      let payload = action.payload;
      state.OrderList = payload;
    },
    address: (state, action) => {
      let payload = action.payload;
      state.address = payload;
    },
  },
});

// export const {  } = HomeSlice.actions;
export default HomeSlice.reducer;
